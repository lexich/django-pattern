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

MIDDLEWARE_CLASSES = tuple(
    list(MIDDLEWARE_CLASSES) + ['debug_toolbar.middleware.DebugToolbarMiddleware']
)
INTERNAL_IPS = ('127.0.0.1',)

INSTALLED_APPS = tuple(
    list(INSTALLED_APPS) + ['debug_toolbar']
)
DEBUG_TOOLBAR_PANELS = (
    'debug_toolbar.panels.version.VersionDebugPanel',
    'debug_toolbar.panels.timer.TimerDebugPanel',
    'debug_toolbar.panels.settings_vars.SettingsVarsDebugPanel',
    'debug_toolbar.panels.headers.HeaderDebugPanel',
    'debug_toolbar.panels.request_vars.RequestVarsDebugPanel',
    'debug_toolbar.panels.template.TemplateDebugPanel',
    'debug_toolbar.panels.sql.SQLDebugPanel',
    'debug_toolbar.panels.signals.SignalDebugPanel',
    'debug_toolbar.panels.logger.LoggingPanel',
)

DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False
}