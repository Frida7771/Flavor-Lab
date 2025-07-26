import { generateJWT } from "../services/auth-service.js";
import * as userService from "../services/user-service.js";

const COOKIE = "isUser"
/**
 * Create a user
 * @param {*} req 
 * @param {*} res 
 */
export const createUser = async(req, res)=>{
    let username   = req.body.userName;
    await userService.create(
        username,
        req.body.firstName,
        req.body.lastName,
        req.body.password,
        req.body.role,
        req.body.picture
    ).then((message) => {
        let token = generateJWT(username, message["id"]) // Generate a JWT token
        // create cookie for the token
        res.cookie( COOKIE, token,{
            httpOnly: false,  // Make sure the cookie is not HttpOnly
            secure: true,    // Optional: set to true if you're using HTTPS
            sameSite: 'None', // Optional: if you're using cross-origin requests
            path: '/'
        } );
        res.status(200).json({ "message": message });
    }).catch(err => {
        res.status(500).json({ "message": err });
    });
}
/**
 * Get a user based on id
 * @param {*} req 
 * @param {*} res 
 */
export const getUser = async(req, res)=>{
    await userService.get(
        req.params.id
    ).then((message) => {
        res.status(200).json({ "message": message });
    }).catch(err => {
        res.status(404).json({ "message": err });
    });
}
/**
 * Delete a user based on id
 * @param {*} req 
 * @param {*} res 
 */
export const deleteUser = async(req, res)=>{
    await userService.deleteU(
        req.params.id
    ).then((message) => {
        res.status(200).json({ "message": message });
    }).catch(err => {
        res.status(500).json({ "message": err });
    });
}
/**
 * update a user based on id
 * @param {*} req 
 * @param {*} res 
 */
export const updateUser = async(req, res)=>{
    await userService.update(
        req.params.id,
        req.body.firstName,
        req.body.lastName,
        req.body.picture
    ).then((message) => {
        res.status(200).json({ "message": message });
    }).catch(err => {
        res.status(500).json({ "message": err });
    });
}