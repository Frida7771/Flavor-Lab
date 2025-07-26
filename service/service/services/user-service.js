import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
/**
 * create a user
 * @param {*} userName 
 * @param {*} FName 
 * @param {*} LName 
 * @param {*} password 
 * @param {*} role 
 * @param {*} picture 
 * @returns 
 */
export const create = async(userName, FName, LName, password, role, picture) =>{
    const hash = await bcrypt.hash(password, saltRounds); // hash and slat the password
    const user = new userModel({
        userName: userName,
        firstName:FName,
        lastName:LName,
        password:hash,
        role: role,
        picture: picture
    });
    return await user.save();
}
/**
 * check whether a user in the database contains input username and password
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
export const checkUser = async(username, password) => {
    const user = await userModel.findOne({userName: username});
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        throw new Error("Username / Password is wrong");
    }else{
        return user;
    }
}
/**
 * get a user based on id
 * @param {*} userId 
 * @returns 
 */
export const get = async(userId) =>{
    const user = await userModel.findById(userId).select({ userName: 1, firstName: 1, lastName:1, picture:1 });
    if (!user) {
        throw new Error("user not found");
    }
    return user;
}
/**
 * delete a user based on id
 * @param {*} userId 
 */
export const deleteU = async(userId) =>{
    await userModel.findByIdAndDelete(userId);
}
/**
 * update a user based on id
 * @param {*} userId 
 * @param {*} FName 
 * @param {*} LName 
 * @param {*} picture 
 * @returns 
 */
export const update = async(userId, FName, LName, picture) =>{
    if(FName == null){
        FName = user.firstName;
    }
    if(LName == null){
        LName = user.lastName;
    }
    if(picture == null){
        picture = user.picture;
    }
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId }, // filter
        { $set: 
            { 
                firstName: FName,
                lastName: LName,
                picture: picture

            } }, // update
        { new: true } // options
      );
    //   console.log( updatedUser)
      return updatedUser;
}