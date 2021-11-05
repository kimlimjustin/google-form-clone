from django import template
import random
register = template.Library()

@register.filter
def generate_color(_):
    return f"rgb({random.randint(0, 255)},{random.randint(0, 255)},{random.randint(0, 255)})"