import { Component } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { ComunesFormComponent } from '../../alumnos-form-comunes.component';
import { AlumnoService } from '../../../service/alumno.service';
import { Alumno } from '../../../model/alumno';


@Component({
  selector: 'app-alumnos-form',
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.css'
})
export class AlumnosFormComponent extends ComunesFormComponent<Alumno, AlumnoService> {

  private fotoSeleccionada: File;

  constructor(servicioAlumno: AlumnoService, router: Router, routes: ActivatedRoute) {
    super(servicioAlumno, router, routes);
    this.redirect = '/alumnos';
    this.model = new Alumno();
    this.nombreModel = Alumno.name;
    this.titulo = 'Crear Alumno';
  }

  cargarFoto(event): void {
    this.fotoSeleccionada = event.target.files[0];
    console.info(this.fotoSeleccionada);

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error al seleccionar la imagen:', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null
    }
  }

  override crear(): void {
    if (!this.fotoSeleccionada) {
      super.crear();
    } else {
      this.service.crearconFoto(this.model, this.fotoSeleccionada)
        .subscribe(model => {
          console.log(model);
          Swal.fire('Creado:', `${this.nombreModel} ${model.nombre.toUpperCase()} creado con éxito`, 'success');
          this.router.navigate([this.redirect]);
        }, err => {
          if (err.status === 400) {
            this.errores = err.error;
            console.log(this.errores);
          }
        });
    }
  }

  override editar(): void {
    if (!this.fotoSeleccionada) {
      super.editar();
    } else {
      this.service.editarConFoto(this.model, this.fotoSeleccionada)
        .subscribe(model => {
          console.log(model);
          Swal.fire('Actualizado:', `${this.nombreModel} ${model.nombre.toUpperCase()} actualizado con éxito`, 'success');
          this.router.navigate([this.redirect]);
        }, err => {
          if (err.status === 400) {
            this.errores = err.error;
            console.log(this.errores);
          }
        });
    }
  }



}
