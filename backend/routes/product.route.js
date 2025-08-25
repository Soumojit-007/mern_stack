import express from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js';
const router = express.Router();

// Create Product
router.post("/", createProduct)

// Get all Products
router.get("/", getProducts)

// Update Product (PATCH = partial update)
router.patch("/:id", updateProduct)

// Delete Product
router.delete("/:id", deleteProduct)
export default router;