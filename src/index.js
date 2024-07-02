import dotenv from "dotenv"


import mongoose from "mongoose";
import {DB_NAME} from './constants.js'
import express from "express"

dotenv.config({
    path:'./env'
})

const app=express();
;(async ()=>{
    try {
        const dbres=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // console.log(dbres);

        app.on("error",(error)=>{
            console.log("EXPress error::",error)
            // throw error
        })

        app.listen(process.env.PORT||3000,()=>{
            console.log(`app is listening at ${process.env.PORT||3000}`)
        })
        
    } catch (error) {
        console.log("ERROR on db connection::",error)
        process.exit(1);
    }
})()