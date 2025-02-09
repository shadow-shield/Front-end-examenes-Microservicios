import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../model/alumno';
import { Observable } from 'rxjs';
import { ComunesService } from './comunes.service';
import {baseEndpoint} from '../config/app';


@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends ComunesService<Alumno> {


   constructor(http: HttpClient) {
    super(http);
    this.baseEndpoint=baseEndpoint+'/alumno';

  }

  crearconFoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);


    return this.http.post<Alumno>(`${this.baseEndpoint}/crear/foto`, formData);
  }

  public editarConFoto(alumno: Alumno, archivo: File): Observable<Alumno> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('archivo', archivo);
    formData.append('nombre', alumno.nombre);
    formData.append('apellido', alumno.apellido);
    formData.append('email', alumno.email);

    return this.http.put<Alumno>(`${this.baseEndpoint}/updateFoto/${alumno.id}`, formData);
  }




}


