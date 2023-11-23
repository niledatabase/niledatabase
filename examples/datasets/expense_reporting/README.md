# Example expense reporting data set

The expense reporting data set is a sample database for an expense reporting SaaS. An Expensify clone, if you will. It can be used to learn how to use Nile in a real-world scenario or as a starting point for your own SaaS.

<!--- TBD: ERD --->

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