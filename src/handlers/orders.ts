import express, { Request, Response } from 'express';
import { checkauth } from '../middleware/auth';
import { Order, OrderProduct, OrderStore } from '../models/order';

const order = new OrderStore();

// Current Order by user
const index = async (_req: Request, res: Response) => {
  const ordersIndexing = await order.index();
  res.json(ordersIndexing);
};

const showOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const showOrder = await order.showActiveUserOrder(id);
  res.json(showOrder);
};

const createOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id) {
    const orderItem: Order = {
      user_id: +id,
      product_id: req.body.product,
      status: req.body.status,
      product_quantity: req.body.product_quantity
    };
    const orderCreate = await order.createOrder(orderItem);
    res.json(orderCreate);
  } else {
    res.send('no user id');
  }
};

const addOrderProducts = async (_req: Request, res: Response) => {
  const orderId: number = +_req.params.id;
  const { product_id } = _req.body;
  const quantity: number = +_req.body.quantity;
  const orderProduct: OrderProduct = {
    quantity,
    order_id: orderId,
    product_id
  };
  try {
    const addOrderProduct = await order.addOrderProduct(orderProduct);
    res.json(addOrderProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/order', checkauth, index);
  app.get('/user/:id/orders', checkauth, showOrders);
  app.post('/order/:id/products', checkauth, addOrderProducts);
  app.post('/user/:id/create-order', checkauth, createOrder);
};

export default orderRoutes;
