from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
	parent = models.ForeignKey("self", null=True, blank=True, default=None)
	name = models.CharField(max_length=50)
	image = models.ImageField(upload_to='image/catalogs/', null=True, blank=True)
	def __unicode__(self):
		return self.name
	@models.permalink
	def get_absolute_url(self):
		return ('category_url', [str(self.id)])
		
	 
class ZakupkaState(models.Model):
	name = models.CharField(max_length=30)
	comment = models.TextField(null=True, blank=True)
	image = models.ImageField(upload_to='image/purchases/', null=True, blank=True)
	def __unicode__(self):
		return self.name
		
class ZakupkaType(models.Model):
	name = models.CharField(max_length=30)
	comment = models.TextField(null=True, blank=True)
	image = models.ImageField(upload_to='image/purchases/', null=True, blank=True)
	def __unicode__(self):
		return self.name
	 
class Zakupka(models.Model):
	is_accept = models.NullBooleanField(null=True)
	org_user = models.ForeignKey(User)
	type = models.ForeignKey(ZakupkaType)
	category = models.ForeignKey(Category)
	state = models.ForeignKey(ZakupkaState)
	name = models.CharField(max_length=200)
	org_percent = models.FloatField()
	minimal_sum = models.FloatField()
	comment = models.TextField(null=True, blank=True)
	tag = models.CharField(max_length=200, null=True, blank=True)
	def __unicode__(self):
		return self.name
	@models.permalink
	def get_absolute_url(self):
		return ('zakupka_url', [str(self.id)])
	
class HistoryPurchase(models.Model):
	date = models.DateField(auto_now_add=True)
	zakupka = models.ForeignKey(Zakupka)
	state = models.ForeignKey(ZakupkaState)
	
class Product(models.Model):
	zakupka = models.ForeignKey(Zakupka)
	name = models.CharField(max_length=50)
	article = models.CharField(max_length=13)
	link = models.CharField(max_length=250)
	price = models.FloatField()
	image = models.ImageField(upload_to='image/products/', null=True, blank=True)
	price_list = models.FileField(upload_to='files/price_list/', null=True, blank=True)
	comment = models.TextField(null=True, blank=True)
	def __unicode__(self):
		return self.name
	@models.permalink
	def get_absolute_url(self):
		return ('product_url', [str(self.id)])
	
class Order(models.Model):
	date = models.DateTimeField(auto_now_add=True, auto_now=True)
	user = models.ForeignKey(User)
	product = models.ForeignKey(Product)
	article = models.CharField(max_length=13) 
	number = models.IntegerField()
	sum = models.FloatField()
	org_sum = models.FloatField()
	total_sum = models.FloatField()
	comment = models.TextField(null=True, blank=True)
	is_accept = models.NullBooleanField(null=True)
	is_paid = models.NullBooleanField(null=True)
	is_deliv = models.NullBooleanField(null=True)