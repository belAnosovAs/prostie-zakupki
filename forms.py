from django import forms

class RegistrationForm(forms.Form):
	user_name = forms.CharField(max_length=30, label='Логин')
	password1 = forms.CharField(max_length=128, label='Пароль')
	password2 = forms.CharField(max_length=128, label='Пароль еще раз')
	email = forms.EmailField(max_length=75, label='Электронная почта')
	first_name = forms.CharField(required=False, max_length=30, label='Имя')
	last_name = forms.CharField(required=False, max_length=30, label='Фамилия')
	phone = forms.CharField(required=False, max_length=30, label='Моб. телефон')