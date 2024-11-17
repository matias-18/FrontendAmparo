import { Especialidad } from "./Especialidad";

export interface Certificado{
    id?:number,
    titulo:String,
    descripcion:String,
    especialidad:Especialidad 
}