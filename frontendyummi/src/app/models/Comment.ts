export class Comment {
    creator: string;
    content: string;
    date: string;

    constructor(creator:string, content: string, date:string){
        this.creator = creator;
        this.content = content;
        this.date = date;
    }
}