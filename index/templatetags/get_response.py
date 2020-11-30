from django import template
register = template.Library()

@register.filter
def get_response(responses, pk):
    return responses.response.get(answer_to__pk = pk).answer