import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../model/alumno';
import { Observable } from 'rxjs';
import { ComunesService } from './comunes.service';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends ComunesService<Alumno> {


   constructor(http: HttpClient) {
    super(http);
    this.baseEndpoint = 'http://localhost:8090/api/alumno';
  }




}


