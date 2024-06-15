from django.utils import timezone
from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import uuid

# This is an auto-generated Django model module for Nile's built-in tables
# With some updates to make it work with both Nile and Django

### Since we have our own User model, we need to create a custom user manager model too    
### Note that we don't need to save the user in the database, because we are using Nile's REST API for this 

### We also need to modify the User's table a bit to match the Django User model...
# alter table users.users add column last_login timestamp default now();

class CustomUserManager(BaseUserManager):
    def create_user(self, id, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        user = self.model(email=email, **extra_fields)
        user.id = id
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class Users(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    deleted = models.DateTimeField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    family_name = models.TextField(blank=True, null=True)
    given_name = models.TextField(blank=True, null=True)
    email = models.TextField(unique=True, blank=True, null=True)
    picture = models.TextField(blank=True, null=True)
    password = None
    
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()
    
    def __str__(self):
        return self.email

    class Meta:
        managed = False
        db_table = 'users'
        
class Tenants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100, blank=True, null=True) # actually text, but using Char for nicer display
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    deleted = models.DateTimeField(blank=True, null=True)
    users = models.ManyToManyField(Users, through='TenantUsers')
    
    def get_absolute_url(self):
        return reverse(
            "todos", args=[str(self.id)]
        )

    class Meta:
        managed = False
        db_table = 'tenants'
        
# Django really wants everything to have an ID, so even though this doesn't make sense for this kind of table, we'll add one
# alter table tenant_users add column id uuid default gen_random_uuid();
class TenantUsers(models.Model):
    tenant = models.ForeignKey(Tenants, on_delete=models.DO_NOTHING) 
    user = models.ForeignKey(Users, on_delete=models.DO_NOTHING)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    deleted = models.DateTimeField(blank=True, null=True)
    roles = models.TextField(blank=True, null=True)  # This field type is a guess.
    email = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tenant_users'
        unique_together = (('tenant_id', 'user_id'),)

def one_week_hence():
    return timezone.now() + timezone.timedelta(days=7)

# we are going to pre-create this table in the database
# because Nile doesn't work great with Django migrations

# create table todos (
#    id uuid default gen_random_uuid(),
#    title varchar(100),
#    created_date timestamp default now(),
#    completed boolean default false,
#    tenant_id uuid references tenants(id));
    

class ToDoItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    tenant = models.ForeignKey(Tenants, on_delete=models.DO_NOTHING)

    def get_absolute_url(self):
        return reverse(
            "item-update", args=[str(self.todo_list.id), str(self.id)]
        )

    def __str__(self):
        return f"{self.title}: due {self.due_date}"

    class Meta:
        managed = False
        db_table = 'todos'
        ordering = ["title"]
        



