import { Request, Response, NextFunction } from 'express';

const expectedToken = 'YOUR_EXPECTED_TOKEN_HERE'; 

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const receivedToken = authorizationHeader.substring(7);
    if (receivedToken && receivedToken === expectedToken) {
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

