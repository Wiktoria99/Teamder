from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', views.registration_view, name = "register"),
    path('login', obtain_auth_token, name = "login"),

    path('getUserInfo', views.user_info_view),

    
    path('interests', views.get_all_interests),

    path('createTeam', views.create_team_view),
    path('teams', views.get_all_teams),
]