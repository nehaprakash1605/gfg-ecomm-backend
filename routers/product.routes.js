import express from "express"
import {getAllProductsData, getSingleProduct, addNewProduct, replaceProductData, updateProductData} from "./../controllers/product.controllers.js"

let router = express.Router()

router.get("/", getAllProductsData)
.get("/:id", getSingleProduct)
.post("/new", addNewProduct)
.put("/:id", replaceProductData)
.patch("/:id", updateProductData)

export default router

