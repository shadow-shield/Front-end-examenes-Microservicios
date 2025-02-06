import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Curso } from '../model/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends ComunesService<Curso> {

  constructor( http: HttpClient) {
    super(http);
    this.baseEndpoint = 'http://localhost:8090/api/curso';
  }



}
