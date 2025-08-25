import mongoose from 'mongoose'
import Product from "../model/product.model.js"
export const getProducts =  async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.error("Error in fetch products:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error in create product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const productData = req.body

    console.log("Update request params:", id)
    console.log("Update request body:", req.body)
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
            new: true,
            runValidators: true
        })

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        console.error("Error in update product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteProduct =  async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" })
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" })
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" })
    } catch (error) {
        console.error("Error in delete product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}