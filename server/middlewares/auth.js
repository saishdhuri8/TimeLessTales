import { isTokenValid } from "../Utils/tokenThings.js"

export default function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'User is UNAUTHORIZED: No token provided' });
        }

        const token = authHeader.split(' ')[1];
       
        
        if (!token) {
            return res.status(401).json({ message: 'User is UNAUTHORIZED: Token missing' });
        }

        const valid = isTokenValid(token.toString());
        if (!valid) {
            return res.status(401).json({ message: 'User is UNAUTHORIZED: Invalid token' });
        }

        req.body.userId=valid.userId;
        next();
    } catch (error) {
    
        res.status(500).json({ message: 'Internal Server Error' });
    }
}