import { Note} from './Note';
export class User{
    name: string;
    mail: string;
    password: string;
    legajo: string;
    notes: [Note];

    constructor(name:string, mail:string, password:string, legajo:string, notes:[Note]){
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.legajo = legajo;
        this.notes = notes;
    }
}