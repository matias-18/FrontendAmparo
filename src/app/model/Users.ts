import { Role } from "./Role";

export interface Users{
    id?:number,
    username:string,
    password:string,
    enabled:boolean,
    name:string,
    surnames:string,
    email:string,
    role: Role
}