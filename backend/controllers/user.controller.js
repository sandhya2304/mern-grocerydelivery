import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//register user : /api/user/register
//POST
export const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password)
        {
            return res.status(400).json(
                { message: 'All fields are required',
                    success :false }
            );
        }
       const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
              .status(400)
              .json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
       
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: 'User registered successfully',
            success: true,
            user: {
               
                name: user.name,
                email: user.email,
            }
        })

    }catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

//login user : /api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400)
              .json({ message: 'Invalid credentials', success: false });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({
            message: 'User logged in successfully',
            success: true,
            user: {
                name: user.name,
                email: user.email,
            }
        });

    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

//logout user : /api/user/logout
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
        });
        res.json({ message: 'User logged out successfully', success: true });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        res.status(500).json({ message: 'Server error' });
    }
}

//checkauthenticated user : /api/user/auth
export const isAuthUser = async (req, res) => {
    try {
          
         const userId = req.user;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized', success: false });
        }
        // Fetch user details without password
        const user = await User.findById(userId).select('-password');

        res.json({
            message: 'User is authenticated',
            success: true,
            user
        });

    } catch (error) {
        console.error("Error in checkAuthenticatedUser:", error);
        res.status(500).json({ message: 'Server error' });
    }
}
