import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({

    username : {
        type: String,
        required : true,
        unique: true,
        lowecase : true,
        trim : true,
        maxlength : 30,
        index: true
    },
    email:{
        type: String,
        required : true,
        unique: true,
        lowecase : true,
        trim : true,
        maxlength : 30
    },
    fullname:{
        type: String,
        required : true,
        trim : true,
        maxlength : 30,
        index:true
    },
    avataar : {
        type : String,
        required : true,
    },
    coverimage:{
        type:String
    },
    watchhistory:{
        type: Schema.Types.ObjectId,
        ref: "Video"
    },


    password:{
        type : String,
        required : [true,"Password is Required "]
    },
    refreshtoken:{
        type:String
    }


},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password ,12)
    next()
})

UserSchema.methods.checkpass = async function(password){
    return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this.id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        }
        ,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this.id,
    
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",UserSchema)
