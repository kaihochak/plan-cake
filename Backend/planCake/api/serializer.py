from rest.framework import serializers
from .models import FilmEvent

class FilmEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmEvent
        fields = '__all__'