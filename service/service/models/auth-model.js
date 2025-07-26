import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userName: {
        require: true,
        type: String
    },
    password:{
        require: true,
        type: String
    }
});
const authModel = mongoose.model('auth', authSchema);
export default authModel;