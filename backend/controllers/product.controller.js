import Product from '../models/product.model.js';
import {v2 as cloudinary} from 'cloudinary';
import { upload } from '../config/multer.js';
import multer from 'multer';

// This function creates a new product
//post /api/product/create

export const createProduct = async (req, res) => {
  try {
    const { name, price, description,category,offerPrice } = req.body;
    const images = req.files;

    let imageUrl = await Promise.all(
        images.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'image',
            });
            return result.secure_url;
        })
        );

    const newProduct = new Product({
      name,
      price,
      description,
      offerPrice,
      category,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get products /api/product/getall
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).
       sort({ createdAt: -1 });
       res.status(200)
       .json({products,success :true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//get product by id /api/product/get/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }
    res.status(200).json({ message: "Product deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category, offerPrice } = req.body;
        const images = req.files;
    
        let imageUrl = await Promise.all(
            images.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                resource_type: 'image',
                });
                return result.secure_url;
            })
            );
    
        const product = await Product.findByIdAndUpdate(id, {
        name,
        price,
        description,
        category,
        offerPrice,
        image: imageUrl,
        }, { new: true });
    
        if (!product) {
        return res.status(404).json({ message: "Product not found", success: false });
        }
    
        await product.save();
        res.status(200).json({ message: "Product updated successfully", product, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
    }

//change stock /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        const product = await Product
             .findByIdAndUpdate(id, { inStock }, 
                { new: true });
        if (!product) {
            return res.status(404)
            .json({ message: "Product not found", success: false });
        }
        await product.save();
        res.status(200).json({ message: "Stock updated successfully", product, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
} 