from django import template
register = template.Library()

@register.filter
def get_responses(responses, pk):
    return responses.response.filter(answer_to__pk = pk)

@register.filter
def is_response(responses, pk):
    for i in responses:
        if int(i.answer) == int(pk):
            return True
    return False
