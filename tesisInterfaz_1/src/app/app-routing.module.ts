import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { AppComponent } from './app.component';
import { CursoComponent } from './curso/curso.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ExamenComponent } from './examen/examen.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'alumnos', component: AlumnoComponent },
  { path: 'cursos', component: CursoComponent },
  { path: 'examenes', component: ExamenComponent },
  {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent},
  {path:'iniciar-sesion',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
