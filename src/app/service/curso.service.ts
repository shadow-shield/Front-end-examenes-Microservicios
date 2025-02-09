import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Curso } from '../model/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseEndpoint } from '../config/app';
import { Alumno } from '../model/alumno';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends ComunesService<Curso> {

  constructor(http: HttpClient) {
    super(http);
    this.baseEndpoint = baseEndpoint + '/curso';
  }

  public asignarAlumnosAlCurso(curso: Curso, alumnos: Alumno[]): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseEndpoint}/${curso.id}/asignaralumnos`,
      alumnos,
      { headers: this.cabeceras }
    );
  }

  public elminarAlumno(curso: Curso, alumnos: Alumno){
    return this.http.put<Curso>(`${this.baseEndpoint}/${curso.id}/eliminaralumnos`,
      alumnos,
      { headers: this.cabeceras }
    );

  }



}
