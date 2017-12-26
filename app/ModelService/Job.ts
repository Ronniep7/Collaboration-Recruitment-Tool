import { Manager } from "./Manager";
import { Skill } from "./Skill";

export class Job
{
    constructor(
        title: string, description: string ,
         position : string) {
        this.Experience = 0;
        this.Title = title;     
        this.Position = "Programmer";
        this.Description = description;     
        this.Published = true;
        this.Skills = [];
        this.Recruiters = [];
    }
    Id :number;
    Experience : number;
    Title:string;
    Position : string;
    Description:string;
    Published:boolean;
    Skills : Skill [];
    Recruiters : Manager [];
}