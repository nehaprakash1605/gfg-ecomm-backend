import express from "express";
import productRouter from "./routers/product.routes.js";
import userRouter from "./routers/user.routes.js"
import mongoose from "mongoose"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import cors from "cors"

let port = process.env.SERVER_PORT || 3000

async function conntectDB(){
    return await mongoose.connect(process.env.MONGO_DB_URI);
}

let server = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(cookieParser())
server.use(cors({
    origin:"https://gfg-ekart.netlify.app",
    credentials: true
}))
conntectDB().then(() => {
    console.log("DB connection successful");
    server.listen(port,()=>{
        console.log("Server is listening on Port", port)
    })
}).catch((err)=>{
    console.log(err)
})



server.use("/products",productRouter)

server.use("/users", userRouter)