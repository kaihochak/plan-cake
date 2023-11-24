# Backend Instruction

Run Django server: 

    python3 manage.py runserver

Apply migrations:

    python3 manage.py migrate

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

8. Applying migration

    python3 manage.py migrate