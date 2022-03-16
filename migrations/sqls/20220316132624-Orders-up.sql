/* Replace with your SQL commands */
CREATE TABLE orders (
    id serial PRIMARY KEY,
    product_id int REFERENCES product(id),
    product_quantity int,
    user_id int REFERENCES users(id),
    status VARCHAR (100) NOT NULL
);

-- // - id
-- // - id of each order in the order
-- // - quantity of each order in the order
-- // - user_id
-- // - status of order (active or complete)
