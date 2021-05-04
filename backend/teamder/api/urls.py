from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', views.registration_view, name = "register"),
    path('login', obtain_auth_token, name = "login"),

    
    path('categoryView', views.SubcategoryView.as_view()),
    path('userView', views.UserView.as_view()),  

    path('getAllUsers', views.user_info_view), 
]