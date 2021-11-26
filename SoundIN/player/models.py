from django.db import models
from django.contrib.auth.models import AbstractBaseUser, AbstractUser, UserManager


class User(AbstractUser):
	id = models.AutoField(primary_key=True)
	email = models.EmailField(null=False, blank=False, unique=True)
	password = models.CharField(null=False, max_length=32, blank=False)
	username = models.CharField(max_length=50)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']

	def __str__(self) -> str:
		return self.username

class Song(models.Model):
    # user = models.ForeignKey(User,on_delete=models.CASCADE)

    #user_id = models.IntegerField(null=False, default=2)
    song_id = models.AutoField(primary_key=True)
    song_name = models.CharField(max_length=40)
    song_file = models.FileField(upload_to='songs')
    song_singer = models.CharField(max_length=30)
    song_desc = models.CharField(max_length=50)
    user_id = models.IntegerField(null=True)

    def __str__(self):
        return self.song_name 
    
    #def delete(self, *args, **kwargs):
	    #self.delete()
	    #super().delete(*args, **kwargs)
