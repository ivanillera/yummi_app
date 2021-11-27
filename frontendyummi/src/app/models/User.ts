export class User{
    name: string;
    mail: string;
    birth: string;
    notes: string;

    constructor(name:string, mail:string, birth:string, notes:string){
        this.name = name;
        this.mail = mail;
        this.birth = birth;
        this.notes = notes;
    }
}