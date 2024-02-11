import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente/docente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  periodo: any = {};
  id: any;
  eval: any = {};
  evalId: any;
  desactivado: any;

  constructor(
    private docenteService: DocenteService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];    
      this.evalId = params['evalId'];  
    });

    this.findByFechas();
    this.findDocente(atob(this.id));
    this.deshabilitarBoton();
  }

  findByFechas() {
    this.evaluacionService.findByFechas().subscribe(  
      (data) => {
        this.eval = data;
        this.evalId = this.eval.id;
        this.findPeriodo(this.eval.perId);
        this.findFunciones(atob(this.id));
      },
      (error) => {
        alert("Evaluación no se encuentra habilitada en estas fechas.")
        this.router.navigate(['periodo', this.id]);
      }
    );
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

  findDocente(id: string): any {
    this.docenteService.findById(id).subscribe(
      (data) => {
        this.docente = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deshabilitarBoton() {
    this.docenteService.findByEvaluacion(atob(this.id), atob(this.id), this.evalId).subscribe(
      (data) => {
        this.desactivado = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  evaluacion(id: any, formId: any, funcId: any) {
    this.router.navigate(['docentes-preguntas', id, id, formId, btoa(funcId), this.evalId]);
  }

  evaluacionPares() {  
    this.router.navigate(['evaluacion-pares', this.id, this.evalId]);
  }

  evaluacionDirectiva(funcId: string) {
    this.router.navigate(['evaluacion-directiva', this.id, btoa(funcId), this.evalId]);
  }

  generarInforme() {
    const pdf = new jsPDF({ orientation: 'landscape' }); // Usa jsPDF.jsPDF en lugar de jsPDF

    const logoUrl = '../../../assets/img/logo.png'; // Reemplaza 'url_de_tu_logo.jpg' con la URL o la ruta de tu imagen

    // Agregar el logo en la parte superior izquierda
    pdf.addImage(logoUrl, 'PNG', 10, 1, 45, 35); // Ajusta las coordenadas (10, 10) y el tamaño (50, 50) según tus necesidades

    // Agregar el título centrado y en negrita

    const titulo = 'UNIVERSIDAD DE LAS FUERZAS ARMADAS "ESPE"';
    const subtitulo = 'UNIDAD DE DESARROLLO EDUCATIVO';
    const fontSize = 16;
    const textWidth = pdf.getStringUnitWidth(titulo) * fontSize / pdf.internal.scaleFactor;
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSize);
    pdf.text(titulo, (pageWidth - textWidth) / 2, 20);
    const subtituloFontSize = 14;
    const subtituloTextWidth = pdf.getStringUnitWidth(subtitulo) * subtituloFontSize / pdf.internal.scaleFactor;

    pdf.setFontSize(subtituloFontSize);
    pdf.text(subtitulo, (pageWidth - subtituloTextWidth) / 2, 30);

    const parrafo = `El siguiente informe sobre la evaluación del desempeño docente, contiene la nota promedio de su evaluación, tomando en cuenta los cuatro componentes de la evaluación docente que son: Heteroevaluación, Evaluación por parte del Directivo, Coevaluación, y Autoevaluación; estratificadas por período académico, departamento y modalidad de estudios.`;
    const xPosition = 20;
    const yPosition = 40;
    const maxWidth = pageWidth - 2 * xPosition;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(parrafo, xPosition, yPosition, { maxWidth, align: 'justify' });

    // Ajustes para que la tabla se ajuste en la hoja
    const anchoPagina = pdf.internal.pageSize.getWidth();

    autoTable(pdf, {
      startY: 60,
      head: [],
      body: [
        [
          { content: 'CÉDULA:', styles: { fontStyle: 'bold' } },
          this.docente.cedula,
          { content: 'CAMPUS:', styles: { fontStyle: 'bold' } },
          this.docente.campus,
        ],
        [
          { content: 'ID:', styles: { fontStyle: 'bold' } },
          this.docente.id,
          { content: 'DEPARTAMENTO:', styles: { fontStyle: 'bold' } },
          this.docente.departamento,
        ],
        [
          { content: 'NOMBRES:', styles: { fontStyle: 'bold' } },
          this.docente.apellidos + " " + this.docente.nombres,
          { content: 'ESCALAFÓN:', styles: { fontStyle: 'bold' } },
          this.docente.escalafon,
        ],
      ],
      theme: 'plain', // Cambiado a 'plain' para quitar bordes
      styles: { fontSize: 10 },
      margin: { top: 5 },
      tableWidth: 'auto', // Deja que la tabla se ajuste automáticamente al ancho de la página
      columnStyles: {
        0: { cellWidth: 30 }, // Ajusta los anchos de columna según tus necesidades
        1: { halign: 'left', cellWidth: 70 },
        2: { cellWidth: 40 },
        3: { halign: 'left', cellWidth: 60 },
      },

      didDrawPage: (data) => {
        const columnWidths = data.table?.columns.map((col) => col.width) || [];
        const tableWidth = columnWidths.reduce((total, width) => total + (width || 0), 0);

        if (tableWidth > anchoPagina && data.settings && data.settings.margin) {
          data.settings.margin.top += 10; // Incrementa el margen superior si la tabla es más ancha que la página

          if (data.cursor && data.settings.margin) {
            data.cursor.y = data.settings.margin.top;

            // Ajusta la alineación de las celdas en las columnas 2 y 4
            data.table.body.forEach((row) => {
              row.cells[1].styles.halign = 'left'; // Ajusta la alineación horizontal de la columna 2 a la izquierda
              row.cells[3].styles.halign = 'left'; // Ajusta la alineación horizontal de la columna 4 a la izquierda
            });
          }
        }
      }

    });

    const textoCalificaciones = `Calificaciones por período académico y promedio integral por :`;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text(textoCalificaciones, 20, 90, { maxWidth, align: 'justify' });

    const tituloIntermedio = 'EVALUACIÓN DOCENTE - PONDERACIÓN POR ACTIVIDAD 202350';
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    const tituloIntermedioTextWidth = pdf.getStringUnitWidth(tituloIntermedio) * 14 / pdf.internal.scaleFactor;

    pdf.text(tituloIntermedio, (pageWidth - tituloIntermedioTextWidth) / 2, 100);

    var horasDoc = this.funciones.find(func => func.funcId === 'DOC');
    var horasInv = this.funciones.find(func => func.funcId === 'INV');
    var horasGes = this.funciones.find(func => func.funcId === 'GES');

    if(horasDoc == null) {
      horasDoc = 0;
    } else {
      horasDoc = horasDoc.horas;
    }

    if(horasInv  == null) {
      horasInv = 0;
    } else {
      horasInv = horasInv.horas;
    }

    if(horasGes  == null) {
      horasGes = 0;
    } else {
      horasGes = horasGes.horas;
    }

    autoTable(pdf, {
      startY: 110,
      head: [
        [
          { content: 'DOCENCIA', colSpan: 2, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } },
          { content: 'INVESTIGACIÓN', colSpan: 2, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } },
          { content: 'GESTIÓN', colSpan: 2, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } },
          { content: 'EVALUACION INTEGRAL DOCENTE', colSpan: 2, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } }
        ]
      ], // Fila 1 con 8 columnas
      body: [
        [
          { content: 'Horas' },
          { content: 'Ponderación' },
          { content: 'Horas' },
          { content: 'Ponderación' },
          { content: 'Horas' },
          { content: 'Ponderación' },
          { content: 'valor', colSpan: 2 }
        ],
        [
          { content: horasDoc },
          { content: '' },
          { content: horasInv },
          { content: '' },
          { content: horasGes },
          { content: '' },
          { content: '', colSpan: 2 }
        ]
      ],
      theme: 'grid', // Cambiado a 'plain' para quitar bordes
      styles: { fontSize: 10 },
      tableWidth: 'auto', // Ajustar automáticamente al ancho de la página
      pageBreak: 'auto',// 
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 40 },
        5: { cellWidth: 40 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 }
      }
    });


    autoTable(pdf, {
      startY: 140,
      head: [
        [
          { content: 'EVALUACIÓN ACTIVIDAD DOCENCIA ', colSpan: 4, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } },
          { content: 'EVALUACIÓN ACTIVIDAD INVESTIGACIÓN', colSpan: 3, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } },
          { content: 'EVALUACIÓN ACTIVIDAD GESTIÓN', colSpan: 2, styles: { fillColor: [0, 130, 90], fontStyle: 'bold', textColor: [255, 255, 255] } },
        ]
      ], // Fila 1 con 8 columnas
      body: [
        [
          { content: 'AUTO EVALUACIÓN 10 %' },
          { content: 'HETERO EVALUACIÓN 35 %' },
          { content: 'COEVALUACION PARES 30 %' },
          { content: 'COEVALUACION DIRECTIVA 25 %' },
          { content: 'AUTO EVALUACIÓN 10 %' },
          { content: 'COEVALUACION PARES 40 %' },
          { content: 'COEVALUACION DIRECTIVA 50 %' },
          { content: 'AUTO EVALUACIÓN 40 %' },
          { content: 'COEVALUACION DIRECTIVA 60 %' }
        ],
        [
          { content: '' },
          { content: '' },
          { content: '' },
          { content: '' },
          { content: '' },
          { content: '' },
          { content: '' },
          { content: '' },
          { content: '' }
        ],
        [
          { content: 'PORCENTAJE 100% ', colSpan: 2 , styles: { fontStyle: 'bold' }},
          { content: '', colSpan: 2 },
          { content: 'PORCENTAJE 100%', colSpan: 2 , styles: { fontStyle: 'bold' }},
          { content: '' },
          { content: 'PORCENTAJE 100%' , styles: { fontStyle: 'bold' }},
          { content: '' },
        ]

      ],
      theme: 'grid', // Cambiado a 'plain' para quitar bordes
      styles: { fontSize: 9 },
      tableWidth: 'auto', // Ajustar automáticamente al ancho de la página
      pageBreak: 'auto',// 
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 25 },
        8: { cellWidth: 25 }
      }
    });
    pdf.save('informe.pdf');
  }
}
