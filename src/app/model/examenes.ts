import { Asignatura } from "./asignatura";
import { Generic } from "./generic";
import { Pregunta } from "./pregunta";

export class Examenes implements Generic {
  id: number;
  nombre: string;
  createAt: string;
  preguntas: Pregunta[] = [];
  asignatura: Asignatura;
  respondido: boolean;
}
