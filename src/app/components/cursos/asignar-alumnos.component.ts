import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Curso } from '../../model/curso';
import { CursoService } from '../../service/curso.service';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../model/alumno';
import { SelectionModel } from '@angular/cdk/collections';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-asignar-alumnos',
  templateUrl: './asignar-alumnos.component.html',
  styleUrl: './asignar-alumnos.component.css'
})
export class AsignarAlumnosComponent implements OnInit {


  curso: Curso;
  alumnoAsignar: Alumno[] = [];
  tabIndex: number = 0;
  alumnos: Alumno[] = []

  datasource: MatTableDataSource<Alumno>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [3, 5, 10, 20, 50];


  mostrarColumnas: string[] = ['nombre', 'apellido', 'seleccion'];
  columnosAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];
  seleccion: SelectionModel<Alumno> = new SelectionModel<Alumno>(true, []);

  //inyectando serviceCurso en el constructor
  constructor(private cursoService: CursoService, private alumnoservice: AlumnoService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.cursoService.ver(id).subscribe(c => {
        this.curso = c;
        this.alumnos = this.curso.alumnos;
        this.iniciarPaginador();


      });
    })
  }

  iniciarPaginador(): void {
    this.datasource = new MatTableDataSource<Alumno>(this.alumnos);
    this.datasource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
  }

  filtrar(nombre: string): void {
    nombre = nombre !== undefined ? nombre.trim() : '';
    if (nombre !== '') {
      this.alumnoservice.filtrarPorNombre(nombre)
        .subscribe(alumnos => this.alumnoAsignar = alumnos.filter(a => {
          let filtrar = true;
          this.alumnos.forEach(ca => {
            if (a.id === ca.id) {
              filtrar = false;
            }
          });
          return filtrar;
        }));

    }
  }

  todoSelecionado(): boolean {
    const selecionados = this.seleccion.selected.length;
    const numAlumnos = this.alumnoAsignar.length;
    return (selecionados === numAlumnos);
  }
  deSelecioanrtodo(): void {
    this.todoSelecionado() ?
      this.seleccion.clear() :
      this.alumnoAsignar.forEach(a => this.seleccion.select(a));
  }

  asignar(): void {
    this.cursoService.asignarAlumnosAlCurso(this.curso, this.seleccion.selected)
      .subscribe({
        next: (c) => {
          this.tabIndex = 2;
          Swal.fire(
            'Asignados',
            `Alumnos asignados con éxito al curso ${this.curso.nombre}`,
            'success'
          );
          this.alumnos = this.alumnos.concat(this.seleccion.selected);
          this.iniciarPaginador();
          this.alumnoAsignar = [];
          this.seleccion.clear();
        },
        error: (e: HttpErrorResponse) => {
          console.error('Error en la asignación:', e);

          if (e.status === 500 && e.error?.message) {
            const mensaje = e.error.message as string;

            if (mensaje.includes('ConstraintViolationException')) {
              Swal.fire(
                'Cuidado',
                'No se puede asignar al alumno, ya está asociado a otro curso.',
                'error'
              );
            } else if (mensaje.includes('Duplicate entry')) {
              Swal.fire(
                'Error',
                'Este alumno ya está registrado en el curso.',
                'error'
              );
            } else {
              Swal.fire(
                'Error',
                'Ocurrió un error inesperado en el servidor.',
                'error'
              );
            }
          } else {
            Swal.fire(
              'Error',
              'No se pudo conectar con el servidor. Inténtalo nuevamente.',
              'error'
            );
          }
        }
      });
  }

  eliminarAlumno(alumno: Alumno): void {
    Swal.fire({
      title: `Cuidado:  ¿Seguro que desea eliminar el alumno ${alumno.nombre.toUpperCase()} ?`,
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: "Si, eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.cursoService.elminarAlumno(this.curso, alumno).subscribe(
          curso => {
            this.iniciarPaginador();
            this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
            Swal.fire(
              'Eliminad :',
              `Alumno ${alumno.nombre} eliminado con exito del curso ${curso.nombre}`
            )
          });
      } else if (result.isDenied) {
        Swal.fire("Alumno no eliminado", "", "info");
      }
    });


  }



}
