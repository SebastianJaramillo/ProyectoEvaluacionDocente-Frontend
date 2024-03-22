import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoService } from './services/alumno/alumno.service';
import { CursoComponent } from './curso/curso.component';
import { RouterModule, Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { EvaluacionComponent } from './periodo/evaluacion.component';
import { DocenteComponent } from './docente/docente.component';
import {
  IgxIconModule,
  IgxNavbarModule,
  IgxButtonModule,
  IgxNavigationDrawerModule,
  IgxRippleModule,
  IgxToggleModule,
} from 'igniteui-angular';
import { ReporteComponent } from './reporte/reporte.component';
import { PreguntasDocenteComponent } from './preguntas-docente/preguntas-docente.component';
import { EvaluacionParesComponent } from './evaluacion-pares/evaluacion-pares.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EvaluacionDirectivaComponent } from './evaluacion-directiva/evaluacion-directiva.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PeriodoAdminComponent } from './Admintracion/periodo-admin/periodo-admin.component';
import { PeriodoFormAdminComponent } from './Admintracion/periodo-form-admin/periodo-form-admin.component';
import { FormularioAdminComponent } from './Admintracion/formulario-admin/formulario-admin.component';
import { FormularioFormAdminComponent } from './Admintracion/formulario-form-admin/formulario-form-admin.component';
import { PreguntasFormAdminComponent } from './Admintracion/preguntas-form-admin/preguntas-form-admin.component';
import { MatIconModule } from '@angular/material/icon';
import { AsignacionRolesComponent } from './Admintracion/asignacion-roles/asignacion-roles.component';
import { AsignacionDocenteComponent } from './Admintracion/asignacion-docente/asignacion-docente.component';
import { SeleccionarCoordinadorComponent } from './Admintracion/asignacion/seleccionar-coordinador/seleccionar-coordinador.component';
import { DocenteAsignacionComponent } from './Admintracion/asignacion/docente-asignacion/docente-asignacion.component';
import { ListaDocentesComponent } from './Admintracion/asignacion/lista-docentes/lista-docentes.component';
import { PeriodoFormAdminEditarComponent } from './Admintracion/periodo-form-admin-editar/periodo-form-admin-editar.component';
const routes: Routes = [
  { path: 'cursos', component: CursoComponent },  
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CursoComponent,
    EvaluacionComponent,
    PreguntasComponent,
    LoginComponent,
    DocenteComponent,
    ReporteComponent,
    PreguntasDocenteComponent,
    EvaluacionParesComponent,
    EvaluacionDirectivaComponent,
    NavbarAdminComponent,
    PeriodoAdminComponent,
    PeriodoFormAdminComponent,
    FormularioAdminComponent,
    FormularioFormAdminComponent,
    PreguntasFormAdminComponent,
    AsignacionRolesComponent,
    AsignacionDocenteComponent,
    SeleccionarCoordinadorComponent,
    DocenteAsignacionComponent,
    ListaDocentesComponent,
    PeriodoFormAdminEditarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IgxIconModule,
    IgxNavbarModule,
    IgxButtonModule,
    IgxNavigationDrawerModule,
    IgxRippleModule,
    IgxToggleModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [AlumnoService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
