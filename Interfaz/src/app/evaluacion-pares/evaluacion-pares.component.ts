import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion-pares',
  templateUrl: './evaluacion-pares.component.html',
  styleUrls: ['./evaluacion-pares.component.css']
})
export class EvaluacionParesComponent implements OnInit {
  docentes: any[] = [];
  docente: any = {};
  id: any;
  idJefe: any;
  evalId: any;
  desactivado: any;

  constructor(
    private docenteService: DocenteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
      this.findByJefe(atob(this.id));
    });
  }

  findByJefe(id: string) {
    this.docenteService.findByJefe(id).subscribe(
      (data) => {
        this.docentes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any, formId: any, funcId: any) {
    this.router.navigate(['docentes-preguntas', this.id, btoa(id), formId, btoa(funcId), this.evalId]);
  }

  volver() {
    this.router.navigate(['docentes', this.id, this.evalId]);
  }
}