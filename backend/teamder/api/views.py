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
def get_all_interests(request):
    return Response(Interest.objects.all().values(), status=status.HTTP_200_OK)



@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def user_info_view(request):
    curr_user = request.user.user_name
    return Response(User.objects.filter(user_name=curr_user).values(), status=status.HTTP_200_OK)



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

    print("\n\n\n\n")
    print(request.scheme)
    print(request.body)
    print("\n\n\n\n")
    if request.method =='POST':

        serializer = RegistrationSerializer(data = request.data)
        response_data = {}

        if serializer.is_valid():
            user_serializer = UserSerializer(data = request.data)

            if user_serializer.is_valid():
                user = user_serializer.save()
                account = serializer.save()

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
            else:
                response_data = user_serializer.errors
                return Response(response_data)
        else:
            response_data = serializer.errors
        return Response(response_data)
