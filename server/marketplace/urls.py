from django.urls import path
from .views import ProductView,ProductDetailBySKU,MarketPlace

urlpatterns = [
    path('getAllProducts',MarketPlace.as_view(),name='all_products'),
    path('products', ProductView.as_view(), name='product_list'),
    path('product/<str:sku>', ProductDetailBySKU.as_view(), name='get_product_bysku'),
]