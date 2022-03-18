import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import { checkauth } from '../middleware/auth';
const product = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const productIndexing = await product.index();
    res.json(productIndexing);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};
const showProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productIndexing = await product.show(id);
    res.json(productIndexing);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const productItem: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const productCreate = await product.create(productItem);
    res.json(productCreate);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/product', index);
  app.get('/product/:id', showProduct);
  app.post('/product/create-product', checkauth, createProduct);
};

export default productsRoutes;
