from django.http import HttpResponse
from django.core import serializers
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.http import JsonResponse
from . import models


def home(request):
    objects = models.Movie.objects.all()
    return render(request, "movies/home.html", {
        'theaters': models.Theater.objects.all(),
        'movies': models.Movie.objects.all(),
        "list_type": "Movies",
        "objects": objects,
    })



def list_movies(request):
    objects = models.Movie.objects.all()
    return render(request, "movies/list.html", {
        "list_type": "Movies",
        "objects": objects
    })

def list_theaters(request):
    objects = models.Theater.objects.all()
    return render(request, "movies/list.html", {
        "list_type": "Theaters",
        "objects": objects,

    })

def movie_detail(request, movie_id):
      movie = get_object_or_404(models.Movie, movie_id=movie_id)
      theater_objects = movie.theaters.all()
      theaters = []
      for t, theater in enumerate(theater_objects):
          theaters.append(theater.name)

      context = {
        'title' : movie.title,
        'poster' : "https://" + movie.poster,
        'theaters' : theaters,
        'rating' : movie.rating,
      }
      return render(request, "movies/movie_detail.html", context)


def theater_detail(request, th_id):
      theater = get_object_or_404(models.Theater, th_id=th_id)
      movie_objects = theater.movie_set.all()

      context = {
        'name' : theater.name,
        'address' : theater.address,
        'phone' : theater.phone,
        'movies' : movie_objects,
      }
      return render(request, "movies/theater_detail.html", context)
