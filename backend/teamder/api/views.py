from copy import deepcopy
from datetime import datetime

from django.shortcuts import render
from django import core

from rest_framework import generics, status
from rest_framework import response
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
    del user_info['rating_id']
    user_info['rating'] = User.objects.filter(user_name=user_name)[0].get_user_rating()
    return user_info

@api_view(['GET',])
@permission_classes(())
def user_info_view(request, user_name):
    if User.objects.filter(user_name=user_name):
        data = get_user_info(user_name)
        if request.user.is_anonymous:
            data['yourRate'] = None 
        else:
            currUser = User.objects.filter(user_name=request.user.user_name)[0]
            data['yourRate'] = User.objects.filter(user_name=user_name)[0].check_if_user_was_rated_by(currUser)
        return Response(data, status=status.HTTP_200_OK)
    else:
        response_data = {}
        response_data['ERROR'] = f"User with this user_name does not exist"
        return Response(response_data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def rate_user_view(request):
    currUser = User.objects.filter(user_name=request.user.user_name)[0]
    user_to_be_rated = User.objects.filter(user_name=request.data['user_name'])[0]
    if int(request.data['rate']) == 1:
        user_to_be_rated.add_UpVote_from(currUser)
    elif int(request.data['rate']) == -1:
        user_to_be_rated.add_DownVote_from(currUser)
    elif int(request.data['rate']) == 0:
        user_to_be_rated.remove_rate_from(currUser)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    response_data = {}
    response_data['yourRate'] = request.data['rate']
    response_data['rating'] = user_to_be_rated.get_user_rating()
    return Response(response_data, status=status.HTTP_200_OK)


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
        expired = request.data.get('expired')
        queryset = Team.objects.all()
        now = datetime.now()
        if expired == True:
            queryset = queryset.filter(expiration_date__lte = now)
        elif expired == False:
            queryset = queryset.filter(expiration_date__gte = now)
        return Response(queryset.values(), status=status.HTTP_200_OK)
    if request.method =='POST':
        host = request.user.user_name

        data = deepcopy(request.data)
        data['host'] = host
        serializer = TeamSerializer(data = data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


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
