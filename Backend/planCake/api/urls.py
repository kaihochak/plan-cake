# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/film-events/', include('api.urls')),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilmEventViewSet

router = DefaultRouter()
router.register(r'', FilmEventViewSet, basename='film-event')

urlpatterns = [
    path('', include(router.urls))
]
