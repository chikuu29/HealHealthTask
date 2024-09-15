# views.py

from django.http import HttpResponse, JsonResponse
from django.views import View
from django.conf import settings
import os
from datetime import datetime, timedelta
import ast
import json


class LogFileView(View):
    def get(self, request):
        start_date_str = request.GET.get('start_date')
        end_date_str = request.GET.get('end_date')
        log_path = request.GET.get('path', '')  # Optional path parameter
        
        if not start_date_str or not end_date_str:
            return JsonResponse({'error': 'Please provide both start_date and end_date parameters in YYYY-MM-DD format.'}, status=400)
        
        try:
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
        except ValueError:
            return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
        
        if start_date > end_date:
            return JsonResponse({'error': 'Start date must be before end date.'}, status=400)
        
        logs_dir = settings.LOGS_DIR
        log_files = []
        current_date = start_date
        
        while current_date <= end_date:
            file_name = f'{current_date.strftime("%d-%m-%Y")}_api.log'
            file_path = os.path.join(logs_dir, file_name)
            if os.path.exists(file_path):
                log_files.append(file_path)
            current_date = current_date + timedelta(days=1)
        
        if not log_files:
            return JsonResponse({'error': 'No log files found for the given date range.'}, status=404)
        
        combined_logs = []
        for file_path in log_files:
            with open(file_path, 'r') as file:
                for line in file:
                    if log_path in line and '/api/logs/' not in line:
                        # combined_logs += line
                        combined_logs.append(convert_log_entry(line))
        
        if not combined_logs:
            return JsonResponse({'error': 'No logs found for the specified path and date range.'}, status=404)
        # If logs are found, return them in a JSON response with success
        print(f"combined_logs",combined_logs)
        return JsonResponse({
            'success': True,
            'logs': combined_logs  # Split logs into a list for better readability in JSON
        })
        




def convert_log_entry(log_entry):
    try:
    # Split the log entry by space to extract the parts
        print("log_entry",log_entry)
        parts = log_entry.split(' ', 3)
        print("parts",parts)
        
        # Extract the log type, time, and loggerMiddleware
        log_type = parts[0]
        time = parts[1] + ' ' + parts[2]
        log_create_by = parts[3].split(' ', 1)[0]
        log_content = parts[3].split(' ', 1)[1]
        
        # Convert the log content from string to dictionary
    
        log_dict = ast.literal_eval(log_content)
    
        
        # Build the final output dictionary
        formatted_log = {
            "logType": log_type,
            "time": time,
            "logCreatedBy": log_create_by,
            "log": log_dict
        }
    
        return formatted_log
    except (SyntaxError, ValueError):
        return {"error": "Invalid log content format"}

# Example usage
# log_entry = "INFO 2024-09-15 23:23:44,405 loggerMiddleware {'time': '2024-09-15 23:23:44', 'path': '/auth/me', 'request': {'method': 'GET', 'body': 'No body', 'requested_by': 'Not Provided'}, 'response': {'status_code': 200, 'body': '{\"message\":\"ReLogin successful\",\"success\":true,\"authProvider\":\"Relogin-web\",\"login_info\":{\"userFullName\":\"SURYANARAYAN BISWAL\",\"role\":\"ADMIN\",\"email\":\"cchiku1999@gmail.com\",\"phone\":\"8327783629\",\"firstName\":\"SURYANARAYAN\",\"lastName\":\"BISWAL\"},\"accessToken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiY2NoaWt1MTk5OUBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4ifSwiZXhwIjoxNzI2NDk5MzkzfQ.MjsQKCjuZ6h6iKFab3mEEGwzcbckyA2FjP2R_Ecc56U\"}'"
# formatted_log = convert_log_entry(log_entry)
# print(json.dumps(formatted_log, indent=2))
