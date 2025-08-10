import express  from 'express';
import { updateCart } from '../controllers/cart.controller.js';
import  {authSeller} from '../middlewares/authSeller.js';
import { authUser } from '../middlewares/authUser.js';




const cartRoutes = express.Router();

cartRoutes.post("/update",authUser,updateCart);


 export default cartRoutes;


