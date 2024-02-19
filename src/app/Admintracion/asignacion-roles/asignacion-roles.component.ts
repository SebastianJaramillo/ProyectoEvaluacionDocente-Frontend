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
  styleUrls: ['./asignacion-roles.component.css']
})
export class AsignacionRolesComponent implements OnInit {
  docentes: Docente[] = [];
  docente: any = {};
  DocentesFuncion: any [] = [];
  id: any;
  idJefe: any;
  evalId: any;
  funcId: any;
  funcion: any = {};
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

    this.findDocenteAll();

    
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
            }, {} as {[key: string]: string});
  
            // Agrupar las funciones por docId
            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({ ...funcion, nombreRol });
              return acc;
            }, {} as {[key: string]: any[]});
  
            // Para cada grupo, conservar la función con el rol de coordinador si existe
            const docentesConRolPreferido = Object.values(agrupadasPorDocId).map((funciones: any[]) => {
              const funcionConCoordinador = funciones.find(funcion => funcion.nombreRol === 'Coordinador');
              return funcionConCoordinador || funciones[0];
            });
  
            // Aquí tendrías los docentes con su función preferida
            console.log(docentesConRolPreferido);
            let docentesFiltradosPorNombre = docentesConRolPreferido.filter(doc=>
            (doc.docente.nombres + " " + doc.docente.apellidos).toLowerCase().includes(this.terminoBusqueda.toLowerCase())
          );
          console.log('nombre',docentesFiltradosPorNombre);
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
            }, {} as {[key: string]: string});
  
            // Agrupar las funciones por docId
            const agrupadasPorDocId = funciones.reduce((acc, funcion) => {
              const nombreRol = mapFuncIdToNombreRol[funcion.funcId];
              (acc[funcion.docId] = acc[funcion.docId] || []).push({ ...funcion, nombreRol });
              return acc;
            }, {} as {[key: string]: any[]});
  
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

  cambiarRol(id: any,docId:any) {
    console.log('id: ',id);
    this.router.navigate([
      'asignarRol',
      id,docId
    ]);
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
}
