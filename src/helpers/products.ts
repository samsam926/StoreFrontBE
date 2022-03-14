import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { checkauth } from '../middleware/auth';
const product = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const productIndexing = await product.index();
  res.json(productIndexing);
};
const showProduct = async (_req: Request, res: Response) => {
  const productIndexing = await product.index();
  res.json(productIndexing);
};

const createProduct = async (_req: Request, res: Response) => {
  const productCreate = await product.create();
  res.json(productCreate);
};

const productsRoutes = (app: express.Application) => {
  app.get('/product', index);
  app.get('/product/:id', showProduct);
  app.post('/product/create-product', checkauth, createProduct);
};

export default productsRoutes;
