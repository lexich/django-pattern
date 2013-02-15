# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url
from django.views.decorators.cache import cache_page
from django.views.generic.simple import direct_to_template
from sitemap import sitemaps
import views
from django.contrib.sitemaps import views as sitemaps_views


urlpatterns = patterns('',
    url(r'^$', views.IndexPage.as_view(), name='index'),
    url(r'^robots\.txt$', direct_to_template,{'template': 'robots.txt', 'mimetype': 'text/plain'}),
    url(r'^sitemap.xml$',cache_page(86400)(sitemaps_views.sitemap), {'sitemaps': sitemaps}, name="sitemap"),
)