/* Replace with your SQL commands */
CREATE TABLE order_products (
    id serial PRIMARY KEY,
    order_id int REFERENCES orders(id),
    product_id int REFERENCES product(id),
    quantity int
);