import { Schema, model, models } from "mongoose";

const UserSchema=new Schema({
    email:{
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true,'Username os required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-z0-9._]+(?<![_.])$/,'Username invalid, it should contain 8-20 alphanumeric characters and be unique!']
    },
    image: {
        type: String,
    }
})

const User_promptopia=models.User_promptopia || model("User_promptopia",UserSchema)

export default User_promptopia