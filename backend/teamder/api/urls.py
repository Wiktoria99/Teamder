from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', views.registration_view, name = "register"),
    path('login', obtain_auth_token, name = "login"),


    path('profile/<str:user_name>/', views.user_info_view),

    path('rate_user', views.rate_user_view),

    path('my_profile', views.my_profile_view),

    

    path('interests', views.manage_interests),


    path('teams', views.manage_teams),

    path('team_by_ID/<int:teamID>/', views.get_team_by_ID_view),
]