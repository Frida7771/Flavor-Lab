export interface User{
    id:string;
    userName: string;
    firstName?:string;
    lastName?:string;
    password:string;
    role:string;
    picture?:string;
}