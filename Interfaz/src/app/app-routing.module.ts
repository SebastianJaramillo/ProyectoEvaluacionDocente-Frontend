import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { CursoComponent } from './curso/curso.component';
import { LoginComponent } from './auth/login/login.component';
import { EvaluacionComponent } from './periodo/evaluacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { NavbarComponent } from './navbar/navbar.component'; 
import { DocenteComponent } from './docente/docente.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PreguntasDocenteComponent } from './preguntas-docente/preguntas-docente.component';
import { EvaluacionParesComponent } from './evaluacion-pares/evaluacion-pares.component';
const routes: Routes = [
  {path:'iniciar-sesion',component:LoginComponent},
  {
    path: '',
    component: NavbarComponent,
    children: [
    { path: 'alumnos', component: AlumnoComponent },
    { path: 'cursos/:id', component: CursoComponent },
    { path: 'periodo/:id', component: EvaluacionComponent },
    { path: 'Reporte', component:ReporteComponent },
    { path: 'preguntas/:id/:cursoId/:formId/:idCurEst',component: PreguntasComponent},
    { path: 'docentes/:id', component: DocenteComponent},
    { path: 'docentes-preguntas/:idJefe/:idDoc/:formId/:funcId',component: PreguntasDocenteComponent},
    { path: 'evaluacion-pares/:id', component: EvaluacionParesComponent },
    ],
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
