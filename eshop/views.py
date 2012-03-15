from django.shortcuts import render_to_response
from first_site.eshop.models import *

def purchase_type_list(request):
		
	type_list = PurchaseType.objects.all()
		
	return render_to_response('purchase_type_list.html', {'type_list':type_list})

def purchase_list(request, purchase_type, category_id):
	
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
		
	purchase_list = Purchase.objects.filter(type=purchase_type, category=category_id)
	
	try:
		purchase_type=PurchaseType.objects.get(id=purchase_type)
	except PurchaseType.DoesNotExist:
		purchase_type=None
		
	try:
		category=Category.objects.get(id=category_id)
	except Category.DoesNotExist:
		category=None
		
	return render_to_response('purchase_list.html', {'purchase_type':purchase_type, 'purchase_list':purchase_list})
	
def purchase_detail(request, purchase_id):
	
	try:
		purchase_id = int(purchase_id)
	except ValueError:
		purchase_id=0
		
	product_list = Product.objects.filter(purchase=purchase_id)
	
	try:
		purchase=Purchase.objects.get(id=purchase_id)
	except Purchase.DoesNotExist:
		purchase=None
		
	return render_to_response('purchase_detail.html', {'purchase':purchase, 'product_list':product_list})
	
	
def product_detail(request, product_id):
	try:
		product_id = int(product_id)
	except ValueError:
		purchase_id=0
		
	try:
		product=Product.objects.get(id=product_id)
	except Product.DoesNotExist:
		product=None
		
	return render_to_response('product_detail.html', {'product':product})