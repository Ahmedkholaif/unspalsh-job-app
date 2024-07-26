import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  
  const timeStart = Date.now();
  next();
  const timeEnd = Date.now();

  console.log(`${method} ${url} - ${timeEnd - timeStart}ms`);
}

export default requestLogger;