import { Users } from "./Users"

export interface Especialidad{
    id?:number,
    especialidad_nombre:string,
    numero_colegiatura:string,
    descripcion:string,
    usuario:Users
}