import { Component } from '@angular/core';
import { Curso } from '../../../model/curso';
import { CursoService } from '../../../service/curso.service';
import { ComunesFormComponent } from '../../alumnos-form-comunes.component';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-editar-curso',
  templateUrl: './formulario-editar-curso.component.html',
  styleUrl: './formulario-editar-curso.component.css'
})
export class FormularioEditarCursoComponent extends ComunesFormComponent<Curso, CursoService> {
  constructor(service: CursoService, router: Router, routes: ActivatedRoute) {
    super(service, router, routes);
    this.redirect = '/cursos';
    this.model = new Curso();
    this.nombreModel = Curso.name;
    this.titulo = 'Crear Curso';
  }

  override editar(): void {
    this.service.crear(this.model).subscribe(model => {
      console.log(model);
      Swal.fire('Editado:', `${this.nombreModel} ${model.nombre.toUpperCase()} editado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    });
  }

  override crear(): void {
    this.service.crear(this.model).subscribe(model => {
      console.log(model);
      Swal.fire('Creado:', `${this.nombreModel} ${model.nombre.toUpperCase()} creado con éxito`, 'success');
      this.router.navigate([this.redirect]);
    });
  }






}
