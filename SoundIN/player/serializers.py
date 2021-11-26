from django.db.models import fields
from rest_framework import serializers,viewsets
from .models import User,Song

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password', 'name')

class songSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields=('user','song_id','song_name', 'song_file', 'song_singer', 'song_desc')

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'password']
		extra_kwargs = {
			'password': {'write_only': True}
		}

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance