from copy import deepcopy
import json

from django.contrib.auth.models import *
from django.http import request, response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient


from api.models import *
from api.serializers import *

def get_data_to_register(user_name: str, email: str):
    data = {
        "user_name":"test_user_1", 
        "email":"test_1@email.com", 
        "password":"maslo",
        "password2":"maslo",
        "name":"test_name",
        "surname":"test_surname",
        "age":20,
        "location": "KRAKOW",
        "bio":"test_bio",
        "social_media_URL1":"https://www.google.com",
        "social_media_URL2":"https://www.facebook.com/",
        "social_media_URL3":"https://github.com/Wiktoria99/Teamder",
        "photo_src":"https://avatars.githubusercontent.com/u/31045802?v=4",
        "list_of_interests":[1, 2, 3, 4, 5, "muzyka", "TAKIEGO ZAINTERESOWANIE NIE MA", 999999]
    }
    data["user_name"] = user_name
    data["email"] = email

    return deepcopy(data)

class RegistrationLoginTestCase(APITestCase):

    def test_registration_login(self):
        data = get_data_to_register("test_user_1", "test_1@email.com")

        response = self.client.post("/api/register", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        register_token = response.data['token']

        data = {
            "username": "test_user_1",
            "password": "maslo"
        }

        response = self.client.post("/api/login", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(register_token, response.data["token"])


class UserTestCase(APITestCase):

    def setUp(self):
        data = get_data_to_register("UserTestCase_1", "UserTestCase_1@email.com")

        response = self.client.post("/api/register", data)
        assert(response.status_code == status.HTTP_200_OK)

        self.account = Account.objects.get(user_name = data["user_name"])
        self.user = User.objects.get(user_name = data["user_name"])
        
        self.token = Token.objects.get(user = self.account)

        # drugi uzytkownik
        data = get_data_to_register("UserTestCase_2", "UserTestCase_2@email.com")
        response = self.client.post("/api/register", data)
        assert(response.status_code == status.HTTP_200_OK)

    def api_authentication(self):   # jeżeli chcesz byc zalogowany jako UserTestCase_1 przed self.client. get/post trzeba wywolac ta funckje
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    # api/my_profile
    def test_my_profile_authenticated(self):
        self.api_authentication()   # wysylanie tokenu
        response = self.client.get('/api/my_profile')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_my_profile_un_authenticated(self):
        self.client.force_authenticate(user=None)   # bez tokenu
        response = self.client.get('/api/my_profile')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_my_profile_update(self):
        self.api_authentication()

        data = get_data_to_register(self.account.user_name, self.account.email) 
        data["name"] = "test_name_2"
        del data["user_name"]
        del data["email"]
        del data["password"]
        del data["password2"]
        
        response = self.client.post('/api/my_profile', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user = User.objects.get(user_name = self.user.user_name) # pobieramy z bazy danych zaktualizowane dane
        self.assertEqual("test_name_2", self.user.name)

    # api/profile
    def test_user_profile_that_exists(self):
        self.client.force_authenticate(user=None)
        user_name = "UserTestCase_2"
        response = self.client.get('/api/profile/' + user_name + "/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user_name"], user_name)

    def test_user_profile_that_does_not_exist(self):
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/profile/' + "I_dont_exist/")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # api/rate_user
    def test_rate_user(self):
        self.api_authentication()

        user_to_be_rated = "UserTestCase_2"
        yourRate = -1    # musi być -1 lub 0 lub 1 !!!

        # pobieranie danych o user_to_be_rated
        response = self.client.get('/api/profile/' + user_to_be_rated + "/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        rating_before_this_rate = response.data["rating"]
        yourRate_before_this_rate = response.data["yourRate"]

        self.assertEqual(yourRate_before_this_rate, 0)

        # wysylanie oceny
        data = {
            "user_name": user_to_be_rated,
            "rate": yourRate
        }

        response = self.client.post('/api/rate_user', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # pobieranie danych o user_to_be_rated jeszcze raz
        response = self.client.get('/api/profile/' + user_to_be_rated + "/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        rating_after_this_rate = response.data["rating"]
        yourRate_after_this_rate = response.data["yourRate"]

        # sprawdzanie oceny
        self.assertEqual(yourRate_after_this_rate, yourRate)
        self.assertEqual(rating_before_this_rate + yourRate, rating_after_this_rate)

        # sprawdzanie co w przypadku kiedy wpiszemy niepoprawna ocene
        data = {
            "user_name": user_to_be_rated,
            "rate": 2
        }

        response = self.client.post('/api/rate_user', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_rate_user_that_does_not_exist(self):
        self.api_authentication()

        user_to_be_rated = "I_dont_exist"

        data = {
            "user_name": user_to_be_rated,
            "rate": 1
        }

        response = self.client.post('/api/rate_user', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # api/get_infos_by_list_of_usersID
    def test_infos_from_list_of_usersID(self):
        list_of_ids = []
        list_of_ids.append(self.user.id)
        list_of_ids.append(User.objects.get(user_name = "UserTestCase_2").id)
        list_of_ids.append(88)  # takiego ID nie ma

        data = {
            "user_ids": list_of_ids
        }

        response = self.client.post('/api/get_infos_by_list_of_usersID', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
      
        self.assertEqual(len(response.data["users_info"]), 2)


def get_data_to_create_team(name: str, expiration_date):
    data = {
        "name": "_",
        "description": "cokolwiek",
        "expiration_date": "2011-11-04T00:05:23",
        "location": "Lwowska 24 Kraków",
        "longitude": 20,
        "latitude": 30,
        "cost_per_person": 10,
        "size": 4,
        "host_profile_picture_url" : "http://placecorgi.com/250",
        "list_of_interests": [1, 2],
        "waiting_people": [],
        "accepted_people": []
    }

    data["name"] = name
    data["expiration_date"] = expiration_date
    return deepcopy(data)

class TeamTestCase(APITestCase):

    def setUp(self):
        # uzytkownicy
        for i in range(3):
            data = get_data_to_register("UserTestCase_" + str(i+1), f"UserTestCase_{i+1}@email.com")
            response = self.client.post("/api/register", json.dumps(data), content_type='application/json')
            assert(response.status_code == status.HTTP_200_OK)

        # zespoly
        self.api_authentication_as("UserTestCase_2")
        for i in range(3):  #uzytkownik 2 jest hostem 3 zespolow nieaktualnych
            data = get_data_to_create_team("TeamTestCase_2_" + str(i+1), "2011-11-04T00:05:23")
            response = self.client.post('/api/teams', json.dumps(data), content_type='application/json')
            assert(response.status_code == status.HTTP_201_CREATED)

        self.api_authentication_as("UserTestCase_3")
        for i in range(3):  #uzytkownik 3 jest hostem 2 zespolow aktualnych
            data = get_data_to_create_team("TeamTestCase_3_" + str(i+1), "2030-11-04T00:05:23")
            response = self.client.post('/api/teams', json.dumps(data), content_type='application/json')
            assert(response.status_code == status.HTTP_201_CREATED)

    def api_authentication_as(self, user_name:str):   # jeżeli chcesz byc zalogowany jako uzytkownik user_name
        account = Account.objects.get(user_name = user_name)
        token = Token.objects.get(user = account)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    # api/teams
    def test_create_team(self):
        self.api_authentication_as("UserTestCase_1")   # wysylanie tokenu
        data = get_data_to_create_team("TeamTestCase_test_create", "2011-11-04T00:05:23")
        response = self.client.post('/api/teams', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_all_teams(self):
        self.api_authentication_as("UserTestCase_1")   # wysylanie tokenu
        response = self.client.get('/api/teams')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 6) # 6, a nie 5 bo w tescie test_create_team() tworzymy kolejny nieaktualny team

    
    def test_join_team_process(self):
        # uzytkownik 2 dolacza do zespolu TeamTestCase_3_1 (wchodzi na liste chetnych)
        team = Team.objects.get(name = "TeamTestCase_3_1")
        person_joining = User.objects.get(user_name = "UserTestCase_2")
        host = User.objects.get(user_name = "UserTestCase_3")
        self.api_authentication_as("UserTestCase_2")
        data = {
            "team_id": team.id,
            "person_joining": str(person_joining.user_name)
        }
        response = self.client.put('/api/teams', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.api_authentication_as("UserTestCase_3") # przelogowanie na hosta

        # sprawdzamy powiadomienia
        response = self.client.get('/api/waiting_people')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # sprawdzenie czy uzytkownik 2 jest na liscie oczekujacych
        is_team_in_list = False
        for p in response.data:
            if p["team_id"] == team.id:
                self.assertEqual(len(p["waiting_people"]), 1)
                self.assertEqual(p["waiting_people"][0]["id"], person_joining.id)
                is_team_in_list = True
        self.assertEqual(is_team_in_list, True)

        # przenosimy uzytkownika 2 z listy oczekujacych na liste zaakceptowanych
        data = {
            "team_id":team.id,
            "people_to_accept":[str(person_joining.user_name)]
        }
        response = self.client.put('/api/teams', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # sprawdzenie czy uzytkownik jest na liscie zaakceptowanych
        response = self.client.get(f'/api/team_by_ID/{str(team.id)}/') 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data["accepted_people_id"]), 1)
        self.assertEqual(response.data["accepted_people_id"].pop(), person_joining.id)


    def test_my_teams(self):
        self.api_authentication_as("UserTestCase_1")   # wysylanie tokenu
        data = get_data_to_create_team("TeamTestCase_test_my_teams", "2011-11-04T00:05:23")
        data['accepted_people'].append(User.objects.get(user_name = "UserTestCase_2").id)
        response = self.client.post('/api/teams', json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.api_authentication_as("UserTestCase_2")   # wysylanie tokenu
        response = self.client.post('/api/my_teams')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(len(response.data['my_teams']), 4)

