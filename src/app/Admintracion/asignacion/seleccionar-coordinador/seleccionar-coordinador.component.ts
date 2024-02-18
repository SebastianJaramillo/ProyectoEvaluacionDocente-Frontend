import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocenteService } from '../../../services/docente/docente.service';
import { FuncionService } from '../../../services/funcion/funcion.service';
import { EvaluacionService } from '../../../services/evaluacion/evaluacion.service';
import { forkJoin } from 'rxjs';
import { Docente } from '../../asignacion-roles/docente.model';
import { Funcion } from '../../asignacion-roles/funcion.model';
import { NombreFuncion } from '../../asignacion-roles/nombreFuncion.model';
@Component({
  selector: 'app-seleccionar-coordinador',
  templateUrl: './seleccionar-coordinador.component.html',
  styleUrls: ['./seleccionar-coordinador.component.css']
})
export class SeleccionarCoordinadorComponent implements OnInit {
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
  DocentesFuncion: any[] = [];
  DocenteFuncion: any = {};
  desactivado: any;
  docentesFiltrados: any[] = []; // Lista para los docentes filtrados
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
      this.id = params['id'];
      this.docId = params['docId'];
      this.findDocenteAll();
    });

  }


  filtrarDocentes() {
    this.funcionService.findAllDocentesByEstado().subscribe({
      next: (funciones: Funcion[]) => {
        // Obtener los nombres de las funciones (asumiendo que tienes un método para esto)
        this.funcionService.findAllFunciones().subscribe({
          next: (nombresFunciones: NombreFuncion[]) => {
            // Crear un mapa de funcId a nombreRol para un acceso rápido
            const mapFuncIdToNombreRol = nombresFunciones.reduce((acc, nombreFuncion) => {
              acc[nombreFuncion.id] = nombreFuncion.rol;
              return acc;
            }, {} as { [key: string]: string });

            // Agrupar las funciones por docId
            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({ ...funcion, nombreRol });
              return acc;
            }, {} as { [key: string]: any[] });

            // Para cada grupo, conservar la función con el rol de coordinador si existe
            const docentesConRolPreferido = Object.values(agrupadasPorDocId).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(funcion => funcion.nombreRol === 'Coordinador');
              return funcionConCoordinador || funciones[0];
            });

            // Aquí tendrías los docentes con su función preferida
            console.log(docentesConRolPreferido);
            let docentesFiltradosPorNombre = docentesConRolPreferido.filter(doc =>
              (doc.docente.nombres + " " + doc.docente.apellidos).toLowerCase().includes(this.terminoBusqueda.toLowerCase())
            );
            console.log('nombre', docentesFiltradosPorNombre);
            this.DocentesFuncion = docentesFiltradosPorNombre;
            this.DocentesFuncion = this.DocentesFuncion.filter(docenteConFuncion => docenteConFuncion.funcion.rol !== 'Director');
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
        // Obtener los nombres de las funciones (asumiendo que tienes un método para esto)
        this.funcionService.findAllFunciones().subscribe({
          next: (nombresFunciones: NombreFuncion[]) => {
            // Crear un mapa de funcId a nombreRol para un acceso rápido
            const mapFuncIdToNombreRol = nombresFunciones.reduce((acc, nombreFuncion) => {
              acc[nombreFuncion.id] = nombreFuncion.rol;
              return acc;
            }, {} as { [key: string]: string });

            // Agrupar las funciones por docId
            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({ ...funcion, nombreRol });
              return acc;
            }, {} as { [key: string]: any[] });

            // Para cada grupo, conservar la función con el rol de coordinador si existe
            const docentesConRolPreferido = Object.values(agrupadasPorDocId).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(funcion => funcion.nombreRol === 'Coordinador');
              return funcionConCoordinador || funciones[0];
            });

            // Aquí tendrías los docentes con su función preferida
            console.log(docentesConRolPreferido);
            this.DocentesFuncion = docentesConRolPreferido;
            this.DocentesFuncion = this.DocentesFuncion.filter(docenteConFuncion => docenteConFuncion.funcion.rol !== 'Director');
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

  cambiarRol(id: any) {

  }
  cambiarJefeDeDocentes(idNuevoJefe: string) {
    // Obtener la lista de docentes a cargo del jefe actual
    if (idNuevoJefe == this.docId) {
      this.router.navigate(['rolesAdmin']);
    }
    this.docenteService.findByJefe(this.docId).subscribe(
      (docentesACargo) => {
        console.log('docentesACargo', docentesACargo);

        // Recorrer cada uno de los docentes y actualizar su jefe
        docentesACargo.forEach(docente => {
          this.docenteService.cambiarJefeDocente(docente.codigo, idNuevoJefe).subscribe(
            (respuesta) => {
              console.log(`El jefe del docente ${docente.codigo} ha sido actualizado a ${idNuevoJefe}`, respuesta);

              // Aquí puedes implementar alguna lógica adicional si es necesario,
              // como actualizar la UI o mostrar un mensaje de éxito.
            },
            (error) => {
              console.error(`Error al actualizar el jefe del docente ${docente.id}`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Error al obtener los docentes a cargo del jefe actual', error);
      }
    );
    this.cambiarEstadoCoordinadorDocente();
    this.funcionService.findDocenteFuncionById(this.id).subscribe(
      (data) => {
        this.DocenteFuncion = data;
        this.DocenteFuncion.docId = idNuevoJefe;  
        this.docenteService.crearDocentefuncion(this.DocenteFuncion).subscribe(
          (data) => {
            this.funcion = data;
            console.log('creado', data);          
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );

    this.router.navigate(['rolesAdmin']);
  }


  crearNuevoCoordinador(nuevo: any) {

    this.funcionService.createDocenteFuncionById(nuevo).subscribe(
      (data) => {

      },
      (error) => {
        console.error(error);
      }
    );

  }

  cambiarEstadoCoordinadorDocente() {
    this.docenteService.cambiarEstadoDocenteFuncion(this.id).subscribe(
      (data) => {
        console.log('Estado cambiado', data);
        this.DocenteFuncion = data;
        this.DocenteFuncion.funcId = 'DOC-DOC',
        this.DocenteFuncion.estado = 'ACTIVO'
        this.funcionService.createDocenteFuncionById(this.DocenteFuncion).subscribe(
          (data) => {

          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );

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
    this.router.navigate(['rolesAdmin']);
  }

}
