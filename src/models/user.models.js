import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            validate:{
                validator:function(v){
                    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)([-_@a-zA-Z0-9]+)$/.test(v);
                }
            },
            minlength: [8,`MINIMUM REQUIRED LENGTH IS 8 AND CURRENT LENGTH ID ${props.value}`], //may be iisue is props.value props=>${props.value}
            index:true,
            
        },
        email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,
            required:true,
        },
        coverImage:{
            type:String,
            required:true,
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video",
            }
        ],
        password:{
            type:String,
            required:[true,"PAssword is required"],
        },
        refreshToken:{
            type:String
        }
    },{timestamps:true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified()) return next()

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(pass){
    return await bcrypt.compare(pass,this.password)
}

userSchema.methods.genrateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.genrateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User= mongoose.model("User",userSchema);