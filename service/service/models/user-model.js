import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        require: true,
        type: String
    },
    firstName:{type: String},
    lastName:{type: String},
    password:{
        require: true,
        type: String
    },
    role: {
        require: true,
        type: String
    },
    picture: {type: String}
});
const userModel = mongoose.model('user', userSchema);
export default userModel;