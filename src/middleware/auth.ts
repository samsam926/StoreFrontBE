import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export const checkauth = async (
  req: Request,
  res: Response,
  next: Function
): Promise<void | boolean> => {
  const token = req.headers.authorization as string;
  const secret = process.env.JSONSECRETKEY as string;
  const verify = jwt.verify(token, secret);
  if (!verify) {
    throw new Error('Unauthorized');
  } else {
    next();
  }
};

// Convert Image Middleware
// const convertImagesReq = async (
//   req: express.Request,
//   res: express.Response,
//   next: Function
// ): Promise<void | boolean> => {
//   const { width, height, imagename } = req.query as unknown as ImagesRequest;
//   let { ext } = req.query as unknown as ImagesRequest;

//   if (width && height && imagename && !(isNaN(width) || isNaN(height))) {
//     ext = ext ? ext : 'jpg';
//     await convertImage(+width, +height, imagename, ext);
//     next();
//   } else if (isNaN(width) || isNaN(height)) {
//     res.send(`${isNaN(width) ? 'width' : 'height'} is not a valid number`);
//   } else {
//     return next();
//   }
// };
