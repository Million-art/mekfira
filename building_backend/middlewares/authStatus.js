const jwt = require('jsonwebtoken');
require('dotenv').config();

 // Middleware to verify and attach user data to the request object
const authStatus = (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    // Log the incoming token for debugging (consider using a logger in production)
    console.debug('Received access token:', accessToken);

    // Check if the access token is provided
    if (!accessToken) {
        return res.status(401).json({
            isAuthenticated: false,
            message: 'Not authenticated'
        });
    }

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        console.log('Decoded token:', decoded);

        // Attach user data to the request object so that subsequent handlers can access it
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error for debugging
        console.error('Token verification error:', error.message);

        // Token verification failed or token is expired
        return res.status(401).json({
            isAuthenticated: false,
            message: 'Invalid or expired token'
        });
    }
}

module.exports = { authStatus };
