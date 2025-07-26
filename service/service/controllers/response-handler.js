/**
 * Send a success response
 */
export const successResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

/**
 * Send an error response
 */
export const errorResponse = (res, statusCode, errorMessage) => {
    res.status(statusCode).json({ error: errorMessage });
};
