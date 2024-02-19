import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocenteService } from '../../services/docente/docente.service';
import { AlertSuccessComponent } from '../../alerts/alert-success/alert-success.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionService } from 'src/app/services/funcion/funcion.service';
import { SeleccionarCoordinadorComponent } from '../asignacion/seleccionar-coordinador/seleccionar-coordinador.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-asignacion-docente',
  templateUrl: './asignacion-docente.component.html',
  styleUrls: ['./asignacion-docente.component.css']
})
export class AsignacionDocenteComponent implements OnInit {
  id: any;
  rol: any;
  rolD: any;
  alumno: any = {};
  periodo: any = {};
  funcion: any = {};
  funcionActual: any = {};
  funciones: any[] = [];
  docId: any;
  evalId: number | undefined;
  docente: any = {};
  docentesACargo: any[] = [];
  rolSeleccionado: string = '';
  botonDesactivado = true;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private docenteService: DocenteService,
    private funcionService: FuncionService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.docId = params['docId'];
      this.findDatosDocente(this.docId);
      this.findByJefe(this.docId);
    });
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
  findDatosDocente(id: string) {
    this.findDocente(id);
    this.funcionService.findDocenteFuncion(id).subscribe(
      (data) => {
        this.funciones = data
        console.log('funciones', this.funciones);
        this.rol = this.funciones[0].funcion.rol;
        this.rolD = this.funciones[0].funcion.descripcion;
      },
      (error) => {
        console.error(error);
      }
    );

  }



  findByJefe(id: string) {
    this.docenteService.findByJefe(id).subscribe(
      (data) => {
        this.docentesACargo = data;
        console.log('docentsCargo', this.docentesACargo)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cambiarRolCoordinadorDocente() {
    this.docenteService.findByJefe(this.docId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          console.log('El coordinador tiene docentes a cargo.');
          this.router.navigate([
            'selectCoordinador',
            this.id,
            this.docId
          ]);
        } else {
          console.log('Cambiando el rol de coordinador a docente...');
          this.cambiarRol();
        }
      },
      (error) => {
        console.error('Error al buscar docentes a cargo del coordinador', error);
      }
    );
  }

  cambiarRol() {
        this.docenteService.cambiarEstadoDocenteFuncion(this.id).subscribe(
          (data) => {
            console.log('Estado cambiado', data);
            
          },
          (error) => {
            console.error(error);
          }
        )
        this.funcionActual.docId = this.docId;
        this.funcionActual.funcId = 'DOC-DOC';
        this.funcionActual.horas = '0'
        console.log('funcion', this.funcionActual);
        this.docenteService.crearDocentefuncion(this.funcionActual).subscribe(
          (data) => {
            this.funcion = data;
            console.log('creado', data);
            
          },
          (error) => {
            console.error(error);
          }
        );

    this.mensaje("Rol de coordinador a docente cambiado correctamente");
    this.router.navigate(['rolesAdmin']);
  }

  cambiarRolDocenteCoordinador() {
    this.funcionActual.docId = this.docId;
    this.funcionActual.funcId = this.rolSeleccionado;
    this.funcionActual.horas = '0'
    this.docenteService.crearDocentefuncion(this.funcionActual).subscribe(
      (data) => {
        this.funcion = data;
        console.log('creado', data);
        
      },
      (error) => {
        console.error(error);
      }
    );
    
    this.mensaje("Rol de docente a coordinador cambiado correctamente");
    this.router.navigate(['rolesAdmin']);
  }

  successModal(message: string) {
    const modalRef = this.modalService.open(AlertSuccessComponent);
    modalRef.componentInstance.message = message;
  }

  volver() {
    this.router.navigate(['rolesAdmin']);
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
