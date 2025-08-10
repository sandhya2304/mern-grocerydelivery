import User from '../models/user.model.js';



export const updateCart = async (req, res) => {
  try 
  {
    const userId = req.user;
    const { cartItems } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {cartData: cartItems},
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200)
      .json({ message: "Cart updated successfully", 
           user: updatedUser, success: true });

   
} catch (error) {
    res.status(500).json({ message: error.message, 
        success: false });
  }
}