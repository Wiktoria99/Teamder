from copy import deepcopy

from django.shortcuts import render
from django import core

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated


from .serializers import *

from .models import *

# Create your views here.


@api_view(['GET',])
@permission_classes(())
def get_all_teams(request):
    return Response(Team.objects.all().values(), status=status.HTTP_200_OK)


@api_view(['GET',])
@permission_classes(())
def get_all_interests(request):
    return Response(Interest.objects.all().values(), status=status.HTTP_200_OK)



@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def user_info_view(request):
    curr_user = request.user.user_name
    return Response(User.objects.filter(user_name=curr_user).values(), status=status.HTTP_200_OK)



@api_view(['POST',])
@permission_classes((IsAuthenticated,))
def create_team_view(request):
    if request.method =='POST':
        host = request.user.user_name

        data = deepcopy(request.data)
        data['host'] = host
        serializer = TeamSerializer(data = data)

        response_data = {}
        if serializer.is_valid():
            
            name = serializer.data['name']
            date = serializer.data['date']

            team = Team()
            team.host = host
            team.name = name
            team.date = date
            team.save()

            response_data['response'] = "succesfully created new Team!"
            response_data['id'] = team.id
            response_data['name'] = team.name
        else:
            response_data = serializer.errors
        return Response(response_data)
        


@api_view(['POST',])
@permission_classes(())
def registration_view(request):

    if request.method =='POST':

        data = deepcopy(request.data)
        serializer = RegistrationSerializer(data = request.data)
        response_data = {}

        if serializer.is_valid():
            account = serializer.save()
            
            user = User()
            user.user_name = account.user_name
            user.save()

            response_data['response'] = "succesfully reistered a new user!"
            response_data['user_name'] = account.user_name
            response_data['email'] = account.email
            token = Token.objects.get(user=account).key
            response_data['token'] = token
        else:
            response_data = serializer.errors
        return Response(response_data)
