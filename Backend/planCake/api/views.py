from django.shortcuts import render

from .serializers import FilmEventSerializer
from rest_framework import generics
from .models import FilmEvent

# Create your views here.

class FilmEventListCreate(generics.ListCreateAPIView):
    queryset = FilmEvent.objects.all()
    serializer_class = FilmEventSerializer

