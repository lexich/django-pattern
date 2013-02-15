# -*- coding: utf-8 -*-
from django.contrib.flatpages.models import FlatPage

__author__ = 'lexich'




def process_settings(request):
    meta = {
        "flatpages": FlatPage.objects.all()
    }
    return dict(meta=meta)
