import { Request } from 'express';
import { ObjectId } from 'mongoose';

declare global {
    namespace Express {
      interface Request {
        user: {
            _id: string,
            username: string,
            email: string,
            password: string
        }
      }
    }
  }