import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoService } from '../services/alumno/alumno.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  alumnoId: any;
  alumno: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.alumnoId = params['alumnoId'];
      this.findEstudiante(this.alumnoId);
    });
  }


  generarInforme() {
    const pdf = new jsPDF({ orientation: 'landscape' }); // Usa jsPDF.jsPDF en lugar de jsPDF
      // Agregar el título centrado y en negrita
      const titulo = 'UNIVERSIDAD DE LAS FUERZAS ARMADAS "ESPE"';
      const subtitulo = 'UNIDAD DE DESARROLLO EDUCATIVO';
      const fontSize = 16;
      const textWidth = pdf.getStringUnitWidth(titulo) * fontSize / pdf.internal.scaleFactor;
      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(fontSize);
      pdf.text( titulo,(pageWidth - textWidth) / 2, 20);
      const subtituloFontSize = 14;
      const subtituloTextWidth = pdf.getStringUnitWidth(subtitulo) * subtituloFontSize / pdf.internal.scaleFactor;

      pdf.setFontSize(subtituloFontSize);
      pdf.text( subtitulo,(pageWidth - subtituloTextWidth) / 2, 30);

      const parrafo = `El siguiente informe sobre la evaluación del desempeño docente, contiene la nota promedio de su evaluación, tomando en cuenta los cuatro componentes de la evaluación docente que son: Heteroevaluación, Evaluación por parte del Directivo, Coevaluación, y Autoevaluación; estratificadas por período académico, departamento y modalidad de estudios.`;
       const xPosition = 20;
       const yPosition = 40;
       const maxWidth = pageWidth - 2 * xPosition;
 
       pdf.setFont('helvetica', 'normal');
       pdf.setFontSize(12);
       pdf.text(parrafo, xPosition, yPosition, { maxWidth, align: 'justify' });
    
       const dataInfo = [
        [{ content: 'CÉDULA:', styles: { bold: true } }, { content: '1104520281' }],
        [{ content: 'ID:', styles: { bold: true } }, { content: 'L00083649' }],
        [{ content: 'NOMBRES:', styles: { bold: true } }, { content: 'SAAVEDRA GARCIA DIEGO' }],
        [{ content: 'CAMPUS:', styles: { bold: true } }, { content: 'ESPE MATRIZ SANGOLQUI' }],
        [{ content: 'DEPARTAMENTO:', styles: { bold: true } }, { content: 'CIENCIAS DE LA COMPUTACION' }],
        [{ content: 'ESCALAFÓN:', styles: { bold: true } }, { content: 'OCASIONAL 1' }],
      ];
/*
      autoTable(pdf,{
        startY: 80,
        head: [],
        body: [
          [{ content: 'CÉDULA:', styles: { bold: true } }, { content: '1104520281' }],
          [{ content: 'ID:', styles: { bold: true } }, { content: 'L00083649' }],
          [{ content: 'NOMBRES:', styles: { bold: true } }, { content: 'SAAVEDRA GARCIA DIEGO' }],
          [{ content: 'CAMPUS:', styles: { bold: true } }, { content: 'ESPE MATRIZ SANGOLQUI' }],
          [{ content: 'DEPARTAMENTO:', styles: { bold: true } }, { content: 'CIENCIAS DE LA COMPUTACION' }],
          [{ content: 'ESCALAFÓN:', styles: { bold: true } }, { content: 'OCASIONAL 1' }],
        ],
        theme: 'grid',
        styles: { fontSize: 10 },
        columnStyles: { 0: { cellWidth: 50 } }, // Ajustar el ancho de la primera columna
      });*/
    this.alumnoService.getAlumnoById(this.alumnoId).subscribe(
      (data) => {
        this.alumno = data;
      },
      (error) => {
        console.error(error);
      }
    );
    pdf.save('informe.pdf');
  }

  findEstudiante(id: number) {
    this.alumnoService.getAlumnoById(id).subscribe(
      (data) => {
        this.alumno = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
