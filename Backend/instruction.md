# Backend Instruction

Run Django server: 

    python3 manage.py runserver

- go to `{path}`/admin


Apply migrations:

    python3 manage.py makemigrations
    python3 manage.py migrate


# Django database setup
https://docs.djangoproject.com/en/4.2/ref/models/fields/
1. go to api/models.py and create your model!
2. create api/serializer.py
3. create api/urls.py
4. update api/admin.py
5. update views.py

# Create an entry
https://medium.com/geekculture/how-to-django-creating-and-managing-models-databases-ae794b4d69a9

    python manage.py shell
    from api.models import FilmEvent
    evemt = FilmEvent(title="Jungle Book")
    event.save()

# Set up backend process

Install Django code:
https://docs.djangoproject.com/en/4.2/topics/install/

    python3 -m pip install Django

Install Django REST framework
https://www.django-rest-framework.org/#installation

    pip3 install djangorestframework

Create a project
https://docs.djangoproject.com/en/4.2/intro/tutorial01/

    django-admin startproject planCake 

Create an application inside of django

    python3 manage.py startapp api


update planCake/settings.py

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'api', # new
    ]

Development server
https://docs.djangoproject.com/en/4.2/intro/tutorial01/

    python3 manage.py runserver


Add Django REST 

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'api',
        'rest_framework', # Django REST Framework
    ]

Applying migration

    python3 manage.py migrate

Create Super User

    python3 manage.py createsuperuser