import { Request, Response, NextFunction } from "express";

type AsyncFunction = (req: Request, res: Response) => Promise<Response | void>;

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<void>;

export const asyncHandler =
  (fn: AsyncFunction) => (req: Request, res: Response) => {
    Promise.resolve(fn(req, res)).catch((err: Error) => {
      console.log(err);
    });
  };
