import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedToken = jwt.verify(token.toString(), 'BennAppetit');
      req['user'] = {
        userid: decodedToken['userid'],
        email: decodedToken['email'],
      };
      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
