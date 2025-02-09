import { Alumno } from "./alumno";
import { Examenes } from "./examenes";
import { Generic } from "./generic";

export class Curso implements Generic {
  id: number;
  nombre: string;
  createAt: string;
  alumnos: Alumno[] = [];
  examenes: Examenes[] = [];

}
