from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

admin.autodiscover()

DEBUG=getattr(settings,"DEBUG",False)
MEDIA_URL=getattr(settings,'MEDIA_URL','/media/')
MEDIA_ROOT=getattr(settings,'MEDIA_ROOT','')

urlpatterns = patterns('',
    url(r'^', include('index.urls', namespace='index')),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
)

if DEBUG:
	urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)