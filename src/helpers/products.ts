import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { checkauth } from '../middleware/auth';
const product = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const productIndexing = await product.index();
  res.json(productIndexing);
};
const showProduct = async (req: Request, res: Response) => {
  const productIndexing = await product.show(req.body.id);
  res.json(productIndexing);
};

const createProduct = async (req: Request, res: Response) => {
  const productItem: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  const productCreate = await product.create(productItem);
  res.json(productCreate);
};

const productsRoutes = (app: express.Application) => {
  app.get('/product', index);
  app.get('/product/:id', showProduct);
  app.post('/product/create-product', checkauth, createProduct);
};

export default productsRoutes;
