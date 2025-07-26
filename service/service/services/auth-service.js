import jwt from "jsonwebtoken";

const SECRET_KEY = "uD8uRFqJgiuAeaj40XtBwZzdu3ihaLJk9Y5bNUfRLjY=";

/** 
 * Generate JWT Token 
 */
export function generateJWT( username, userId ) {
    return jwt.sign( {
            username: username,
            userId: userId
        }, SECRET_KEY , { expiresIn: 60 * 60 * 48 } );
}

/**
 * Verify JWT Token
 */
export function verifyJWT(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}

