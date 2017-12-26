import { Manager } from "./Manager";
import { Skill } from "./Skill";

export class Applicant
{
constructor(email : string , title : string , experience :number,name : string , phone : string) 
{
        this.Experience = experience;
        this.Title = title;     
        this.Name = name;
        this.Active = true;
        this.Email = email;
        this.LockedBy = "";
        this.Phone = phone;
        this.Skills = [];
        this.Recruiters = [];
        this.Url ="";
        this.MatchPrecentage = 0;      
}

    Id :number;
    Name:string;
    Experience : number;
    Email:string;
    Phone : string;
    Url : string;
    Active:boolean;
    LockedBy:string;
    Date : Date;
    Title : string;
    Skills : Skill [];
    Recruiters : Manager [];  
    MatchPrecentage : number;
    Position : string;
}