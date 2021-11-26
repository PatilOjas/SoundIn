from django import template
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.dispatch import receiver
from django.conf import settings
import django.contrib.auth.models as Auth
from rest_framework import serializers,viewsets
from rest_framework import response
from rest_framework.authtoken.models import Token
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.test import APIRequestFactory
from rest_framework.request import Request
from rest_framework.parsers import JSONParser
from rest_framework.renderers import TemplateHTMLRenderer
from .serializers import UserSerializer, userSerializer,songSerializer
from player.forms import SongForm
from player.forms import userForm
from player.models import Song, User
import spotipy
import requests
from spotipy.oauth2 import SpotifyClientCredentials
import os, json
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.hashers import make_password
import datetime, jwt
from django.urls import reverse
from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.exceptions import ImmediateHttpResponse
from allauth.socialaccount.signals import pre_social_login
from allauth.account.utils import perform_login
from allauth.utils import get_user_model

# Create your views here.
# current_user_id = -1

class MyLoginAccountAdapter(DefaultAccountAdapter):
    '''
    Overrides allauth.account.adapter.DefaultAccountAdapter.ajax_response to avoid changing
    the HTTP status_code to 400
    '''

    def get_login_redirect_url(self, request):
        """ 
        """
        if request.user.is_authenticated():
            return settings.LOGIN_REDIRECT_URL.format(
                id=request.user.id)
        else:
            return "/"


class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    '''
    Overrides allauth.socialaccount.adapter.DefaultSocialAccountAdapter.pre_social_login to 
    perform some actions right after successful login
    '''
    def pre_social_login(self, request, sociallogin):
        pass    # TODOFuture: To perform some actions right after successful login

@receiver(pre_social_login)
def link_to_local_user(sender, request, sociallogin, **kwargs):
    ''' Login and redirect
    This is done in order to tackle the situation where user's email retrieved
    from one provider is different from already existing email in the database
    (e.g facebook and google both use same email-id). Specifically, this is done to
    tackle following issues:
    * https://github.com/pennersr/django-allauth/issues/215

    '''
    email_address = sociallogin.account.extra_data['email']
    User = get_user_model()
    users = User.objects.filter(email=email_address)
    if users:
        # allauth.account.app_settings.EmailVerificationMethod
        perform_login(request, users[0], email_verification='optional')
        raise ImmediateHttpResponse(redirect(settings.LOGIN_REDIRECT_URL.format(uid=request.user.id)))


class RegisterView(APIView):
	renderer_class = [TemplateHTMLRenderer]
	def post(self, request):
		serializer = UserSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save()
		return Response(serializer.data)

class LoginView(APIView):
	def post(self, request):
		email = request.data['email']
		password = request.data['password']
		print(email, password)
		user = User.objects.filter(email=email).first()
		print("User: ", user)

		if user is None:
			raise AuthenticationFailed("User not found!")

		if not user.check_password(password):
			raise AuthenticationFailed("Incorrect password!")

		payload = {
			'id': user.id,
			'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
			'iat': datetime.datetime.utcnow()
		}

		# token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
		token = jwt.encode(payload, 'secret', algorithm='HS256')

		response = Response()
		
		response.set_cookie(key='jwt', value=token, httponly=True)

		response.data = {
			'jwt': token
		}

		return response

class UserView(APIView):
	def get(self, request):
		token = request.COOKIES.get('jwt')
		if not token:
			raise AuthenticationFailed("Unauthenticated!")

		try: 
			payload = jwt.decode(token, 'secret', algorithms=['HS256'])
		
		except jwt.ExpiredSignatureError:
			raise AuthenticationFailed("Unauthenticated!")

		user = User.objects.filter(id=payload['id']).first()
		serializer = userSerializer(user)

		return Response(serializer.data)

class LogoutView(APIView):
	def post(self):
		response = Response()
		response.delete_cookie('jwt')
		response.data = {
			'message': 'success'
		}
		return response

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = userSerializer

class SongViewSet(viewsets.ModelViewSet):
	serializer_class = songSerializer
	queryset = Song.objects.all()

	def list(self, request, *args, **kwargs):
		queryset = Song.objects.all()
		serializer = songSerializer(queryset,many=True)
		return Response(serializer.data)

	def retrieve(self, request, song_id):
		queryset = Song.objects.all()
		song = get_object_or_404(queryset=queryset,song_id=song_id)
		serializer = songSerializer(song)
		return Response(serializer.data)

class SongDetailView(viewsets.generics.RetrieveAPIView):
	serializer_class = songSerializer
	lookup_field = 'song_id'
	queryset = Song.objects.all()

class SongDeleteView(viewsets.generics.DestroyAPIView):
	serializer_class = songSerializer
	lookup_field = 'song_id'
	queryset = Song.objects.all()

