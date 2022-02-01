import { Note} from './Note';
export class User{
    name: string;
    mail: string;
    password: string;
    legajo: string;
    career: string;
    notes: [Note];

    constructor(name:string, mail:string, password:string, legajo:string, career: string, notes:[Note]){
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.legajo = legajo;
        this.career = career;
        this.notes = notes;
    }
}