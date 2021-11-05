from django import template
register = template.Library()

@register.filter
def get_property(array, index):
    return array[index]