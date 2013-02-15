#Production

from base_settings import *
import os

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PRO_DIR, "db", "data.sqlite"),
        }
}

