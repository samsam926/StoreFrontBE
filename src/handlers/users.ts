import { Request, Response, Application } from 'express';
import jwt from 'jsonwebtoken';
import { checkauth } from '../middleware/auth';
import { User, UserInfo } from '../models/user';

// jwt.sign();
// jwt.verify();

const store = new UserInfo();

const index = async (_req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };

  try {
    if (!user.firstName || !user.password) {
      return res.send('no user info');
    }
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.JSONSECRETKEY as string
    );
    return res.json(token);
  } catch (error: any) {
    res.status(400);
    return res.json(error + user);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };
  try {
    const u = await store.authenticate(user.firstName, user.password);
    var token = jwt.sign({ user: u }, process.env.JSONSECRETKEY as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const update = async (req: Request, res: Response) => {
  const user: User = {
    id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };
  try {
    const updated = await store.create(user);
    res.json(updated);
  } catch (err: any) {
    res.status(400);
    res.json(err + user);
  }
};

const userRoutes = (app: Application) => {
  app.get('/user', checkauth, index);
  app.get('/user/:id', checkauth, show);
  app.post('/user/createUser', create);
  app.post('/user/updateUser', checkauth, update);
};

export default userRoutes;
