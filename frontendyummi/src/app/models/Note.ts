import {Subject} from './Subject';
import { User } from './User';
import {Comment} from './Comment';

export class Note{
    name: string;
    career: string;
    creator: string;
    subject: Subject;
    content: string;
    calification: number;
    attached: string;
    category: string;
    comments: Array<Comment>;

    constructor(name:string, career:string, creator:string, subject: Subject, content:string, calification:number, attached:string, category: string, comments: Comment[]){
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