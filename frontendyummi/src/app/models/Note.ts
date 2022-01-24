import {Comment} from './Comment';

export class Note{
    name: string;
    career: string;
    creator: string;
    subject: string;
    content: string;
    calification: number;
    attached: string;
    category: Array<String>;
    comments: Array<Comment>;

    constructor(name:string, career:string, creator:string, subject: string, content:string, calification:number, attached:string, category: String[], comments: Comment[]){
        this.name = name;
        this.career = career;
        this.creator = creator;
        this.subject = subject;
        this.content = content;
        this.calification = calification;
        this.attached = attached;
        this.category = category;
        this.comments = comments;
    }
}