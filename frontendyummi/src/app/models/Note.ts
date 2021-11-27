export class Note{
    name: string;
    career: string;
    creator: string;
    subject: string;
    content: string;
    calification: number;
    attached: string;
    category: string;

    constructor(name:string, career:string, creator:string, subject:string, content:string, calification:number, attached:string, category: string){
        this.name = name;
        this.career = career;
        this.creator = creator;
        this.subject = subject;
        this.content = content;
        this.calification = calification;
        this.attached = attached;
        this.category = category;
    }
}