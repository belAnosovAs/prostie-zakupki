from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('first_site.views',
	url('^$', 'main', name="main"),
	url('^public_offer$', 'public_offer', name="public_offer"),
	url('^registration/$', 'registration', name="registration"),
	url('^add_purchase/$', 'add_purchase', name="add_purchase"),
	# Examples:
	# url(r'^$', 'first_site.views.home', name='home'),
	# url(r'^first_site/', include('first_site.foo.urls')),
	
	# Uncomment the admin/doc line below to enable admin documentation:
	url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
	
	# Uncomment the next line to enable the admin:
	url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('first_site.eshop.views',

	url('^purchase/$', 'purchase_type_list', name="purchase_type_list"),
	url('^purchase(?P<purchase_type>\d{0,1})/category(?P<category_id>\d{1,2})/$', 'purchase_list', name="purchase_list"),
	url('^purchase_detail(?P<purchase_id>\d{1,3})/$', 'purchase_detail', name="purchase_detail"),
	url('^product_detail(?P<product_id>\d{1,3})/$', 'product_detail', name="product_detail"),
	
	#Список товаров закупки
	#url(r'^zakupka(\d{1,2})/$', 'view_product_list', name="zakupka_url"),
	#Карточка товара
	#url(r'^product(\d{1,4})/$', 'product_list', name="product_url"),
)

from django.conf import settings
if settings.DEBUG:
	urlpatterns += patterns('',
		(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root':settings.MEDIA_ROOT}),
		)
