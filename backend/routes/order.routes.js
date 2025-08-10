import express from "express";
import { getAllOrders, getUserOrders, placeOrderCOD } 
  from "../controllers/order.controller.js";
import { authUser } from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";


const orderRoutes = express.Router();

orderRoutes.post("/cod", authUser, placeOrderCOD);
orderRoutes.get("/user",authUser,getUserOrders);
orderRoutes.get("/seller",authSeller,getAllOrders);


export default orderRoutes;