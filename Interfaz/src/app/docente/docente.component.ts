import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/Docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  docentes: any[] = [];
  docente: any = {};
  funciones: any[] = [];
  funcion: any = {};
  id: any;

  constructor(
    private docenteService: DocenteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.findFunciones(atob(this.id));
    });
  }

  findFunciones(id: string) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.funciones = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any, formId: any, funcId: any) {  
    this.router.navigate(['docentes-preguntas', id, formId, btoa(funcId)]);
  }
}
