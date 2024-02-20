import mongoose, { mongo } from "mongoose";

let isConnected=false
export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);

    if (isConnected){
        console.log('MONGODB is connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        isConnected=trueconsole.log('mongoDB connected')
    }catch (error){
        console.log(error)
    }
}