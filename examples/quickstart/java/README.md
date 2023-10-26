# Multi-tenant todo list app with Nile, Java and Spring Boot 3

This template shows how to use Nile with Java and Spring Boot 3 for building a multi-tenant todo list application.

- [Live demo](https://java-quickstart-demo.vercel.app)
- [Video guide](https://youtu.be/xnji861fsf4?feature=shared)
- [Step by step guide](https://niledatabase-www.vercel.app/docs/getting-started/languages/java)


## Getting Started

### 1. Create a new database

Sign up for an invite to [Nile](https://thenile.dev) if you don't have one already and choose "Yes, let's get started". Follow the prompts to create a new workspace and a database.

### 2. Create todo table

After you created a database, you will land in Nile's query editor. Since our application requires a table for storing all the "todos" this is a good time to create one:

```sql
    create table todos (id uuid, tenant_id uuid, title varchar(256), complete boolean);
```

If all went well, you'll see the new table in the panel on the left hand side of the query editor. You can also see Nile's built-in tenant table next to it.

### 3. Getting credentials

In the left-hand menu, click on "Settings" and then select "Credentials". Generate credentials and keep them somewhere safe. These give you access to the database.

### 4. Setting the environment

If you haven't cloned this repository yet, now will be an excellent time to do so.

```bash
git clone https://github.com/niledatabase/niledatabase
cd niledatabase/examples/quickstart/java
```

Copy `src/main/resources/application.example` to `src/main/resources/application.properties` and fill in the details of 
your Nile DB.

It should look something like this:
```bash
spring.datasource.jdbc-url=jdbc:postgresql://db.thenile.dev:5432/funky_giraffe
spring.datasource.username=018a6b69-b1e9-7574-b8f3-efd5fe63d9bb
spring.datasource.password=d757518e-6d52-4bdb-b85f-f008c9f80097
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jackson.serialization.FAIL_ON_EMPTY_BEANS=false
```

## Build:
```bash
mvn clean package
```

You should see the Maven build complete with the following output:
```text
[INFO] --- spring-boot:3.1.0:repackage (repackage) @ todo-nile ---
[INFO] Replacing main artifact /niledatabase/examples/quickstart/java/target/todo-nile-0.0.1-SNAPSHOT.jar with repackaged archive, adding nested dependencies in BOOT-INF/.
[INFO] The original artifact has been renamed to /niledatabase/examples/quickstart/java/target/todo-nile-0.0.1-SNAPSHOT.jar.original
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

## Run
```bash
java -jar target/todo-nile-0.0.1-SNAPSHOT.jar
```

You should see the application starting with the last line of output saying:
```text
2023-09-16T16:56:38.685-07:00  INFO 16200 --- [           main] com.example.todowebapp.TodoWebapp        : 
Started TodoWebapp in 2.648 seconds (process running for 2.886)
```


## Try it out

This is a backend service that exposes REST APIs with the todo list functionality. 
You can experiment with these APIs with `curl`:

```bash
curl --location --request POST 'localhost:8080/tenants' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"my first customer"}'

# replace the tenant ID in the URL: 
curl  -X POST \
  'http://localhost:8080/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "feed the cat", "complete": false}'

curl  -X GET 'http://localhost:8080/tenants'

# replace the tenant ID in the URL: 
curl  -X GET \
  'http://localhost:8080/tenants/108124a5-2e34-418a-9735-b93082e9fbf2/todos' 

# you'll need to create another todo with another tenant to see anything different here
curl  -X GET \
  'http://localhost:8080/insecure/all_todos'
```

## Running a Docker Image

You can build and run a Docker image of this example by running:
```text
docker build -t todo-java .
docker run -p 8080:8080 todo-java
```

If you have Fly.io account, you can deploy on Fly.io by running:
```test
fly launch
fly deploy --ha=false
```

Make sure you use the `.dockerignore` file from this repo. Fly's generated .dockerignore ignores the main jar for this application.
