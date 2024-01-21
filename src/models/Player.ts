import { Team } from "./Team";

export interface Player{
    ageEdit: any;
    nationalityEdit(nationalityEdit: any): unknown;
    lastNameEdit(lastNameEdit: any): unknown;
    firstNameEdit(firstNameEdit: any): unknown;
    idPlayer:number,
    firstName:String,
    lastName:String,
    nationality:String,
    position:String,
    state:String,
    age:number,
    number:number,
    numberOfGoals:number,
    team:Team
}