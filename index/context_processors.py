# -*- coding: utf-8 -*-
from django.contrib.flatpages.models import FlatPage
from zinnia.models import Entry

__author__ = 'lexich'




def process_settings(request):
    meta = {
        "flatpages": FlatPage.objects.all(),
        "blogs": Entry.published.all()[:3]
    }
    return dict(meta=meta)
