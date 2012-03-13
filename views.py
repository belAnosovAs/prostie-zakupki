from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from first_site.eshop.models import *

from django import forms as forms
from first_site.forms import RegistrationForm

def main(request):
	return render_to_response('main.html')
	
def public_offer(request):
	return render_to_response('public_offer.html')
	
def registration(request):
	if request.method == 'POST':
		form=RegistrationForm()
		return HttpResponseRedirect('main')
	else:
		form=RegistrationForm()
		data, errors = {}, {'form':form,}
		
	return render_to_response('registration.html')
	
def add_purchase(request):
	return render_to_response('add-edit_zakupka.html')