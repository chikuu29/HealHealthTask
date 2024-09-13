from rest_framework import serializers

class VariantSerializer(serializers.Serializer):
    # _id = serializers.CharField(source='_id', required=False)
    sku = serializers.CharField()
    name = serializers.CharField()
    price = serializers.FloatField()
    special_price = serializers.FloatField()
    attributes = serializers.DictField()  # Assuming attributes is a dictionary

class ProductSerializer(serializers.Serializer):
    # _id = serializers.CharField(source='_id', required=False)
    sku = serializers.CharField()
    name = serializers.CharField()
    description = serializers.CharField()
    image = serializers.URLField()
    price = serializers.FloatField()
    special_price = serializers.FloatField()
    variants = VariantSerializer(many=True, required=False)  # Optional field
