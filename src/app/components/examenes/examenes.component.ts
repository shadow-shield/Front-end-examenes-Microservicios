import { Component } from '@angular/core';
import { Examenes } from '../../model/examenes';
import { ExamenesService } from '../../service/examenes.service';
import { ComuneslistarComponent } from '../comunes-listar.component';

@Component({
  selector: 'app-examenes',
  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.css'
})
export class ExamenesComponent extends ComuneslistarComponent<Examenes, ExamenesService>{

  constructor(service: ExamenesService) {
    super(service);
    this.titulo = 'Listado de Examenes';
    this.nombreModel = Examenes.name;
  }

}
