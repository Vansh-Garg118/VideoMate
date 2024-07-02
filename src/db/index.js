import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

 export const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("coonection done!!")
    } catch (error) {
        console.log("DB connection error::",error);
        process.exit(1);
    }
}