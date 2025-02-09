import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Curso } from '../model/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseEndpoint } from '../config/app';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends ComunesService<Curso> {

  constructor( http: HttpClient) {
    super(http);
    this.baseEndpoint=baseEndpoint+'/curso';
  }

 /*  public listarPorNombre(nombre: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseEndpoint}/filtrar/${nombre}`);
  }

  public listarPorAlumno(id: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseEndpoint}/alumno/${id}`);
  }

  public asignarAlumnos(curso: Curso, alumnos: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseEndpoint}/asignar-alumnos/${curso.id}`, alumnos);
  }

  public eliminarAlumno(curso: Curso, id: number): Observable<any> {
    return this.http.put<any>(`${this.baseEndpoint}/eliminar-alumno/${curso.id}`, id);
  }
 */

}
