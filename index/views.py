# -*- coding: utf-8 -*-
from django.views.generic.base import TemplateView

class IndexPage(TemplateView):
	"""docstring for IndexPage"""
	template_name  = "index/index.html"
