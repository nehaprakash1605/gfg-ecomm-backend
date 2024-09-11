import User from "./../models/user.model.js"



let createUser = async (req, res) => {
    let data = req.body
    let userData = new User(data)
    let savedData = await userData.save()

    res.send(savedData)
}

let updateUser = async (req, res) => {
    let { email } = req.body;
    let updatedData = await User.findOneAndUpdate({ email: email }, req.body, { new: true })
    res.send(updatedData)
}

let replaceUser = async (req, res) => {
    let { email } = req.body
    let replacedData = await User.findOneAndReplace({ email: email }, req.body, { new: true })
    res.send(replacedData)
}

let deleteUser = async (req, res) => {

    let { email } = req.body
    let deletedUser = await User.findOneAndDelete({ email: email })
    res.send(deletedUser)
}

let getSingleUser = async (req, res) => {
    let { email } = req.body
    let user = await User.findOne({ email: email })
    res.send(user)
}

let getAllUsers = async (req, res) => {
    let allUsers = await User.find()
    res.send(allUsers)
}

// let signUp = async (req,res) =>{
//     let {email,password,userName,phoneNumber} = req.body
//     let user = await User.findOne({email:email})
//     if(user)
//         res.send({result: false, message:"User already exists"})
//     let salt = bcrypt.genSaltSync(10)
//     let encPwd = bcrypt.hashSync(password,salt)
//     let userData = new User(
//         {
//             email: email,
//             password: encPwd,
//             userName: userName,
//             phoneNumber: phoneNumber
//         }
//     )
//     let savedData = await userData.save();
//     res.send(savedData)
// }

let signUp = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (user) return res.status(403).send({ result: false, message: "User already exists", data: user })
        let newUser = new User(req.body)
        let userData = await newUser.save();
        let token = await userData.createToken();
        return res.status(200).cookie("Token",token).send({ result: true, message: "User Created", data: userData })
    } catch (err) {
        return res.status(500).send({ result: false, message: err.message })
    }

}

let login = async(req,res)=>{
    let {email,password} = req.body
    let userData = await User.findOne({email:email})
    if(!userData) return res.status(404).send({result:false, message:"User Not Found"})
    let isValidUser = await userData.comparePassword(password)
    if(!isValidUser) return res.status(500).send({result:false, message:"Credentials Invalid"})
    let token = await userData.createToken()
    return res.status(200).cookie("Token",token).send({result:true, message:"Login Successful"})

}


export { createUser, updateUser, replaceUser, deleteUser, getSingleUser, getAllUsers, signUp, login }