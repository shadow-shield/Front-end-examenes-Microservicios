import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Examenes } from '../model/examenes';
import { HttpClient } from '@angular/common/http';
import { baseEndpoint } from '../config/app';
import { Observable } from 'rxjs';
import { Asignatura } from '../model/asignatura';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService extends ComunesService<Examenes> {


  constructor( http: HttpClient) {
    super(http);
    this.baseEndpoint=baseEndpoint+'/examen';

  }

  //observable con observable finddallasignatura
  public findAllAsignatura(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.baseEndpoint}/asignaturas`);

  }




}
