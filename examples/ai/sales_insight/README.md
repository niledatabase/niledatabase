# Sales Insight

This example shows how to use Nile with Modal to build a sales insight application.

## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create tables

After you created a database, you will land in Nile's query editor. Time to create a table for storing all the "sales" data.



### 4. Deploy the app

To deploy in development mode run:

```bash
modal serve web_app.py
```

This will start an "ephemeral app" on Modal, which will reload on code changes, output logs to the console, and exit when you enter ctrl-c.

To deploy for "production" run. This will continue running in Modal, and you can make changes to the code and deploy more versions. 
Note that Modal is Serverless - so even though the app will continue running, you will only pay for the resources it consumes when it actually executes 
(e.g. when the APIs are called):

```bash
modal deploy web_app.py
```