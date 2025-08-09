import jwt from 'jsonwebtoken';

// Middleware to authenticate user
export const authUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in authUser middleware:", error);
        return res.status(401).json({ message: 'Invalid token', success: false });
    }
}