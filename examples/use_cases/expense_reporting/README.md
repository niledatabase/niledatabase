# Example data set for expense reporting saas

The expense reporting data set is a sample database for an expense reporting SaaS. An Expensify clone, if you will. It can be used to learn how to use Nile in a real-world scenario or as a starting point for your own SaaS.

Here's an overview of the schema we use:

<img src=./expense_report_ERD.svg width="50%" height="auto"/>

Note that in this scenario all tables are [tenant aware](https://www.thenile.dev/docs/tenant-isolation): They all have `tenant_id` column and this column is part of their primary key. This is what allows Nile to provide isolation of the expense reporting data of each tenant.

The `employees` table has a few details that are worth paying attention to:

1. We decided to create employees as a separate table rather than add a few columns to `users.tenant_users`.
Both options are valid, but the separate table gives us the option to represent employees who are not users of our SaaS product.
1. The `id` column does not have an auto-generating sequence. The idea is that employee IDs usually need to align with their IDs in employee directories, HR and finance systems, and therefore should not be auto-generated.
2. `department` and `manager` columns are also assumed to match other HR systems and in real scenarios will require a system like SCIM to keep in sync.
3. `expense_reports` and `expense_report_approvals` tables both have columns that refer to `employee_id` and not to `user_id`. This will let us support future integration with employee directories and accounting systems.

## Using the dataset

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Getting credentials

In the left-hand menu, click on "Settings" and then select "Connection". 

Click on the Postgres button, then click "Generate Credentials" on the top right corner. Copy the connection string - it should now contain the credentials we just generated.

### 3. Creating the schema

```bash
psql postgres://018b778a-30df-7cdd-b55c-2f9664db39f3:ff3fb983-683c-4616-bbbc-519d8ddbbce5@db.thenile.dev:5432/gwen_db < schema.sql
```

### 4. Loading sample data

```bash
psql postgres://018b778a-30df-7cdd-b55c-2f9664db39f3:ff3fb983-683c-4616-bbbc-519d8ddbbce5@db.thenile.dev:5432/gwen_db < seed.sql
```

### 5. Check the results

Switch back to Nile console, you will be able to see the tables you created and the data in the query explorer

<!--- TBD: Screenshot --->