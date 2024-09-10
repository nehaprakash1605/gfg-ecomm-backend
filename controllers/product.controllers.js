import fs from "fs"

let fileData = fs.readFileSync("./data.json",'utf-8')
let productArray = JSON.parse(fileData).products

let getAllProductsData = (req,res) => {
    res.json(productArray)
}

let getSingleProduct = (req,res) => {
    let product = productArray.find((product)=> product.id == req.params.id)
    res.json(product)
}

let addNewProduct = (req,res) => {
    let product = req.body
    productArray.push(product)
    res.json(product)
}

let replaceProductData = (req,res) => {
    let productIdx = productArray.findIndex((product)=> product.id == req.params.id)
    let replacedProduct = {...req.body, id:req.params.id}
    productArray.splice(productIdx,1,replacedProduct)
    res.json(replacedProduct)
}

let updateProductData = (req,res) => {
    let product = productArray.find((obj) => obj.id == req.params.id)
    let updatedProduct = {...product, ...req.body}
    productArray.push(updatedProduct)
    res.json(updatedProduct)
}

export {getAllProductsData, getSingleProduct, addNewProduct, replaceProductData, updateProductData}