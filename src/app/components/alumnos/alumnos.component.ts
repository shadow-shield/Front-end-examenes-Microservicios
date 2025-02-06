import { Component, OnInit, ViewChild } from '@angular/core';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../model/alumno';


import { ComuneslistarComponent } from '../comunes-listar.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent extends ComuneslistarComponent<Alumno, AlumnoService> implements OnInit {

  constructor(service: AlumnoService) {
    super(service);
    this.titulo = 'Listado de Alumnos';
    this.nombreModel = Alumno.name;
  }











}
