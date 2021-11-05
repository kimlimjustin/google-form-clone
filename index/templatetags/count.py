from django import template
register = template.Library()

@register.filter
def count(array):
    return len(array)