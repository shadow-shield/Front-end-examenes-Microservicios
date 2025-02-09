import { Component } from '@angular/core';
import { CursoService } from '../../service/curso.service';
import { ComuneslistarComponent } from '../comunes-listar.component';
import { Curso } from '../../model/curso';
import { baseEndpoint } from '../../config/app';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent extends ComuneslistarComponent<Curso, CursoService>{

  baseEndpoint=baseEndpoint+'/curso';

  constructor(service: CursoService) {
    super(service);
    this.titulo = 'Listado de Cursos';
    this.nombreModel = Curso.name;
  }


}

