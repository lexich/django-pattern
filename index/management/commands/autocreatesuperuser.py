# -*- coding: utf-8 -*-
from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):    
	help = 'Autocreate super user login(admin) pass(admin)'

	def handle(self, *args, **options):
		from django.contrib.auth.models import User
		user = User.objects.create_user('admin', 'admin@admin.com', 'admin')
		user.is_staff = True
		user.save()
