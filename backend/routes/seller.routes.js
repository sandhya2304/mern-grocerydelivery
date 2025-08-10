import express from 'express';
import { isauthSeller, sellerLogin, sellerLogout } from '../controllers/seller.controller.js';
import { authSeller } from '../middlewares/authSeller.js';


const router = express.Router();

router.post("/login",sellerLogin);
router.get("/is-auth",authSeller,isauthSeller);
router.get("/logout",authSeller ,sellerLogout);

export default router;