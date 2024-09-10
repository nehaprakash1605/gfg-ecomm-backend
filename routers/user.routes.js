import express from "express"
import {createUser, updateUser, replaceUser, deleteUser, getSingleUser, getAllUsers, signUp, login} from "./../controllers/users.controllers.js"

let router = express.Router()

router.post("/new", createUser)
.patch("/update", updateUser)
.put("/replace", replaceUser)
.delete("/delete",deleteUser)
.get("/single", getSingleUser)
.get("/", getAllUsers)
.post("/signup",signUp)
.post("/login",login)

export default router