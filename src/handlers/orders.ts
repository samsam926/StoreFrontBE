import express, { Request, Response } from 'express';
import { checkauth } from '../middleware/auth';
import { Order, OrderStore } from '../models/order';

const order = new OrderStore();

// Current Order by user
const index = async (_req: Request, res: Response) => {
  const ordersIndexing = await order.index();
  res.json(ordersIndexing);
};

const showOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const showOrder = await order.showUserOrder(id);
  res.json(showOrder);
};

const showActiveOrders = async (req: Request, res: Response) => {
  const showOrder = await order.showUserActiveOrders();
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

const orderRoutes = (app: express.Application) => {
  app.get('/order', checkauth, index);
  app.get('/user/:id/orders', checkauth, showOrders);
  app.get('/active-orders', checkauth, showActiveOrders);
  app.post('/user/:id/create-order', checkauth, createOrder);
};

export default orderRoutes;
