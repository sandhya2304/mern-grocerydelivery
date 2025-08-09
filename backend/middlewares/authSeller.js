import jwt from 'jsonwebtoken';

// Middleware to authenticate user
export const authSeller = (req, res, next) => {
    const sellerToken = req.cookies.token;

    if (!sellerToken) {
        return res.status(401).json({ message: 'Unauthorized', success: false });
    }

    try {
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(decoded.email == process.env.SELLER_EMAIL) {
            next(); // Proceed to the next middleware or route handler
        }
        
    } catch (error) {
        console.error("Error in authUser middleware:", error);
        return res.status(401).json({ message: 'Invalid token', success: false });
    }
}