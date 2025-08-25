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

// Product routes
app.use("/api/products", productRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname , "/frontend/dist")))

    app.get("*" , (req,res) =>{
        res.sendFile(path.resolve(__dirname , "frontend" , "dist" , "index.html"))
    })
}

app.listen(PORT, () => {
    connectDb()
    console.log('Server started at http://localhost:'+ PORT)
})
