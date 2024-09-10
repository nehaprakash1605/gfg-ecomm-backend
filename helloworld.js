import http from 'http';
import fs from 'fs';

let jsonData = fs.readFileSync("./data.json", "utf-8")
let indexhtmlData = fs.readFileSync("./index.html", "utf-8")
let productArray = JSON.parse(jsonData).products

const server = http.createServer((req, res) => {

    if (req.url == "/") {
        res.setHeader("Content-Type", "text/html");
        res.end(indexhtmlData)
    } else if (req.url == "/api") {
        res.setHeader("Content-Type", "application/json");
        res.end(jsonData)
    } else if (req.url.startsWith("/api/product")) {
        let id = req.url.split("/")[3]
        let { title, price } = productArray.find((product) => product.id == id)
        res.setHeader("Content-Type", "text/html")
        let updatedhtml = indexhtmlData.replace("{title}", title).replace("{price}", price)
        res.end(updatedhtml)
    }


})

server.listen(8080)