import Order from '../models/order.model.js';
import Product from '../models/product.model.js';


// Place Order with Cash on Delivery
// This function handles the order placement for 
// cash on delivery
export const  placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user;
        const { items, address } = req.body;
         
        if(!items || !address){
            return res.status(400)
            .json({ message: "Items and address are required", success: false });
        }

        let amount = await items.reduce(async(acc,item) =>{
            const product = await Product
                 .findById(item.product);
            return (await acc) + (product.price * item.quantity);
        }, 0);

        //add tax charges 2%
        amount += Math.floor(amount * 0.02)/100;
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Cash on Delivery",
            status: "Order Placed",
            isPaid: false
        });
        res.status(201)
        .json({ message: "Order placed successfully", 
             success: true 
            });

    } catch (error) {
        res.status(500)
        .json({ message: error.message, success: false });
    }
}

// Place Order with Online Payment
// This function handles the order placement for online payment
export const placeOrderOnline = async (req, res) => {
    try {
        const userId = req.user;
        const { items, address, paymentType } = req.body;

        if(!items || !address || !paymentType){
            return res.status(400)
            .json({ message: "Items, address and payment type are required", success: false });
        }

        let amount = await items.reduce(async(acc,item) =>{
            const product = await Product
                 .findById(item.product);
            return (await acc) + (product.price * item.quantity);
        }, 0);

        //add tax charges 2%
        amount += Math.floor(amount * 0.02)/100;

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType,
            status: "Order Placed",
            isPaid: true
        });

        res.status(201)
        .json({ message: "Order placed successfully", 
             success: true 
            });

    } catch (error) {
        res.status(500)
        .json({ message: error.message, success: false });
    }
}

// Get User Orders
// This function retrieves all orders placed by a user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user;
        const orders = await Order.find({ 
            userId, 
            $or: [{ paymentMethod: "COD" },
                   { isPaid: true }]
            })
            .populate('items.product address')
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404)
                .json({ message: "No orders found", success: false });
        }

        res.status(200)
            .json({ message: "Orders retrieved successfully", 
                 orders, success: true 
                });

    } catch (error) {
        res.status(500)
            .json({ message: error.message, success: false });
    }
}

// Get All Orders
// This function retrieves all orders in the system
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentMethod: "Cash on Delivery" },
                   { isPaid: true }]
        })
            .populate('items.product address')
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404)
                .json({ message: "No orders found", success: false });
        }

        res.status(200)
            .json({ message: "Orders retrieved successfully", 
                 orders, success: true 
                });

    } catch (error) {
        res.status(500)
            .json({ message: error.message, success: false });
    }
}

// Update Order Status
// This function updates the status of an order
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400)
                .json({ message: "Order ID and status are required", success: false });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404)
                .json({ message: "Order not found", success: false });
        }

        res.status(200)
            .json({ message: "Order status updated successfully", 
                 order: updatedOrder, success: true 
                });

    } catch (error) {
        res.status(500)
            .json({ message: error.message, success: false });
    }
}

// Delete Order
// This function deletes an order by its ID
export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400)
                .json({ message: "Order ID is required", success: false });
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404)
                .json({ message: "Order not found", success: false });
        }

        res.status(200)
            .json({ message: "Order deleted successfully", 
                 success: true 
                });

    } catch (error) {
        res.status(500)
            .json({ message: error.message, success: false });
    }
}