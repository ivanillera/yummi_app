export class Apunte{
    titulo: string;
    creador: string;
    fecha: string;
    materia: string;
    calificacion: number;

    constructor(titulo:string, creador:string, fecha:string, materia:string, calificacion:number){
    	this.titulo = titulo;
    	this.creador = creador;
    	this.fecha = fecha;
    	this.materia = materia;
    	this.calificacion = calificacion;
    }
}