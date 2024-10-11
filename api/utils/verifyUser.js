import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token;  // Use optional chaining in case cookies are undefined
    if (!token) {
        return next(errorHandler(401, 'Access token not found, unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Invalid or expired token, unauthorized')); // Changed status to 403 for token verification errors
        }
        req.user = user; // Attach the decoded user object to the request
        next();
    });
};
