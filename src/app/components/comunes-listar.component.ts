import { Directive, OnInit, ViewChild } from '@angular/core';


import Swal from 'sweetalert2'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Generic } from '../model/generic';
import { ComunesService } from '../service/comunes.service';

@Directive()
export abstract class ComuneslistarComponent<E extends Generic, S extends ComunesService<E>> implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  titulo: string;
  lista: E[] = [];
  protected nombreModel: string;

  totalRegistro: number = 0;
  totalPagina: number = 4;
  paginaActual: number = 0;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];

  constructor(protected service: S) { }

  ngOnInit() {
    this.calcularRango();

  }

  cambiarPagina(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPagina = event.pageSize;
    this.calcularRango();

  }

  private calcularRango(): void {



    this.service.listarPaginas(this.paginaActual.toString(), this.totalPagina.toString()).subscribe(
      p => {
        this.lista = p.content as E[];
        this.totalRegistro = p.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
      }
    );
  }

  eliminar(entity: E): void {
    Swal.fire({
      title: `Cuidado:  ¿Seguro que desea eliminar el alumno ${entity.nombre.toUpperCase()} ?`,
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: "Si, eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(entity.id).subscribe(() => {
          this.lista = this.lista.filter(a => a !== entity);

          Swal.fire('Eliminado:', `Alumno ${entity.nombre.toUpperCase()} eliminado con éxito`, 'success');
          this.calcularRango();
        });

      } else if (result.isDenied) {
        Swal.fire("Alumno no eliminado", "", "info");
      }
    });

  }

}
