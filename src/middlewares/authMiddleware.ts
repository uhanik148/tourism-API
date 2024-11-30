import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';

const secretKey = 'secret_key'; // Ganti dengan secret key yang lebih aman

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');

  try {
    const decoded = jwt.decode(token, secretKey);
    req.user = decoded; // Menyimpan payload ke request user
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

export function authorize(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
}
