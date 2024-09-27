import { UUID } from "crypto"

export type parentUser = {
    CLUB_ID : UUID ,
    PLAYER_NAME : string , 
    PLAYER_CLUB : string, 
    JERSEY_NO : number , 
    GOALS : number
}

export type childUser = {
    CLUB_ID ?: UUID ,
    NATIONALITY : string ,
    POSITION : string ,
    NATIONAL_ID : UUID
}