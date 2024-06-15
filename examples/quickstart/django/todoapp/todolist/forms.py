from django import forms
from .models import ToDoItem

class SignupForm(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.CharField(widget=forms.PasswordInput, required=True)
    
class TodoItemForm (forms.ModelForm):
    class Meta:
        model = ToDoItem
        fields = ['title']
    
