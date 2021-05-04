from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', views.registration_view, name = "register"),
    path('login', obtain_auth_token, name = "login"),

    
    path('categories', views.get_all_categories),
    
    path('getUserInfo', views.user_info_view), 

]