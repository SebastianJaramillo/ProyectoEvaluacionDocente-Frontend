import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocenteService } from '../../services/docente/docente.service';
import { FuncionService } from '../../services/funcion/funcion.service';
import { EvaluacionService } from '../../services/evaluacion/evaluacion.service';
import { forkJoin } from 'rxjs';
import { Docente } from './docente.model';
import { Funcion } from './funcion.model';
import { NombreFuncion } from './nombreFuncion.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styleUrls: ['./asignacion-roles.component.css'],
})
export class AsignacionRolesComponent implements OnInit {
  docentes: Docente[] = [];
  docente: any = {};
  DocentesFuncion: any[] = [];
  id: any;
  idJefe: any;
  evalId: any;
  funcId: any;
  funcion: any = {};
  periodo: any = {};
  eval: any = {};
  desactivado: any;
  docentesFiltrados: any[] = [];
  terminoBusqueda: string = '';

  constructor(
    private docenteService: DocenteService,
    private funcionService: FuncionService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role && role === 'DOCENTE') {
    } else {
      this.mensajeError('Acceso denegado. Vuelva a iniciar sesión.');
      this.router.navigate(['']);
    }

    this.findDocenteAll();
  }

  filtrarDocentes() {
    this.funcionService.findAllDocentesByEstado().subscribe({
      next: (funciones: Funcion[]) => {
        this.funcionService.findAllFunciones().subscribe({
          next: (nombresFunciones: NombreFuncion[]) => {
            const mapFuncIdToNombreRol = nombresFunciones.reduce(
              (acc, nombreFuncion) => {
                acc[nombreFuncion.id] = nombreFuncion.rol;
                return acc;
              },
              {} as { [key: string]: string }
            );
            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({
                ...funcion,
                nombreRol,
              });
              return acc;
            }, {} as { [key: string]: any[] });

            const docentesConRolPreferido = Object.values(
              agrupadasPorDocId
            ).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(
                (funcion) => funcion.nombreRol === 'Coordinador'
              );
              return funcionConCoordinador || funciones[0];
            });

            let docentesFiltradosPorNombre = docentesConRolPreferido.filter(
              (doc) =>
                (doc.docente.nombres + ' ' + doc.docente.apellidos)
                  .toLowerCase()
                  .includes(this.terminoBusqueda.toLowerCase())
            );
            this.DocentesFuncion = docentesFiltradosPorNombre;
            this.DocentesFuncion = this.DocentesFuncion.filter(
              (docenteConFuncion) =>
                docenteConFuncion.funcion.rol !== 'Director'
            );
          },
          error: (error) => console.error(error),
        });
      },
      error: (error) => console.error(error),
    });
  }

  findDocenteAll() {
    this.funcionService.findAllDocentesByEstado().subscribe({
      next: (funciones: Funcion[]) => {
        this.funcionService.findAllFunciones().subscribe({
          next: (nombresFunciones: NombreFuncion[]) => {
            const mapFuncIdToNombreRol = nombresFunciones.reduce(
              (acc, nombreFuncion) => {
                acc[nombreFuncion.id] = nombreFuncion.rol;
                return acc;
              },
              {} as { [key: string]: string }
            );

            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({
                ...funcion,
                nombreRol,
              });
              return acc;
            }, {} as { [key: string]: any[] });

            const docentesConRolPreferido = Object.values(
              agrupadasPorDocId
            ).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(
                (funcion) => funcion.nombreRol === 'Coordinador'
              );
              return funcionConCoordinador || funciones[0];
            });

            this.DocentesFuncion = docentesConRolPreferido;
            this.DocentesFuncion = this.DocentesFuncion.filter(
              (docenteConFuncion) =>
                docenteConFuncion.funcion.rol !== 'Director'
            );
          },
          error: (error) => console.error(error),
        });
      },
      error: (error) => console.error(error),
    });
  }

  findByFuncion(id: string) {
    this.docenteService.findFuncionDirector(id).subscribe(
      (data) => {
        this.docentes = data.filter((docente) => docente.docId !== this.id);        
        if (this.docentes.length <= 0) {
          this.mensajeError('Acceso denegado. Vuelva a iniciar sesión.');
          localStorage.clear();
          this.router.navigate(['']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findFuncionById(id: string) {
    this.funcionService.findById(id).subscribe(
      (data) => {
        this.funcion = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cambiarRol(id: any, docId: any) {
    this.router.navigate(['asignarRol', btoa(id), btoa(docId)]);
  }

  findPeriodo(id: number): any {
    this.evaluacionService.getPeriodoById(id).subscribe(
      (data) => {
        this.periodo = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findEvaluacion(id: number): any {
    this.evaluacionService.findEvaluacion(id).subscribe(
      (data) => {
        this.eval = data;
        this.findPeriodo(this.eval.perId);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  mensaje(texto: any) {
    Swal.fire({
      title: 'Éxito',
      text: texto,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }

  mensajeError(texto: any) {
    Swal.fire({
      title: 'Error',
      text: texto,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }
}
