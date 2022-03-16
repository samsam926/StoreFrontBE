import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export const checkauth = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void | boolean> => {
  const token = req.headers.token as string;
  const secret = process.env.JSONSECRETKEY as string;
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(401);
    res.json(`invalid token ${error}`);
    next();
  }
};
