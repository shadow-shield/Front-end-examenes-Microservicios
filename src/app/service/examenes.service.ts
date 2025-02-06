import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';
import { Examenes } from '../model/examenes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService extends ComunesService<Examenes> {

  constructor( http: HttpClient) {
    super(http);
    this.baseEndpoint = 'http://localhost:8090/api/examen';
  }



}
