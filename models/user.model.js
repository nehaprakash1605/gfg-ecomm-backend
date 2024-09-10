import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const addressSchema = new Schema({
    houseNumber: {type:String},
    street: {type:String},
    city: {type:String},
    state: {type:String}
})

const userSchema = new Schema(
    {
        userName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, min: [6,"Password length is too short"]},
        phoneNumber: {type: Number, min:[10,"Phone Number length too short"]},
        address:{type:[addressSchema], default:[]}
    }
)


userSchema.pre('save', async function(next){
    let user = this;

    if(!user.isModified("password")){
        return next();
    }
    try{
       let salt =  await bcrypt.genSalt(10)
       let hashedPwd = await bcrypt.hash(this.password,salt)
       user.password = hashedPwd
       next();
    }catch(err){
        console.log("Bcrypt Error: ",err)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.createToken = async function(){
    return jwt.sign({id:this._id,email:this.email},process.env.PRIVATE_KEY)
}

let User = model('User', userSchema)

export default User;