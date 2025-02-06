import { Alumno } from "./alumno";
import { Asignatura } from "./asignatura";
import { Pregunta } from "./pregunta";

export class Respuesta {
    id: number;
    texto: string;
    alumno:Alumno;
    pregunta:Pregunta;
}
