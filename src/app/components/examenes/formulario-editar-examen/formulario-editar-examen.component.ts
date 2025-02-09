import { Component, OnInit } from '@angular/core';
import { ComunesFormComponent } from '../../alumnos-form-comunes.component';
import { Examenes } from '../../../model/examenes';
import { ExamenesService } from '../../../service/examenes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from '../../../model/asignatura';
import { Pregunta } from '../../../model/pregunta';

@Component({
  selector: 'app-formulario-editar-examen',
  templateUrl: './formulario-editar-examen.component.html',
  styleUrl: './formulario-editar-examen.component.css'
})
export class FormularioEditarExamenComponent extends ComunesFormComponent<Examenes, ExamenesService> implements OnInit {


  asignaturapadre: Asignatura[] = [];
  asignaturahijo: Asignatura[] = [];

  errorPregunta:string;


  constructor(service: ExamenesService, router: Router, routes: ActivatedRoute) {
    super(service, router, routes);
    this.titulo = 'Crear Examen';
    this.model = new Examenes();
    this.nombreModel = Examenes.name;
    this.redirect = '/examenes';

  }





  override ngOnInit() {
    this.routes.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m => {
          this.model = m,
            this.titulo = 'Editar ' + this.nombreModel;
          this.service.findAllAsignatura().subscribe(asignatura => this.asignaturahijo = asignatura.filter(a => a.padre));
        });
      }
    });
    this.service.findAllAsignatura()
      .subscribe(asignatura =>
        this.asignaturapadre = asignatura.filter(a => !a.padre));
  }

  public override  crear(): void {
    if (this.model.preguntas.length === 0) {
      Swal.fire('Error Preguntas', 'Examen debe tener preguntas', 'error')
      return;
    }
    this.eliminarPreguntasVacias();
    super.crear();

  }

  public override editar(): void {
    if (this.model.preguntas.length === 0) {
      Swal.fire('Error Preguntas', 'Examen debe tener preguntas', 'error')
      return;
    }
    this.eliminarPreguntasVacias();
    super.editar()

  }
  cargarHijos(): void {
    this.asignaturahijo = this.model.asignaturapadre ?
      this.model.asignaturapadre.hijos :
      [];
  }

  compararAsignatura(a1: Asignatura, a2: Asignatura): boolean {
    if (a1 === undefined && a2 === undefined) {
      return true;
    }
    return (a1 === null || a2 === null || a1 === undefined || a2 === undefined
      ? false : a1.id === a2.id);
  }

  agregarPregunta() {
    this.model.preguntas.push(new Pregunta());
  }

  asigntarTexto(pregunta: Pregunta, event: any): void {
    pregunta.texto = event.target.value as string;
    console.log(this.model);
  }

  eliminarPregunta(pregunta): void {
    this.model.preguntas = this.model.preguntas.filter(p => pregunta.texto !== p.texto)
  }

  eliminarPreguntasVacias(): void {
    this.model.preguntas = this.model.preguntas.filter(p => p.texto != null && p.texto.length > 0);

  }



}
