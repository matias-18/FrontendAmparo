import { Users } from "./Users"
import { Peticion } from "./Peticion"

export interface PeticionUsuario{
    id?:number,
    fecha:Date,
    users:Users,
    peticion:Peticion
}