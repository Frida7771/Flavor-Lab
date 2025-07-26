import { CredentialResponse } from '@react-oauth/google';
import Cookies from 'js-cookie';
/**
 * Get user by user id
 * @param userId 
 * @param port 
 * @returns 
 */
export const getUserById = async (userId: string, port: number) =>{
    const apiUrl = `http://localhost:${port}/user/${userId}`;
    const response = await fetch(apiUrl,{
        method:"GET"
    })
    if (!response.ok) {
        throw new Error(`Error fetching user: ${response.status}`);
      }
    const user = response.json();
    return user;
}
// Get user id from the cookie
export function getUserIdFromCookie(){
    var cookie = getCookie( "isUser" );
    if(cookie === undefined){
        return;
    }
    const base64Url = cookie.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));    
    return JSON.parse(jsonPayload)["userId"];
}
/**
 * get username from cookie
 * @returns 
 */
export function getUserNameFromCookie(){
    var cookie = getCookie( "isUser" );
    if(cookie === undefined){
        return;
    }
    const base64Url = cookie.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));    
    return JSON.parse(jsonPayload)["username"];
}
/**
 * extract the cookie based on cookie name
 * @param cname 
 * @returns 
 */
export function getCookie( cname: string ) {
    let cookie = Cookies.get(cname);
    if(cookie === undefined){
        return undefined;
    }
    return cookie;
}
/**
 * Check whether the user exists in database
 * @param userName 
 * @param password 
 * @param port 
 * @returns 
 */
export async function checkUser(userName:string,password: string, port: number){
    const apiUrl = `http://localhost:${port}/login`;
    const response = await fetch(apiUrl,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({
            userName:userName,
            password:password
        }),
        credentials: 'include'
    })
    if (!response.ok) {
        throw Error("signin failed");
    }
    const user = await response.json();
    return user;
}
/**
 * Sign up a user
 * @param fn 
 * @param ln 
 * @param r 
 * @param pic 
 * @param userName 
 * @param pw 
 * @param port 
 * @returns 
 */
export const signUp = async(fn: string, ln: string, r: string, pic: string, userName:string,pw: string, port: number)=>{
    const apiUrl = `http://localhost:${port}/user`;
    const response = await fetch(apiUrl,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({
            userName:userName,
            firstName:fn, 
            lastName: ln, 
            password:pw, 
            role: r, 
            picture: pic
        }),
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error(`Error creating user: ${response.status}`);
      }
    const user = await response.json();
    return user;
}
/**
 * sign out by remove cookie
 */
export const signOut = () => {
    Cookies.remove('isUser');
}
/**
 * Check whether cookie exists
 * @returns 
 */
export const isSignIn = ()=>{
    const cname = "isUser";
    const c = getCookie(cname);
    return !(c === undefined)
}
/**
 * Save user's updated data
 * @param fn 
 * @param ln 
 * @param pic 
 * @param userName 
 * @param pw 
 * @param port 
 * @returns 
 */
export const saveUpdate = async (fn: string, ln: string, pic: string, userName:string,pw: string, port: number) => {
    const userId = getUserIdFromCookie();
    const apiUrl = `http://localhost:${port}/user/${userId}`;
    const response = await fetch(apiUrl,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
          },
        body:JSON.stringify({
            userName:userName,
            firstName:fn, 
            lastName: ln, 
            password:pw, 
            picture: pic
        }),
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error(`Error creating user: ${response.status}`);
      }
    const user = await response.json();
    console.log(user);
    return user;
}
/**
 * Handle google log in
 * @param credentialResponse 
 * @param port 
 * @returns 
 */
export const handleGoogle = async (credentialResponse : CredentialResponse, port: number) => {
    const apiUrl = `http://localhost:${port}`;
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: credentialResponse.credential
        }),
        credentials: 'include'
    })

    const data = await res.json();
    console.log('Backend Response:', data);
    return data;
  };