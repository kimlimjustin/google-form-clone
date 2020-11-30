from django import template
register = template.Library()

@register.filter
def to_int(number):
    return int(number)