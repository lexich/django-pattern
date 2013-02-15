from django.conf.urls import patterns, url, include
from django.contrib.sitemaps import Sitemap
from datetime import datetime


class AbstractSitemapClass(object):
    changefreq = 'daily'
    url = None

    def get_absolute_url(self):
        return self.url


class StaticSitemap(Sitemap):
    pages = {
        'home': "/"
    }
    main_sitemaps = []

    lastmod = datetime.today()
    priority = 1
    changefreq = "yearly"

    main_sitemaps = []

    def __init__(self):
        for page in self.pages.keys():
            sitemap_class = AbstractSitemapClass()
            sitemap_class.url = self.pages[page]
            self.main_sitemaps.append(sitemap_class)

    def items(self):
        return self.main_sitemaps


sitemaps = {
    'static': StaticSitemap()
}