import { NextFunction, Request, Response } from 'express';
import HttpException from './http-exception';

export function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  console.log('we are here')
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      status,
      message,
    })
  next();
}

