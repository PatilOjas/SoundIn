"""SoundIN URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from player import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from django.conf import settings
import allauth
import rest_framework

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.login, name="login"),
    path('signup/', views.signup, name="signup"),
	path('jwtregister', views.RegisterView.as_view(), name="jwtregister"),
	path('jwtlogin', views.LoginView.as_view(), name="jwtlogin"),
	path('user', views.UserView.as_view(), name="user"),
	path('logout', views.logout, name="logout"),
	path('auth_accounts/', include('allauth.urls')),
	path('rest_framework/', include('rest_framework.urls')),
	path('categories/', views.redirector, name='redirector'),
	path('categories/<int:uid>/', views.categories, name='categories'),
	path("library/<int:uid>/", views.library, name='library'),
	path('playlistpage/<int:uid>/<str:playlist>/', views.playlistPage, name='playlistpage'),
	path('addsong/<int:uid>/', views.addSong),
	path('library/<int:uid>/delete/<int:song_id>/', views.song_delete, name='song-delete'),
	path('users/',views.UserViewSet.as_view({'get': 'list'})),
	path('songs',views.SongViewSet.as_view({'get':'list'})),
	path('songs/<int:song_id>/',views.SongViewSet.as_view({'get':'retrieve'})),
	path('songs/update/<int:song_id>/',views.SongUpdateView.as_view()),
	path('addsongs/',views.SongViewSet.as_view({'post': 'create'})),
	path('delete/<int:song_id>/',views.SongDeleteView.as_view()),
	# path('gauth', views.gAuth)
	# path('auth_accounts/social/signup/', views.login)
]

# http://127.0.0.1:8000/auth_accounts/google/login/callback/

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL,document_root= settings.MEDIA_ROOT)
