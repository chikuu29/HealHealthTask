from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from db.mongo import db
import bcrypt
from services.commonService import *
# Create your views here.
# from your_project.utils import validate_jwt_token  # Uncomment and adjust as needed



class GenerateConfig(APIView):
    def get(self, request):
        try:
            # Get token from cookies
            token = request.COOKIES.get('refresh_token')

            print('Toke',token)
            # if not token:
            #     return Response({"error": "Please provide token", "success": False}, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate JWT token (Uncomment and adjust as needed)
            # tokenData = validate_jwt_token(token, 'your_secret_key')
            # if 'payload' not in tokenData:
            #     return Response({"error": "Invalid token", "success": False}, status=status.HTTP_401_UNAUTHORIZED)
            
            # Access MongoDB collection
            collection = db['app_config']
        
            # Fetch the configuration
            app_config = collection.find({"type": "menu", "id": 1})
            app_config = list(app_config)  # Convert cursor to list
            
            # Check if configuration is found
            if app_config:
                response = {
                    "success": True,
                    "result": {"config": app_config[0].get('config', {})}
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                    "success": False,
                    "result": []
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}", "success": False}, status=status.HTTP_400_BAD_REQUEST)
