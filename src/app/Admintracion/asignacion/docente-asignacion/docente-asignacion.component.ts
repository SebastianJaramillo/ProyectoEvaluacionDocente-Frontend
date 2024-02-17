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
  selector: 'app-docente-asignacion',
  templateUrl: './docente-asignacion.component.html',
  styleUrls: ['./docente-asignacion.component.css']
})
export class DocenteAsignacionComponent implements OnInit{
  docentes: Docente[] = [];
  docente: any = {};
  id: any;
  idJefe: any;
  evalId: any;
  funcId: any;
  funcion: any = {};
  funcionActual: any = {};
  periodo: any = {};
  eval: any = {};
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
      this.evalId = params['evalId'];
      this.findDocenteAll();
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

  filtrarDocentes(): void {
    this.docenteService.findAllDocente().subscribe(
      (data) => {
        this.docentes = data;
        this.docentes = this.docentes.filter(doc =>
          (doc.nombres + " " + doc.apellidos).toLowerCase().includes(this.terminoBusqueda.toLowerCase())
        );
        console.log('filtro', this.docentes);

      },
      (error) => {
        console.error(error);
      }
    );
  }

  findDocenteAll() {
    forkJoin({
      docentes: this.docenteService.findAllDocente(),
      funciones: this.funcionService.findAllDocenteFuncion(),
      nombresFunciones: this.funcionService.findAllFunciones()
    }).subscribe({
      next: ({ docentes, funciones, nombresFunciones }) => {


        // Primero mapeas todos los docentes a sus roles
        let docentesConRol = docentes.map((docente: Docente) => {

          const funcionesDocente = funciones.filter((funcion: Funcion) => funcion.docId === docente.id);
          //console.log(`Funciones filtradas para docente ID: ${docente.id}:`, funcionesDocente);

          const nombresFuncionDocente = funcionesDocente.map((funcion: Funcion) => {
            return nombresFunciones.find((nombreFuncion: NombreFuncion) => nombreFuncion.id === funcion.funcId);
          });

          //console.log(`NombresFunciones encontrados para docente ID: ${docente.id}:`, nombresFuncionDocente);

          // Selecciona el primer nombre de función encontrado o un valor por defecto
          const nombreFuncion = nombresFuncionDocente.length > 0 && nombresFuncionDocente[0] ? nombresFuncionDocente[0].rol : 'Función no encontrada';
          //console.log(`Nombre de función asignado a docente ID: ${docente.id}: ${nombreFuncion}`);

          return {
            ...docente,
            nombreFuncion: nombreFuncion
          };
        });

        // Luego filtras aquellos docentes cuya nombreFuncion no sea 'Director'
        this.docentes = docentesConRol.filter((docente: Docente) => {
          return docente.nombreFuncion !== 'Director' && docente.nombreFuncion !== 'Docente';
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
    console.log(id);
    this.router.navigate(['listarDocentes',id]);
  }

  cambiarJefeDeDocentes(idNuevoJefe: string) {
    // Obtener la lista de docentes a cargo del jefe actual

    this.docenteService.findByJefe(this.id).subscribe(
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
    this.funcionService.findDocenteFuncion(this.id).subscribe(
      (data) => {
        this.funcionActual = data;
        this.funcionService.findDocenteFuncion(idNuevoJefe).subscribe(
          (data) => {
            this.funcion = data;
            console.log('funcion', this.funcion);
            if (this.funcion[0].funcion.rol == 'Coordinador') {
                
              this.eliminarCoordinador(this.id);
              
            } else {
              this.funcion[0].funcId = this.funcionActual[0].funcId;
              
              this.funcionService.deleteFuncionByIdCor(this.id);
              this.crearNuevoCoordinador(this.funcion[0]);
            }
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

  eliminarCoordinador(id: string) {
    this.funcionService.deleteFuncionByIdCor(id).subscribe(
      (data) => {
        //console.log('funciones', this.funciones)
        this.funcion.docId = id;
        this.funcion.estado = 'ACTIVO';
        this.funcion.funcId = 'DOC-DOC';
        this.funcion.funcHoras = '0'
        console.log(this.funcion)
        this.funcionService.createDocenteFuncionById(this.funcion).subscribe(
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

  crearNuevoCoordinador(nuevo: any) {
      
    this.funcionService.createDocenteFuncionById(nuevo).subscribe(
      (data) => {

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
