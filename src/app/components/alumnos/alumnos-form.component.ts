import { Component } from '@angular/core';
import { Alumno } from '../../model/alumno';
import { AlumnoService } from '../../service/alumno.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ComunesFormComponent } from '../alumnos-form-comunes.component';

@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.css'
})
export class AlumnosFormComponent extends ComunesFormComponent<Alumno, AlumnoService> {



  constructor( servicioAlumno: AlumnoService, router: Router,  routes: ActivatedRoute) {
    super(servicioAlumno, router, routes);
    this.redirect = '/alumnos';
    this.model = new Alumno();
    this.nombreModel = Alumno.name;
    this.titulo = 'Crear Alumno';
   }


}
