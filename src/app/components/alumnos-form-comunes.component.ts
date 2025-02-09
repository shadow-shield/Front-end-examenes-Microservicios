import {Directive } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Generic } from '../model/generic';
import { ComunesService } from '../service/comunes.service';

@Directive()
export abstract class ComunesFormComponent<E extends Generic, S extends ComunesService<E>> {

  model: E;
  errores: any
  titulo: string;
  protected redirect: string;
  protected nombreModel: string;

  constructor(protected service: S, protected router: Router, protected routes: ActivatedRoute) { }

  ngOnInit() {
    this.routes.paramMap.subscribe(params => {
      const id:number = +params.get('id');
      if (id) {
        this.service.ver(id).subscribe(m =>{
          this.model=m,
          this.titulo = 'Editar ' + this.nombreModel;
        });
      }
    });

  }

  public editar(): void {
    this.service.editar(this.model)
      .subscribe(model => {
        console.log(model);
        Swal.fire('Actualizado:', `${this.nombreModel} ${model.nombre.toUpperCase()}  actualizado con éxito`, 'success');
        this.router.navigate([this.redirect]);
      }, err => {
        if (err.status === 400) {
          this.errores = err.error;
          console.log(this.errores);
        }
      });
  }



   public crear(): void {
    this.service.crear(this.model)
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
