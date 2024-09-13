from rest_framework import serializers

class ProductVariantSerializer(serializers.Serializer):
    sku = serializers.CharField(max_length=255)
    name = serializers.CharField(max_length=255)
    price = serializers.IntegerField()  # Changed to IntegerField
    special_price = serializers.IntegerField()  # Changed to IntegerField
    image = serializers.ListField(child=serializers.URLField())
    attributes = serializers.DictField()

class ProductSerializer(serializers.Serializer):
    sku = serializers.CharField(max_length=255)
    name = serializers.CharField(max_length=255)
    description = serializers.CharField()
    image = serializers.URLField()
    price = serializers.IntegerField()  # Changed to IntegerField
    special_price = serializers.IntegerField()  # Changed to IntegerField
    variants = ProductVariantSerializer(many=True)
