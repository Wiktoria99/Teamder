from copy import deepcopy

from django.shortcuts import render
from django import core

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

from .serializers import *

from .models import *

# Create your views here.

@api_view(['GET'])
@permission_classes(())     #((IsAuthenticated,))       ???
def get_team_by_ID_view(request, teamID):
    if request.method =='GET':
        team = Team.objects.all().filter(id = teamID)
        if team:
            return Response(team.values()[0], status=status.HTTP_200_OK)
        else:
            response_data = {}
            response_data['response'] = f"ERROR! Team with id: {teamID} does not exist"
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET',])
@permission_classes(())
def get_all_interests(request):
    return Response(Interest.objects.all().values(), status=status.HTTP_200_OK)



def get_user_info(user_name: str):
    user_info = User.objects.filter(user_name=user_name).values()[0]
    del user_info['my_teams_id']
    return user_info

@api_view(['GET',])
@permission_classes(())
def user_info_view(request, user_name):
    return Response(get_user_info(user_name), status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def my_profile_view(request):
    if request.method =='GET':
        return Response(get_user_info(request.user.user_name), status=status.HTTP_200_OK)
    if request.method =='POST':
        response_data = {}
        user_serializer = UpdateUserSerializer(data = request.data)

        if user_serializer.is_valid():
            user = User.objects.get(user_name = request.user.user_name)
            user_serializer.save(user)

            user.list_of_interests.clear()
            for interest in request.data['list_of_interests']:
                if type(interest) == str:
                    user.add_interest_by_name(interest)
                elif type(interest) == int:
                    user.add_interest_by_ID(interest)

            user.save()

            #location                                           TODO
            location = Location(address = request.data["location"],
                                    longitude = None,
                                    latitude = None )
            location.save()
            user.location = location
            #user.save()

            response_data['response'] = "succesfully updated user data!"
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            #response_data = user_serializer.errors
            response_data["Errors"] = []
            for value in user_serializer.values():
                response_data["Errors"].append(value)
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)




@api_view(['POST', 'GET'])
@permission_classes((IsAuthenticated,))
def manage_teams(request):
    if request.method =='GET':
        return Response(Team.objects.all().values(), status=status.HTTP_200_OK)
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

        serializer = RegistrationSerializer(data = request.data)
        response_data = {}

        if serializer.is_valid():
            user_serializer = UserSerializer(data = request.data)
            if user_serializer.is_valid():
                try:
                    account = serializer.save()
                except Exception as expt:
                    response_data["Errors"] = [str(expt)]
                    return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

                user = user_serializer.save()

                for interest in request.data['list_of_interests']:
                    if type(interest) == str:
                        user.add_interest_by_name(interest)
                    elif type(interest) == int:
                        user.add_interest_by_ID(interest)

                user.save()

                #location                                           TODO
                location = Location(address = request.data["location"],
                                    longitude = None,
                                    latitude = None )
                #location.save()
                user.location = Location.objects.create(
                                    address = request.data["location"],
                                    longitude = None,
                                    latitude = None 
                )
                #user.save()

                response_data['response'] = "succesfully reistered a new user!"
                response_data['user_name'] = account.user_name
                response_data['email'] = account.email
                token = Token.objects.get(user=account).key

                response_data['token'] = token
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                #response_data = user_serializer.errors
                response_data["Errors"] = []
                for value in user_serializer.errors.values():
                    for i in value:
                        response_data["Errors"].append(i)
                return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
        else:
            #response_data = serializer.errors
            response_data["Errors"] = []
            for value in serializer.errors.values():
                for i in value:
                    response_data["Errors"].append(i)
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
