import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso/curso.component';
import { LoginComponent } from './auth/login/login.component';
import { EvaluacionComponent } from './periodo/evaluacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { NavbarComponent } from './navbar/navbar.component'; 
import { DocenteComponent } from './docente/docente.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PreguntasDocenteComponent } from './preguntas-docente/preguntas-docente.component';
import { EvaluacionParesComponent } from './evaluacion-pares/evaluacion-pares.component';
import { EvaluacionDirectivaComponent } from './evaluacion-directiva/evaluacion-directiva.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PeriodoAdminComponent } from './Admintracion/periodo-admin/periodo-admin.component';
import { FormularioAdminComponent } from './Admintracion/formulario-admin/formulario-admin.component';
import { AsignacionRolesComponent } from './Admintracion/asignacion-roles/asignacion-roles.component';
import { AsignacionDocenteComponent } from './Admintracion/asignacion-docente/asignacion-docente.component';
import { SeleccionarCoordinadorComponent } from './Admintracion/asignacion/seleccionar-coordinador/seleccionar-coordinador.component';
import { DocenteAsignacionComponent } from './Admintracion/asignacion/docente-asignacion/docente-asignacion.component';
import { ListaDocentesComponent } from './Admintracion/asignacion/lista-docentes/lista-docentes.component';
const routes: Routes = [
  {path:'iniciar-sesion',component:LoginComponent},

  {
    path: '',
    component: NavbarAdminComponent,
    children: [
      { path: 'periodoAdmin', component:  PeriodoAdminComponent},
      { path: 'formularioAdmin', component:  FormularioAdminComponent}
    ],
  },
    {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'cursos/:id/:evalId', component: CursoComponent },
      { path: 'periodo/:id', component: EvaluacionComponent },
      { path: 'reporte/:id/:evalId', component:ReporteComponent },
      { path: 'preguntas/:id/:cursoId/:formId/:idCurEst/:evalId',component: PreguntasComponent},
      { path: 'rolesAdmin', component: AsignacionRolesComponent  },
      { path: 'asignarRol/:id/:docId', component: AsignacionDocenteComponent  },
      { path: 'selectCoordinador/:id/:docId', component: SeleccionarCoordinadorComponent  },
      { path: 'asignarDocentes/:docId', component: DocenteAsignacionComponent  },
      { path: 'listarDocentes', component: ListaDocentesComponent  },
      { path: 'docentes/:id/:evalId', component: DocenteComponent},
      { path: 'docentes-preguntas/:idJefe/:idDoc/:formId/:evalId/:funcId',component: PreguntasDocenteComponent},
      { path: 'evaluacion-pares/:id/:evalId/:funcId', component: EvaluacionParesComponent},
      { path: 'evaluacion-directiva/:id/:funcId/:evalId', component: EvaluacionDirectivaComponent}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
