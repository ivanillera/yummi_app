export class Comment {
    creator: string;
    content: string;
    date: Date;

    constructor(creator:string, content: string, date:Date){
        this.creator = creator;
        this.content = content;
        this.date = date;
    }
}