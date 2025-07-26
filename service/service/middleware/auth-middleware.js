import * as authService from "../services/auth-service.js";

/** 
 * Middleware to authenticate user
 */
export function authenticateUser(req, res, next) {
    const token = req.cookies?.isUser || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    try {
        const decoded = authService.verifyJWT(token);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
}
