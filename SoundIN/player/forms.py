from django import forms
from django.db.models import fields
from .models import Song, User

class SongForm(forms.ModelForm):
	class Meta:
		model = Song
		fields=('song_name', 'song_file', 'song_singer', 'song_desc')

class userForm(forms.ModelForm):
	class Meta:
		model = User
		fields = ('email', 'password', 'username')