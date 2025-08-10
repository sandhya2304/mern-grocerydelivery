import Address from '../models/address.model.js';


//add address /api/address/add
export const addAddress = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;

    const newAddress = new Address({
      user: userId, // associate the address with the user
      ...address // spread the address fields
    });

    const savedAddress = await newAddress.save();

    res.status(201).json({
      message: "Address added successfully",
      address: savedAddress,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

//getaddress /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.user;

    const addresses = await Address
             .find({ user: userId }); // find addresses associated with the user

    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found", success: false });
    }

    res.status(200).json({
      message: "Addresses retrieved successfully",
      addresses,
      success: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}