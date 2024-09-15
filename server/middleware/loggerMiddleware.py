import logging
import json
import time
from django.utils.deprecation import MiddlewareMixin

# Get the logger for API logging
logger = logging.getLogger('api_logger')

class APILoggingMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response
        super().__init__(get_response)
    
    def __call__(self, request):
        # Store request details in the request object
        request._start_time = time.time()
        request._log_data = {
            'method': request.method,
            'path': request.path,
            'body': self.get_request_body(request),
            'requested_by': request.authInfo if hasattr(request, 'authInfo') else 'Not Provided'
        }

        # Process the request and get the response
        response = self.get_response(request)

        # Log combined request and response details
        self.log_request_response(request, response)

        return response

    def log_request_response(self, request, response):
        log_data = {
            'time': time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(request._start_time)),
            'path': request._log_data['path'],
            'request': {
                'method': request._log_data['method'],
                'body': request._log_data['body'],
                'requested_by': request._log_data['requested_by']
            },
            'response': {
                'status_code': response.status_code,
                'body': self.get_response_body(response)
            }
        }
        logger.info(log_data)

    def get_request_body(self, request):
        try:
            return request.body.decode('utf-8') if request.body else 'No body'
        except Exception as e:
            return f'Error: {str(e)}'

    def get_response_body(self, response):
        try:
            return response.content.decode('utf-8') if response.content else 'No content'
        except Exception as e:
            return f'Error: {str(e)}'
