from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from db.mongo import db
import bcrypt
from services.commonService import *
# Create your views here.

secreatKey = "your_secret_key"
class RegisterAPIView(APIView):
    def post(self, request):
        try:
        # Get data from request
            email = request.data.get('email')
            password = request.data.get('password')
            fname = request.data.get('fname')
            lname = request.data.get('lname')
            # confirm_password = request.data.get('confirmPswd')
            # role = request.data.get('role')
            if(not email or not password or not fname or not lname):
                return Response({"message": "Please fill in all fields","success":False}, status=status.HTTP_400_BAD_REQUEST)

            # Check if passwords match
            # if password != confirm_password:
            #     return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

            # Connect to MongoDB
            collection = db['users']

            # Check if email already exists
            if collection.find_one({"email": email}):
                return Response({"message": "Email already exists","success":False}, status=status.HTTP_400_BAD_REQUEST)

            # Insert new user into MongoDB
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            user_data = {
                "email": email,
                'userName': fname + lname,
                'firstName':fname,
                'lastName':lname,
                'phone':'',
                "password": hashed_password.decode('utf-8') ,
                 "role":"SELLER" # In practice, you should hash the password
            }
            inserted_id = collection.insert_one(user_data).inserted_id

            # Return success response
            return Response({"message": "User registered successfully", "email":email,'success':True}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": "An error occurred: " + str(e),'success':False}, status=status.HTTP_400_BAD_REQUEST)
        

class LogoutView(APIView):
    def get(self,request):
        response = Response({"success": True, "message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie(
            samesite= 'None',
            key="jwt_token",
            path="/"
        )
        return response


class LoginAPIView(APIView):
    def post(self, request):
        try:
            # Get data from request
            email = request.data.get('loginId')
            password = request.data.get('password')
            print
            if not email or not password:
                return Response({"error": "Please provide both email and password"}, status=status.HTTP_400_BAD_REQUEST)

            # Connect to MongoDB
            collection = db['users']

            # Check if user exists
            storedData = collection.find_one({"email": email})
            if storedData:
                print("User exists", storedData)
                if bcrypt.checkpw(password.encode('utf-8'), storedData['password'].encode('utf-8')):
                    print("Password is correct")
                    payLoad = {
                        "email": email,
                        "role":"ADMIN"
                    }
                    token = create_jwt_token(payLoad)
                    message_info = {
                    "message": 'Login successful',
                    "authProvider": "login-web",
                    'success': True,
                    "login_info": {
                        'userFullName': storedData['userName'],
                        'role':storedData['role'],
                        'email': storedData['email'],
                        'phone': storedData['phone'],
                        'firstName': storedData['firstName'],
                        'lastName': storedData['lastName']
                    },
                    "accessToken": token
                };
                    response = Response(message_info,status=status.HTTP_200_OK)
                    response.set_cookie(
                            key='jwt_token',
                            value=str(token),
                            httponly=True,
                            samesite= 'None',
                            secure=True,
                            max_age=timedelta(days=2).total_seconds(),  # Set cookie expiration time
                            path='/'  # Set a specific path for the refresh token cookie
                        )
                    response.set_cookie(
                            key='role',
                            value=str(storedData['role']),
                            samesite= 'None',
                            httponly=True,
                            secure=True,
                            max_age=timedelta(days=2).total_seconds(),  # Set cookie expiration time
                            path='/'  # Set a specific path for the refresh token cookie
                        )
                    return response
                else:
                    return Response({"message": "Invalid email or password", 'success': False}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"message": "Invalid email or password", 'success': False}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"message": "An error occurred: " + str(e), 'success': False}, status=status.HTTP_400_BAD_REQUEST)
        
class checkLoginStatus(APIView):
    def get(self, request):
        try:
            # Get data from request
            

            token = request.COOKIES['jwt_token']
         
            if not token:
                return Response({"error": "Please provide token"}, status=status.HTTP_400_BAD_REQUEST)
           
            tokenData = validate_jwt_token(token,secreatKey)['payload']
            print(tokenData)
            collection = db['users']
            # Check if user exists
            storedData = collection.find_one({"email": tokenData['email']})
            if tokenData and storedData:
                message_info = {
                     "message": 'ReLogin successful',
                    'success': True,
                    "authProvider": "Relogin-web",
                    'success': True,
                    "login_info": {
                        'userFullName': storedData['userName'],
                        'role':storedData['role'],
                        'email': storedData['email'],
                        'phone': storedData['phone'],
                        'firstName': storedData['firstName'],
                        'lastName': storedData['lastName']
                    },
                    "accessToken": token
                }
                return Response(
                   message_info,
                      status=status.HTTP_200_OK)
            else:
                return Response({"message": "Invalid token", 'success': False}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"message": "An error occurred: " + str(e), 'success': False}, status=status.HTTP_400_BAD_REQUEST)
