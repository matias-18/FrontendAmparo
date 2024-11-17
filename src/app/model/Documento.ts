import { Peticion } from "./Peticion"
export interface Documento{
    id?:number,
    titulo:string,
    descripcion:string,
    tipo:string,
    peticion:Peticion
}