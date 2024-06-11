
# Create your models here.
from django.utils import timezone
from django.db import models
from django.urls import reverse


# This is an auto-generated Django model module for Nile's built-in tables
class TenantUsers(models.Model):
    tenant_id = models.UUIDField(primary_key=True)  # The composite primary key (tenant_id, user_id) found, that is not supported. The first column is selected.
    user_id = models.UUIDField()
    created = models.DateTimeField()
    updated = models.DateTimeField()
    deleted = models.DateTimeField(blank=True, null=True)
    roles = models.TextField(blank=True, null=True)  # This field type is a guess.
    email = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tenant_users'
        unique_together = (('tenant_id', 'user_id'),)


class Tenants(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    deleted = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tenants'


class Users(models.Model):
    id = models.UUIDField(primary_key=True)
    created = models.DateTimeField()
    updated = models.DateTimeField()
    deleted = models.DateTimeField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    family_name = models.TextField(blank=True, null=True)
    given_name = models.TextField(blank=True, null=True)
    email = models.TextField(unique=True, blank=True, null=True)
    picture = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

def one_week_hence():
    return timezone.now() + timezone.timedelta(days=7)

# we are going to pre-create this table in the database
# because Nile doesn't work great with Django migrations

# create table todos (
#    title varchar(100),
#    description text,
#    created_date timestamp default now(),
#    due_date timestamp,
#    tenant_id uuid references tenants(id));
    

class ToDoItem(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(default=one_week_hence)
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
        ordering = ["due_date"]