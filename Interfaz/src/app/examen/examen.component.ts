import { Component, OnInit} from '@angular/core';

import { ExamenService } from '../examen.service';

import { Examen } from './examen.model';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})

export class ExamenComponent implements OnInit  {
  examenes: any[] = [];
  examen: any = {};

  constructor(private examenService: ExamenService) { }

  ngOnInit(): void {
    this.getAllExamenes();
}



  getAllExamenes() {
    this.examenService.getAllExamenes().subscribe(
      (data) => {
        this.examenes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verExamen(id: number) {
    this.examenService.getExamenById(id).subscribe(
      (data) => {
        this.examen = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editarExamen(id: number) {
    this.examenService.getExamenById(id).subscribe(
      (data) => {
        this.examen = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  guardarExamen() {
    if (this.examen && this.examen.id) {
      // Editar examen existente
      this.examenService.updateExamen(this.examen.id, this.examen).subscribe(
        (data) => {
          console.log('Examen actualizado:', data);
          this.resetForm();
          this.getAllExamenes();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // Crear nuevo examen
      if (this.examen) {
        this.examenService.createExamen(this.examen).subscribe(
          (data) => {
            console.log('Examen creado:', data);
            this.resetForm();
            this.getAllExamenes();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
  }
  
  
  eliminarExamen(id: number) {
    this.examenService.deleteExamen(id).subscribe(
      () => {
        console.log('Examen eliminado');
        this.getAllExamenes();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private resetForm() {
    this.examen ={};
  }
}
