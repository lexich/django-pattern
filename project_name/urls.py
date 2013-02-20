from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
admin.autodiscover()

DEBUG=getattr(settings,"DEBUG",False)
MEDIA_URL=getattr(settings,'MEDIA_URL','/media/')
MEDIA_ROOT=getattr(settings,'MEDIA_ROOT','')

urlpatterns = patterns('',
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^grappelli/', include('grappelli.urls')),
    url(r'^accounts/', include('registration.urls',namespace="registration")),
    url(r'^pages', include('django.contrib.flatpages.urls')),
    url(r'^blog/', include('zinnia.urls')),
    url(r'^comments/', include('django.contrib.comments.urls')),
    url(r'^', include('index.urls', namespace='index')),
)

if DEBUG:
	urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)