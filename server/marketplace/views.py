from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from db.mongo import db
from .serializers import *
from bson import ObjectId

class ProductView(APIView):
    def get(self, request):
        try:
            # Access MongoDB collection
            collection = db['products']
        
            # Fetch all products from the 'products' collection
            products = collection.find({})
            products = list(products)
            
            # Convert ObjectId to string for JSON serialization
            for product in products:
                product['_id'] = str(product['_id'])
                # Convert nested ObjectId for variants
                # if 'variants' in product:
                #     for variant in product['variants']:
                #         variant['_id'] = str(variant['_id'])
            
            # Serialize the data
            serializer = ProductSerializer(products, many=True)
            
            if products:
                response = {
                    "success": True,
                    "result": serializer.data
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                    "success": False,
                    "result": []
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}", "success": False}, status=status.HTTP_400_BAD_REQUEST)
    
class ProductView(APIView):
    def get(self, request):
        try:
            # Access MongoDB collection
            collection = db['products']
        
            # Fetch all products from the 'products' collection
            products = collection.find({})
            products = list(products)
            
            # Convert ObjectId to string for JSON serialization
            for product in products:
                product['_id'] = str(product['_id'])
                # Convert nested ObjectId for variants
                # if 'variants' in product:
                #     for variant in product['variants']:
                #         variant['_id'] = str(variant['_id'])
            
            # Serialize the data
            serializer = ProductSerializer(products, many=True)
            
            if products:
                response = {
                    "success": True,
                    "result": serializer.data
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                    "success": False,
                    "result": []
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}", "success": False}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        print(f'API DATA',request.data)
        
        if serializer.is_valid():
            # Process valid data (e.g., save to the database)
            collection = db['products']
            product_data = serializer.validated_data
            result = collection.insert_one(product_data)

            # Prepare success response
            response_data = {
                "success": True,
                "message": "Product created successfully",
                "product_id": str(result.inserted_id),
                "product_data": serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            # Prepare error response
            response_data = {
                "success": False,
                "message": "Product creation failed",
                "errors": serializer.errors
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        

class AddVariantView(APIView):
    def post(self, request, product_id):
        try:
            # Deserialize and validate incoming data
            serializer = VariantSerializer(data=request.data)
            if serializer.is_valid():
                variant_data = serializer.validated_data
                
                # Prepare data for MongoDB insertion
                variant_data['_id'] = ObjectId()  # Generate a new ObjectId for the variant
                
                # Access MongoDB collection and update the product
                collection = db['products']
                result = collection.update_one(
                    {'_id': ObjectId(product_id)},  # Find product by its ID
                    {'$push': {'variants': variant_data}}  # Add the new variant to the 'variants' array
                )
                
                if result.modified_count > 0:
                    return Response({
                        "success": True,
                        "message": "Variant added successfully",
                        "variant_id": str(variant_data['_id'])
                    }, status=status.HTTP_201_CREATED)
                else:
                    return Response({
                        "success": False,
                        "message": "Failed to add variant. Product may not exist."
                    }, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({
                    "success": False,
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}", "success": False}, status=status.HTTP_400_BAD_REQUEST)
