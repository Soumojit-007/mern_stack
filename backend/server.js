import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import productRoutes from './routes/product.route.js'
import path from 'path'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()

// Middleware
app.use(express.json())

// Product API routes
app.use("/api/products", productRoutes)

if(process.env.NODE_ENV === "production"){
    // Serve static files from React frontend
    app.use(express.static(path.join(__dirname, "frontend", "dist")))

    // Catch-all for React routing
    app.use((req, res, next) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

// Start server
app.listen(PORT, () => {
    connectDb()
    console.log(`Server started at http://localhost:${PORT}`)
})
