export class Review
    {
        Id :  number ;
        ApplicantId : number;
        ManagerId : number;
        Status :  string;
        Content : string;
        InterviewDate : Date;

        constructor() {
            this.InterviewDate = new Date();               
        }
    }