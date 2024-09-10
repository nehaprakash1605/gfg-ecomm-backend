import jwt from "jsonwebtoken"
import User from "./../models/user.model.js"

let auth = async (req, res, next) => {

    let token = req.cookies?.token
    if (!token) return res.status(401).send({ result: false, message: "User not authorized to perform operation" })
    let { id } = jwt.verify(token, process.env.PROVATE_KEY)
    let user = User.findById(id)
    if (!user) return res.status(404).send({ result: false, message: "User not found" })
    req.user = user
    next();
}

export default auth