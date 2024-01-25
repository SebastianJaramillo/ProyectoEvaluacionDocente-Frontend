import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de agregar esta línea
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './alumno/alumno.component';
import { AlumnoService } from './services/alumno/alumno.service';
import { CursoComponent } from './curso/curso.component';
import { RouterModule, Routes } from '@angular/router';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';

import { NavbarComponent } from './navbar/navbar.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
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
const routes: Routes = [
  { path: 'alumnos', component: AlumnoComponent },
  { path: 'cursos', component: CursoComponent },  
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redireccionar a 'alumnos' por defecto
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    AlumnoComponent,
    CursoComponent,
    EvaluacionComponent,
    PreguntasComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NavComponent,
    DocenteComponent,
    ReporteComponent,
    PreguntasDocenteComponent
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
    FormsModule, // Asegúrate de agregar FormsModule aquí
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AlumnoService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
