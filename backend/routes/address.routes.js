import express from "express";
import { addAddress, getAddress } from
    "../controllers/address.controller.js";
import { authUser } from "../middlewares/authUser.js";



const addressRoutes = express.Router();

addressRoutes.post("/add", authUser, addAddress);
addressRoutes.get("/get", authUser, getAddress);


export default addressRoutes;