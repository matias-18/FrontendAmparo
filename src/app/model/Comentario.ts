import { Users } from "./Users";

export interface Comentario{
    id?:number,
    description:string,
    fecha:Date,
    anonimo:boolean,
    usuario:Users
}