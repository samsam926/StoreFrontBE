# StoreFrontBE

##ENV

POSTGRES_HOST = "127.0.0.1"
POSTGRES_DB = "shopping"
POSTGRES_DB_TEST = "shopping_test"
POSTGRES_USER = "postgres"
POSTGRES_PASSWORD = "password123"
ENV=dev
BCRYPT_PASSWORD="s0//P4$$w0rD"
SALT_ROUNDS=10
JSONSECRETKEY=JSONTOKENTEST

## Runing Commands

<!-- Create User -->

CREATE USER shopping_user WITH PASSWORD 'password123';

<!-- creating database for dev -->

-- CREATE DATABASE shopping;
-- GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;

<!-- creating database for test -->

-- CREATE DATABASE shopping_test;
-- GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;

<!-- Run Commands -->

For testing Use 'npm run test' command
For testing Database Use 'npm run test:intg' command
For start server Use 'npm run start' command
For build TS Use 'npm run build' command
For prettier Use 'npm run prettier' command
For eslint Use 'npm run lint' command
For migration UP Use 'db-migrate up' command
For migration Down Use 'db-migrate down' command

## Use Image Processing

Endpoints to access

<http://localhost:5000/>

<!-- for Users -->

<http://localhost:5000/user/>
<http://localhost:5000/user/createUser>
<http://localhost:5000/user/:id>
<http://localhost:5000/user/updateUser>

<!-- create body -->

{
"firstName": "haitham",
"lastName": "magdy",
"password": "password123"
}

<!-- for products -->

<http://localhost:5000/product>
<http://localhost:5000/product/:id>
<http://localhost:5000/product/create-product>

<!-- create body -->

{
"name": "product1",
"price": "10",
"category": "category1"
}

<!-- for Orders -->

<http://localhost:5000/order>
<http://localhost:5000/user/1/orders>
<http://localhost:5000/user/1/create-order>

<!-- create body -->

{
"products": "1,2,3",
"status": "active",
"product_quantity": "3"
}
