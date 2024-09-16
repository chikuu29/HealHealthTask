from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from db.mongo import db
from .serializers import *
from bson import ObjectId

# class ProductView(APIView):
#     def get(self, request):
#         try:
#             # Access MongoDB collection
#             collection = db['products']
        
#             # Fetch all products from the 'products' collection
#             products = collection.find({})
#             products = list(products)
            
#             # Convert ObjectId to string for JSON serialization
#             for product in products:
#                 product['_id'] = str(product['_id'])
#                 # Convert nested ObjectId for variants
#                 # if 'variants' in product:
#                 #     for variant in product['variants']:
#                 #         variant['_id'] = str(variant['_id'])
            
#             # Serialize the data
#             serializer = ProductSerializer(products, many=True)
            
#             if products:
#                 response = {
#                     "success": True,
#                     "result": serializer.data
#                 }
#                 return Response(response, status=status.HTTP_200_OK)
#             else:
#                 return Response({
#                     "success": False,
#                     "result": []
#                 }, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"message": f"An error occurred: {str(e)}", "success": False}, status=status.HTTP_400_BAD_REQUEST)
    
class ProductView(APIView):
    def get(self, request):
        try:
            # Access MongoDB collection
            authInfo= request.authInfo if hasattr(request, 'authInfo') else 'Not Provided'
      
            if(authInfo != 'Not Provided' and 'payload' in authInfo):
                collection = db['products']
                productOwnBy=authInfo['payload'].get('email','Email not provided')
                # Fetch all products from the 'products' collection
                products = collection.find({
                    'ownBY':productOwnBy,
                     "$or": [
                    { "isTrash": { "$exists": False } },
                    { "isTrash": False }
                ]})
                products = list(products)
                
                # Convert ObjectId to string for JSON serialization
                for product in products:
                    product['_id'] = str(product['_id'])
                    # Convert nested ObjectId for variants
                    # if 'variants' in product:
                    #     for variant in product['variants']:
                    #         variant['_id'] = str(variant['_id'])
                
                # Serialize the data
                # serializer = ProductSerializer(products, many=True)
                
                if products:
                    response = {
                        "success": True,
                        "result": products
                    }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    return Response({
                        "success": False,
                        "result": []
                    }, status=status.HTTP_200_OK)
            else:
                response_data = {
                        "success": False,
                        "message": "Unautorized Access"
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}", "success": False}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        # print(f'API DATA', request.data)
        authInfo= request.authInfo if hasattr(request, 'authInfo') else 'Not Provided'
      
        if(authInfo != 'Not Provided' and 'payload' in authInfo):
            authInfo=dict(authInfo)
            if serializer.is_valid():
                # Extract SKU from the validated data
                product_data = serializer.validated_data
                sku = product_data.get('sku')
                
                # Access the 'products' collection
                collection = db['products']
                productOwnBy=authInfo['payload'].get('email','Email not provided')
                # print(f'Hleo',authInfo['payload'].get('email','Email not provided'))
                # Check if the product with the given SKU already exists
                existing_product = collection.find_one({"sku": sku})
                if(productOwnBy !='Email not provided'):
                    if existing_product:
                        # SKU exists; update the existing product
                        ownerOfTheProduct=existing_product.get('ownBY','NOT FOUND')
                        if ownerOfTheProduct !='NOT FOUND' and ownerOfTheProduct==productOwnBy:
                            
                            result = collection.update_one(
                                {"sku": sku},
                                {"$set": product_data}  # Update the product with new data
                            )
                            
                            response_data = {
                                "success": True,
                                "message": "Product updated successfully",
                                "product_data": product_data
                            }
                            return Response(response_data, status=status.HTTP_200_OK)
                        else:
                            response_data = {
                            "success": False,
                            "message": "You Are Not Owner Of Thie Product Or SKU id already Exist"
                            }
                            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

                    
                    else:
                        # SKU does not exist; create a new product
                        product_data['ownBY']=productOwnBy
                        result = collection.insert_one(product_data)
                        
                        response_data = {
                            "success": True,
                            "message": "Product created successfully",
                            "product_id": str(result.inserted_id),
                            "product_data": serializer.data
                        }
                        return Response(response_data, status=status.HTTP_201_CREATED)
                else:
                    response_data = {
                    "success": False,
                    "message": "Unautorized Access"
                    }
                    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

            else:
                # Prepare error response if serializer is invalid
                response_data = {
                    "success": False,
                    "message": "Product creation/update failed",
                    "errors": serializer.errors
                }
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            response_data = {
                    "success": False,
                    "message": "Unautorized Access"
            }
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

class ProductDetailBySKU(APIView):
 

    def get(self, request, sku):
        print('GET Product By sku', sku)
        products_collection = db['products'] # Get the collection from settings
        product = products_collection.find_one(
        {
            "sku": sku,
            "$or": [
                { "isTrash": { "$exists": False } },
                { "isTrash": False }
            ]
        }, {"_id": 0})  # Exclude MongoDB's _id field
        if product:
            response_data = {
                "success": True,
                "result": product
            }
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {
                "success": False,
                "message": "Product not found"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, sku):
        print('DELETE Product By sku', sku)
        products_collection = db['products']  # Get the collection from settings

        # Find the product to check if it exists
        product = products_collection.find_one({"sku": sku})

        if product:
            # Update the product's 'isTrash' field to True instead of deleting
            result = products_collection.update_one(
                {"sku": sku},               # The product identifier
                {"$set": {"isTrash": True}}  # Soft delete by marking isTrash as True
            )
            
            # Check if the update was successful
            if result.modified_count > 0:
                response_data = {
                    "success": True,
                    "message": "Product marked as trashed"
                }
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                response_data = {
                    "success": False,
                    "message": "Failed to mark the product as trashed"
                }
                return Response(response_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            response_data = {
                "success": False,
                "message": "Product not found"
            }
            return Response(response_data, status=status.HTTP_404_NOT_FOUND)


    
class MarketPlace(APIView):
    def get(self, request):
        try:
            # Access MongoDB collection
            collection = db['products']
        
            # Fetch all products from the 'products' collection
            products = collection.find({ "$or": [
                { "isTrash": { "$exists": False } },
                { "isTrash": False }
            ]})
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