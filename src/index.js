import dotenv from "dotenv/config"

// dotenv.config({
//     path:'./env'
// })

import mongoose from "mongoose";
import {DB_NAME} from './constants.js'
import { app } from "./app.js";
import { connectDB } from "./db/index.js";


connectDB()
.then(()=>{
    app.on("error",(err)=>console.log("EXpress error::",err));
    app.listen(process.env.PORT||8000,()=>console.log(`Server running at ${process.env.PORT||8000}`))
})
.catch((err)=>console.log("DB connection failed::",err))










// const app=express();
// ;(async ()=>{
//     try {
//         const dbres=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

//         // console.log(dbres);

//         app.on("error",(error)=>{
//             console.log("EXPress error::",error)
//             // throw error
//         })

//         app.listen(process.env.PORT||3000,()=>{
//             console.log(`app is listening at ${process.env.PORT||3000}`)
//         })
        
//     } catch (error) {
//         console.log("ERROR on db connection::",error)
//         process.exit(1);
//     }
// })()