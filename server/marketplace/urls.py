from django.urls import path
from .views import ProductView,ProductDetailBySKU

urlpatterns = [

    path('products', ProductView.as_view(), name='product_list'),
    path('product/<str:sku>', ProductDetailBySKU.as_view(), name='get_product_bysku'),
]