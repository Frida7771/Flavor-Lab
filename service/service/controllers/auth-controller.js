import jwt from "jsonwebtoken";
import * as userService from "../services/user-service.js";
import { generateJWT } from "../services/auth-service.js";
import { OAuth2Client } from 'google-auth-library';

const COOKIE = "isUser"
const CLIENT_ID = '616961216166-qiirac4k0amtnjl71hp8otgqgohk1uak.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
/**
 * Check whether a user exists in database
 * @param {*} req 
 * @param {*} res 
 */
export const checkUser = async(req, res)=>{
    let username   = req.body.userName;
    await userService.checkUser(
        username,
        req.body.password
    ).then((message) => {
        let token = generateJWT(username, message["id"])
        res.cookie( COOKIE, token,{
            httpOnly: false,  // Make sure the cookie is not HttpOnly
            secure: true,    // Optional: set to true if you're using HTTPS
            sameSite: 'None', // Optional: if you're using cross-origin requests
            path: '/'
        } );
        res.status(200).json({ "message": message });
    }).catch(err => {
        res.status(422).json({ "message": "Username / Password is incorrect" });
    });
}
/**
 * Verify google sign in
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const googleLoginVerify = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "Token missing" });
    }
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      console.log('Google User Payload:', payload);
      res.status(200).json({ message: 'Login successful', user: payload });
    } catch (error) {
      console.error('Error verifying Google token:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  }