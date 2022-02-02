export class Comment {
    commentCreator: string;
    content: string;
    date: Date;

    constructor(commentCreator:string, content: string, date:Date){
        this.commentCreator = commentCreator;
        this.content = content;
        this.date = date;
    }
}