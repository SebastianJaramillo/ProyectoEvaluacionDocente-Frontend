import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocenteService } from '../../../services/docente/docente.service';
import { FuncionService } from '../../../services/funcion/funcion.service';
import { EvaluacionService } from '../../../services/evaluacion/evaluacion.service';
import { forkJoin } from 'rxjs';
import { Docente } from '../../asignacion-roles/docente.model';
import { Funcion } from '../../asignacion-roles/funcion.model';
import { NombreFuncion } from '../../asignacion-roles/nombreFuncion.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-docente-asignacion',
  templateUrl: './docente-asignacion.component.html',
  styleUrls: ['./docente-asignacion.component.css']
})
export class DocenteAsignacionComponent implements OnInit{
  docentes: Docente[] = [];
  docente: any = {};
  id: any;
  idJefe: any;
  docId: any;
  funcId: any;
  funcion: any = {};
  funcionActual: any = {};
  periodo: any = {};
  eval: any = {};
  desactivado: any;
  DocentesFuncion: any[] = [];
  DocenteRelacion: any = {};
  docentesFiltrados: any[] = [];
  terminoBusqueda: string = '';

  constructor(
    private docenteService: DocenteService,
    private funcionService: FuncionService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.docId = params['docId'];
      this.findDocenteAll();
      this.findDocente(this.docId);
    });



  }

  findAllDocentes() {
    this.docenteService.findAllDocente().subscribe(
      (data) => {
        this.docentes = data;
        console.log(this.docentes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filtrarDocentes() {
    this.funcionService.findAllDocentesByEstado().subscribe({
      next: (funciones: Funcion[]) => {
        this.funcionService.findAllFunciones().subscribe({
          next: (nombresFunciones: NombreFuncion[]) => {
            const mapFuncIdToNombreRol = nombresFunciones.reduce((acc, nombreFuncion) => {
              acc[nombreFuncion.id] = nombreFuncion.rol;
              return acc;
            }, {} as { [key: string]: string });
            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({ ...funcion, nombreRol });
              return acc;
            }, {} as { [key: string]: any[] });

            const docentesConRolPreferido = Object.values(agrupadasPorDocId).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(funcion => funcion.nombreRol === 'Coordinador');
              return funcionConCoordinador || funciones[0];
            });

            console.log(docentesConRolPreferido);
            let docentesFiltradosPorNombre = docentesConRolPreferido.filter(doc =>
              (doc.docente.nombres + " " + doc.docente.apellidos).toLowerCase().includes(this.terminoBusqueda.toLowerCase())
            );
            console.log('nombre', docentesFiltradosPorNombre);
            this.DocentesFuncion = docentesFiltradosPorNombre;
            this.DocentesFuncion =this.DocentesFuncion.filter(docenteConFuncion=> {
              return docenteConFuncion.funcion.rol !== 'Director' && docenteConFuncion.funcion.rol !== 'Docente';
            });
          },
          error: (error) => console.error(error)
        });
      },
      error: (error) => console.error(error)
    });

  }

  findDocenteAll() {
    this.funcionService.findAllDocentesByEstado().subscribe({
      next: (funciones: Funcion[]) => {
        this.funcionService.findAllFunciones().subscribe({
          next: (nombresFunciones: NombreFuncion[]) => {
            const mapFuncIdToNombreRol = nombresFunciones.reduce((acc, nombreFuncion) => {
              acc[nombreFuncion.id] = nombreFuncion.rol;
              return acc;
            }, {} as { [key: string]: string });

            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({ ...funcion, nombreRol });
              return acc;
            }, {} as { [key: string]: any[] });

            const docentesConRolPreferido = Object.values(agrupadasPorDocId).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(funcion => funcion.nombreRol === 'Coordinador');
              return funcionConCoordinador || funciones[0];
            });

            this.DocentesFuncion = docentesConRolPreferido;
            this.DocentesFuncion =this.DocentesFuncion.filter(docenteConFuncion=> {
              return docenteConFuncion.funcion.rol !== 'Director' && docenteConFuncion.funcion.rol !== 'Docente';
            });
            
          },
          error: (error) => console.error(error)
        });
      },
      error: (error) => console.error(error)
    });
  }


  findByFuncion(id: string) {
    this.docenteService.findFuncionDirector(id).subscribe(
      (data) => {
        this.docentes = data.filter((docente) => docente.docId !== atob(this.id));
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

  asignarDocentes(id: any) {
    this.DocenteRelacion.docIdDocente = this.docId;
    this.DocenteRelacion.docIdJefe = id;
    this.docenteService.findDocenteRelacionById(id).subscribe(
      (data) => {
        this.DocenteRelacion = data;
        console.log('este es mi relacion',this.DocenteRelacion)
      },
      (error) => {
        console.error(error);
      }
      
    );

    console.log(this.DocenteRelacion)
    this.docenteService.crearDocenteRelacion(this.DocenteRelacion).subscribe(
      (data) => {
        this.DocenteRelacion = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.mensaje("Asignacion del docente realizada exitosamente");
    this.router.navigate(['listarDocentes']);
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

  volver() {
    this.router.navigate(['listarDocentes']);
  }
  findDocente(id: string) {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.docente = data        
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
}
