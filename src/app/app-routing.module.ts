import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { ExamenesComponent } from './components/examenes/examenes.component';
import { AlumnosFormComponent } from './components/alumnos/formulario-alumno/alumnos-form.component';
import { FormularioEditarCursoComponent } from './components/cursos/formulario-editar-curso/formulario-editar-curso.component';
import { FormularioEditarExamenComponent } from './components/examenes/formulario-editar-examen/formulario-editar-examen.component';


const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'alumnos'},
  {path: 'alumnos', component: AlumnosComponent},
  {path: 'alumnos/form', component: AlumnosFormComponent},
  {path: 'alumnos/form/:id', component: AlumnosFormComponent},
  {path: 'cursos', component: CursosComponent},
  {path: 'cursos/form', component: FormularioEditarCursoComponent},
  {path: 'cursos/form/:id', component: FormularioEditarCursoComponent},
  {path: 'examenes', component: ExamenesComponent},
  {path: 'examenes/form', component: FormularioEditarExamenComponent},
  {path: 'examenes/form/:id', component: FormularioEditarExamenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
