from django.shortcuts import render_to_response
from first_site.eshop.models import *

def view_purchase_type_list(request):
		
	return render_to_response('main.html')

def view_purchase_list(request, purchase_type, category_id):
	
	try:
		category_id = int(category_id)
	except ValueError:
		category_id = 0
		#raise Http404()
		
	try:
		purchase_type = int(purchase_type)
	except ValueError:
		purchase_type = 0
		#raise Http404()
		
	purchase_list = Zakupka.objects.filter(type=purchase_type, category=category_id)
	
	try:
		purchase_type=ZakupkaType.objects.get(id=purchase_type)
	except ZakupkaType.DoesNotExist:
		purchase_type=None
		
	try:
		category=Category.objects.get(id=category_id)
	except Category.DoesNotExist:
		category=None
		
	return render_to_response('purchase_list.html', {'purchase_type':purchase_type, 'purchase_list':purchase_list})
	
def view_purchase_detail(request, purchase_id):
	
	try:
		purchase_id = int(purchase_id)
	except ValueError:
		purchase_id=0
		
	product_list = Product.objects.filter(zakupka=purchase_id)
	
	try:
		purchase=Zakupka.objects.get(id=purchase_id)
	except Zakupka.DoesNotExist:
		purchase=None
		
	return render_to_response('purchase_detail.html', {'purchase':purchase, 'product_list':product_list})