import express from 'express';
import  {authSeller} from '../middlewares/authSeller.js';
import { upload } from '../config/multer.js';

import { getAllProducts, getProductById,
     createProduct, updateProduct, deleteProduct }
      from '../controllers/product.controller.js';



const productRoutes = express.Router();

productRoutes.post("/add-product", upload.array('images'),
   authSeller,
   createProduct);
productRoutes.get("/getall", getAllProducts);
productRoutes.get("/get/:id", getProductById);
productRoutes.delete("/delete/:id", authSeller, deleteProduct);
productRoutes.put("/update/:id", upload.array('images'),
    authSeller, updateProduct);
productRoutes.post("/stock/", authSeller, updateProduct);


export default productRoutes;