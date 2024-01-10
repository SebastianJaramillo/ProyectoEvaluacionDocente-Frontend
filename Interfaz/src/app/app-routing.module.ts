import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { CursoComponent } from './curso/curso.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
const routes: Routes = [
  { path: 'alumnos', component: AlumnoComponent },
  { path: 'cursos/:alumnoId', component: CursoComponent },
  { path: 'periodo/:alumnoId', component: EvaluacionComponent },
  {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent},
  {path:'iniciar-sesion',component:LoginComponent},
  {path: 'preguntas/:alumnoId/:cursoId/:formId/:id',component: PreguntasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
