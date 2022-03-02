export class Comment {
    commentCreator: string;
    content: string;
    date: string;

    constructor(commentCreator:string, content: string, date:string){
        this.commentCreator = commentCreator;
        this.content = content;
        this.date = date;
    }
}