# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index '/product' [GET]
- Show (args: product id) '/product/:id' [GET]
- Create [args: Product](token required) '/product/create-product' [POST]

#### Users

- Index [token required] '/user' [GET]
- Show [args: id](token required) '/user/:id' [GET]
- Create [args: User](token required) 'user/createUser' [POST]

#### Orders

- Create Order by user [args: user id](token required) '/user/:id/create-order' [post]
- Current Order Products [args: order id](token required) '/order/:id/products' [post]
- Current Order by user [args: user id](token required) '/user/:id/orders' [GET]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

- example of product: {
  "name": "product1",
  "price": "10",
  "category": "category1"
  }

#### User

- id
- firstName
- lastName
- password

- example of user: {
  "firstName": "haitham",
  "lastName": "magdy",
  "password": "password123"
  }

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

- example of order: {
  "product": "1, 2, 3",
  "status": "active",
  "product_quantity": "3"
  }

#### SCHEMA

Public Schema

#### DATABASE PORT

Default port: 5432
