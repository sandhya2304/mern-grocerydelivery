import jwt from 'jsonwebtoken';




export const sellerLogin = async (req, res) => {
       try
       {

            const { email, password } = req.body;

            if(email== process.env.SELLER_EMAIL && password == process.env.SELLER_PASSWORD)
            {
                const token = jwt.sign( {email}, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '7d' }
                     
                );

                res.cookie('sellerToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });

                return res.status(200).json({
                    message: 'Seller logged in successfully',
                    success: true,
                });
            }

       }catch (error) {
        console.error("Error in sellerLogin:", error);
        res.status(500).json({ message: 'Server error' });
       }

}

export const sellerLogout = (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        });
        return res.status(200).json({ message: 'Seller logged out successfully', success: true });
    } catch (error) {
        console.error("Error in sellerLogout:", error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
}

//check if seller is authenticated
export const authSeller = (req, res, next) => {
    try
    {
        res.status(200).json({ message: 'Seller is authenticated', success: true });

    }catch (error) {
        console.error("Error in authSeller:", error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
} 