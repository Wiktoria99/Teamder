from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', views.registration_view, name = "register"),
    path('login', obtain_auth_token, name = "login"),

    path('getUserInfo', views.user_info_view),

    path('team_by_ID/<int:teamID>/', views.get_team_by_ID_view),

    
    path('interests', views.get_all_interests),

    path('teams', views.manage_teams),
]