class SongUpdateView(viewsets.generics.UpdateAPIView):
	serializer_class = songSerializer
	lookup_field = 'song_id'
	queryset = Song.objects.all()
	http_method_names = ['get','put']

	def update(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = self.get_serializer(instance,data=request.data,partial=True)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		else:
			return Response(serializer.data)

def categories(request, uid = -1):
	try:
		print(uid)
		q = User.objects.filter(id=uid)[0]
		user = {'name': q.username}
	except:
		user = {'user_id': -1, 'name': 'Anonymous'}
	print(user)
	if uid != -1:
		response = requests.get("http://localhost:3000/")
		dataCategories = (response.json())
		data = {'user':user,
		'dataCategories' : dataCategories,
		'uid': uid
		}
	else:
		return redirect('/')
	#return HttpResponse(data)
	return render(request, 'categories.html', data)

def library(request, uid = -1):
	print("library", uid)
	if uid == -1:
		return redirect('/')
	try:
		q = User.objects.filter(id=uid)[0]
		user = {'name': q.username}
	except:
		user = {'user_id': -1, 'name': 'Anonymous'}
	#print(current_user_id)
	#print(request.user)

	data = {'user':user,
			'mylibrary': [],
			'uid': uid
		}
	try:
		us = User.objects.get(id=uid)
		# print(us)
		query = Song.objects.filter(user_id=uid)
		print(query)
		data['mylibrary'] = list(query.values())
		for _ in data['mylibrary']:
			_['song_file'] = '/../media/' + str(_['song_file'])
		print(data['mylibrary'])
	except:
		print("error")
		pass
	return render(request, 'library.html', data)

def playlistPage(request, playlist, uid):
	fresults = []
	data = (requests.get("https://api.unsplash.com/photos/a7e71c0jSgQ?client_id=btiCQcHkbunjS7pIGbyncLUAaXM9xFgxW8gML2k8Qto")).json()
	url = data['urls']
	img_url = (url['raw'])
	print(img_url)
	if playlist== 'Work Music':
		uri = 'spotify:artist:2TOripE27hynVXGqO1ilyl'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Focus PLaylist 1':
		uri = 'spotify:artist:4LPnjKJNGs4iU3gVbP2fUn'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Mood playlists 1':
		uri = 'spotify:artist:3tHD07u1ON4uHxmnT9rwqZ'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Mood playlists 2':
		uri = 'spotify: artist:6eUKZXaKkcviH0Ku9w2n3V'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Home playlists 1':
		uri = 'spotify:artist:4yznag7I8GkHBsrFrxdxvT'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Home playlists 2':
		uri = 'spotify:artist:3wCYobOehmk6hFQaIJZUJv'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Home playlists 3':
		uri = 'spotify: artist:7HQUzNqaFcbReC7qiuVUC0'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]

	if playlist== 'Sunday playlists 1':
		uri = 'spotify: artist:2Ud11Vf0vmBQ9ePMeg5j6F'
		spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='26252aded60646f1a4241dbe33c60e9f',
																client_secret='56dbc2d4765941c0b553f1ea3fc3b9f2'))
		results = spotify.artist_top_tracks(uri)
		fresults = results['tracks'][:10]
	
	if playlist == 'Your Talent Playlist':
		query = Song.objects.all()
		fresults = []
		data['mylibrary'] = list(query.values())
		for _ in data['mylibrary']:
			uSong = {}
			uSong['name'] = _['song_name']
			uSong['album'] = {}
			uSong['album']['images'] = [{'url': "/../static/images/logo.png"}]
			uSong['preview_url'] = '/../media/' + str(_['song_file'])
			fresults.append(uSong)

	try:
		q = User.objects.filter(id=uid)[0]
		user = {'name': q.username}
	except:
		user = {'user_id': -1, 'name': 'Anonymous'}
	return render(request, 'playlists.html', {'user':user,'results':fresults,'playlist':playlist, 'uid':uid})

def logout(request):
	factory = APIRequestFactory()
	r = factory.post('/', json.dumps(dict(request.POST)), content_type='application/json')
	cr = Request(r, parsers=[JSONParser()],)
	x = LogoutView().post()
	# token = x.data['message']
	# decoded = jwt.decode(token, options={"verify_signature": False})
	# print(decoded)
	return redirect('login')
	# lgot = LogoutView()

def addSong(request, uid):
	# global current_user_id
	if uid == -1:
		return redirect('/')
	try:
		q = User.objects.filter(id=uid)[0]
		user = {'name': q.username}
	except:
		user = {'user_id': -1, 'name': 'Anonymous'}
	if request.method == 'POST':
		print(request)
		form = SongForm(request.POST, request.FILES)
		print(form)
		if form.is_valid():
			song = form.save(commit=True)
			song.user_id = q.id
			song.save()
			return redirect(reverse('library', kwargs={'uid':uid}))
	return render(request, 'addsong.html', {'user':user, 'uid': uid})

def login(request):
	global current_user_id
	id = -1
	if request.method == "GET /auth_accounts/google/login/callback/":
		print(request)
	

	if request.method == 'POST':
		email = request.POST['email']
		password = request.POST['password']
		x = {
			'email': email,
			'password': password
		}
		factory = APIRequestFactory()
		r = factory.post('/', json.dumps(x), content_type='application/json')
		cr = Request(r, parsers=[JSONParser()],)
		x = LoginView().post(cr)
		token = x.data['jwt']
		decoded = jwt.decode(token, options={"verify_signature": False})
		# print(decoded)
		id = decoded['id']
				
		if id > 0:
			return redirect(reverse('categories', kwargs={"uid": id}))
		else:
			return redirect('/')	
	return render(request, 'login.html')

def signup(request):
	global current_user_id
	if request.method == 'POST':
		x = {
			'username': request.POST['name'],
			'email': request.POST['email'],
			'password': request.POST['password1']
		}
		
		factory = APIRequestFactory()
		r = factory.post('register/', json.dumps(x), content_type='application/json')
		cr = Request(r, parsers=[JSONParser()],)
		print(cr)
		print(RegisterView().post(cr).data)
			
		# query = User.objects.filter(email__startswith=request.POST['email'], password__startswith=request.POST['password1'])
		# print(query)
		# current_user_id = query.user_id
		return redirect('login')
	return render(request, 'signup.html')
		
def song_delete(request, uid, song_id):
	if request.method == 'POST':
		song = Song.objects.get(song_id=song_id)
		song.delete()
	return redirect(reverse('library', kwargs={'uid': uid}))

def redirector(request):
	q = User.objects.all()
	q1 = q[len(q)-1]
	uid = q1.id
	print(q1)
	return redirect(reverse('categories', kwargs={'uid': uid}))
	