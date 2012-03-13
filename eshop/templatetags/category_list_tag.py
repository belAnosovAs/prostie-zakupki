from django import template
from first_site.eshop.models import Category

register = template.Library()

@register.inclusion_tag('../templates/category_tree.html')
def category_list(purchase_type, parent = None):
	children = Category.objects.filter(parent=parent)
	return {'purchase_type':purchase_type, 'parent': parent, 'children' : children,}