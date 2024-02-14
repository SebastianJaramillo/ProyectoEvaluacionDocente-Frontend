import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DocenteService } from '../services/docente/docente.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { Observable } from 'rxjs';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  id: any;
  evalId: any;
  docente: any = {};
  periodo: any = {};
  periodos: any[] = [];
  perId: any;
  docFunciones: any[] = [];

  respHetDoc: any[] = [];
  respAutDoc: any[] = [];
  respParDoc: any[] = [];
  respDirDoc: any[] = [];

  respAutInv: any[] = [];
  respParInv: any[] = [];
  respDirInv: any[] = [];

  respAutGes: any[] = [];
  respDirGes: any[] = [];

  respAutVin: any[] = [];
  respParVin: any[] = [];
  respDirVin: any[] = [];

  horasDocencia: 0 = 0;
  horasInvestigacion: 0 = 0;
  horasGestion: 0 = 0;
  horasVinculacion: 0 = 0;

  totalHetDoc: number = 0;
  totalAutDoc: number = 0;
  totalParDoc: number = 0;
  totalDirDoc: number = 0;

  totalAutInv: number = 0;
  totalParInv: number = 0;
  totalDirInv: number = 0;

  totalAutGes: number = 0;
  totalDirGes: number = 0;

  totalAutVin: number = 0;
  totalParVin: number = 0;
  totalDirVin: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formularioService: FormularioService,
    private evaluacionService: EvaluacionService,
    private docenteService: DocenteService
  ) {}
  ngOnInit(): void {
    this.perId = 1;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.evalId = params['evalId'];
    });

    this.findDocente(atob(this.id));
    this.getAllPeriodos();
    this.findFunciones(atob(this.id));
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

  findFunciones(id: string) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.docFunciones = data;
        this.docFunciones.forEach((item) => {
          switch (item.funcion.descripcion) {
            case 'Docencia':
              this.horasDocencia += item.horas;
              break;
            case 'Vinculacion':
              this.horasVinculacion += item.horas;
              break;
            case 'Gestion':
              this.horasGestion += item.horas;
              break;
            case 'Investigacion':
              this.horasInvestigacion += item.horas;
              break;
            default:
              console.log('No se encontró función');
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllPeriodos() {
    this.evaluacionService.getAllPeriodos().subscribe(
      (data) => {
        this.periodos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  volver() {
    this.router.navigate(['docentes', this.id, this.evalId]);
  }

  findRespuestas(
    preId: any,
    docEvaluado: any,
    evalId: number
  ): Observable<any> {
    return this.formularioService.resultados(preId, docEvaluado, evalId);
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

  generarInforme() {
    this.findPeriodo(this.perId);

    const pdf = new jsPDF({ orientation: 'landscape' });

    const logoUrl = '../../../assets/img/logo.png';

    pdf.addImage(logoUrl, 'PNG', 10, 1, 45, 35);

    const titulo = 'UNIVERSIDAD DE LAS FUERZAS ARMADAS "ESPE"';
    const subtitulo = 'UNIDAD DE DESARROLLO EDUCATIVO';
    const fontSize = 16;
    const textWidth =
      (pdf.getStringUnitWidth(titulo) * fontSize) / pdf.internal.scaleFactor;
    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(fontSize);
    pdf.text(titulo, (pageWidth - textWidth) / 2, 20);
    const subtituloFontSize = 14;
    const subtituloTextWidth =
      (pdf.getStringUnitWidth(subtitulo) * subtituloFontSize) /
      pdf.internal.scaleFactor;

    pdf.setFontSize(subtituloFontSize);
    pdf.text(subtitulo, (pageWidth - subtituloTextWidth) / 2, 30);

    const parrafo = `El siguiente informe sobre la evaluación del desempeño docente, contiene la nota promedio de su evaluación, tomando en cuenta los cuatro componentes de la evaluación docente que son: Heteroevaluación, Evaluación por parte del Directivo, Coevaluación, y Autoevaluación; estratificadas por período académico, departamento y modalidad de estudios.`;
    const xPosition = 20;
    const yPosition = 40;
    const maxWidth = pageWidth - 2 * xPosition;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.text(parrafo, xPosition, yPosition, { maxWidth, align: 'justify' });

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
          this.docente.apellidos + ' ' + this.docente.nombres,
          { content: 'ESCALAFÓN:', styles: { fontStyle: 'bold' } },
          this.docente.escalafon,
        ],
      ],
      theme: 'plain',
      styles: { fontSize: 10 },
      margin: { top: 5 },
      tableWidth: 'auto',
      columnStyles: {
        0: { cellWidth: 30 },
        1: { halign: 'left', cellWidth: 70 },
        2: { cellWidth: 40 },
        3: { halign: 'left', cellWidth: 60 },
      },

      didDrawPage: (data) => {
        const columnWidths = data.table?.columns.map((col) => col.width) || [];
        const tableWidth = columnWidths.reduce(
          (total, width) => total + (width || 0),
          0
        );

        if (tableWidth > anchoPagina && data.settings && data.settings.margin) {
          data.settings.margin.top += 10;

          if (data.cursor && data.settings.margin) {
            data.cursor.y = data.settings.margin.top;

            data.table.body.forEach((row) => {
              row.cells[1].styles.halign = 'left';
              row.cells[3].styles.halign = 'left';
            });
          }
        }
      },
    });

    const textoCalificaciones = `Calificaciones por período académico y promedio integral por componente:`;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text(textoCalificaciones, 20, 90, { maxWidth, align: 'justify' });

    const tituloIntermedio = 'EVALUACIÓN DOCENTE - PONDERACIÓN POR ACTIVIDAD';
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    const tituloIntermedioTextWidth =
      (pdf.getStringUnitWidth(tituloIntermedio) * 14) /
      pdf.internal.scaleFactor;

    pdf.text(
      tituloIntermedio,
      (pageWidth - tituloIntermedioTextWidth) / 2,
      100
    );

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text('PERIODO: ' + this.periodo.descripcion, 20, 107, {
      maxWidth,
      align: 'justify',
    });

    this.findRespuestas('HET', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respHetDoc = data;

        this.totalHetDoc = 0;

        this.respHetDoc.forEach((resp) => {
          this.totalHetDoc += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('AD', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respAutDoc = data;

        this.totalAutDoc = 0;

        this.respAutDoc.forEach((resp) => {
          this.totalAutDoc += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('CD', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respParDoc = data;

        this.totalParDoc = 0;

        this.respParDoc.forEach((resp) => {
          this.totalParDoc += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('DD', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respDirDoc = data;

        this.totalDirDoc = 0;

        this.respDirDoc.forEach((resp) => {
          this.totalDirDoc += parseInt(resp.texto);
        });
      }
    );

    let notaAutDoc = 0;
    let notaHetDoc = 0;
    let notaParDoc = 0;
    let notaDirDoc = 0;

    if (this.respHetDoc.length <= 0) {
      notaHetDoc = 0;
    } else {
      notaHetDoc = (this.totalHetDoc * 10) / (this.respHetDoc.length * 5);
    }

    if (this.respAutDoc.length <= 0) {
      notaAutDoc = 0;
    } else {
      notaAutDoc = (this.totalAutDoc * 10) / (this.respAutDoc.length * 5);
    }

    if (this.respParDoc.length <= 0) {
      notaParDoc = 0;
    } else {
      notaParDoc = (this.totalParDoc * 10) / (this.respParDoc.length * 5);
    }

    if (this.respDirDoc.length <= 0) {
      notaDirDoc = 0;
    } else {
      notaDirDoc = (this.totalDirDoc * 10) / (this.respDirDoc.length * 5);
    }

    this.findRespuestas('AI', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respAutInv = data;

        this.totalAutInv = 0;

        this.respAutInv.forEach((resp) => {
          this.totalAutInv += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('CI', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respParInv = data;

        this.totalParInv = 0;

        this.respParInv.forEach((resp) => {
          this.totalParInv += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('DI', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respDirInv = data;

        this.totalDirInv = 0;

        this.respDirInv.forEach((resp) => {
          this.totalDirInv += parseInt(resp.texto);
        });
      }
    );

    let notaAutInv = 0;
    let notaParInv = 0;
    let notaDirInv = 0;

    if (this.respAutInv.length <= 0) {
      notaAutInv = 0;
    } else {
      notaAutInv = (this.totalAutInv * 10) / (this.respAutInv.length * 5);
    }

    if (this.respParInv.length <= 0) {
      notaParInv = 0;
    } else {
      notaParInv = (this.totalParInv * 10) / (this.respParInv.length * 5);
    }

    if (this.respDirInv.length <= 0) {
      notaDirInv = 0;
    } else {
      notaDirInv = (this.totalDirInv * 10) / (this.respDirInv.length * 5);
    }

    this.findRespuestas('AG', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respAutGes = data;

        this.totalAutGes = 0;

        this.respAutGes.forEach((resp) => {
          this.totalAutGes += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('DG', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respDirGes = data;

        this.totalDirGes = 0;

        this.respDirGes.forEach((resp) => {
          this.totalDirGes += parseInt(resp.texto);
        });
      }
    );

    let notaAutGes = 0;
    let notaDirGes = 0;

    if (this.respAutGes.length <= 0) {
      notaAutGes = 0;
    } else {
      notaAutGes = (this.totalAutGes * 10) / (this.respAutGes.length * 5);
    }

    if (this.respDirGes.length <= 0) {
      notaDirGes = 0;
    } else {
      notaDirGes = (this.totalDirGes * 10) / (this.respDirGes.length * 5);
    }

    this.findRespuestas('AV', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respAutVin = data;

        this.totalAutVin = 0;

        this.respAutVin.forEach((resp) => {
          this.totalAutVin += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('CV', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respParVin = data;

        this.totalParVin = 0;

        this.respParVin.forEach((resp) => {
          this.totalParVin += parseInt(resp.texto);
        });
      }
    );

    this.findRespuestas('DV', this.docente.id, this.evalId).subscribe(
      (data) => {
        this.respDirVin = data;

        this.totalDirVin = 0;

        this.respDirVin.forEach((resp) => {
          this.totalDirVin += parseInt(resp.texto);
        });
      }
    );

    let notaAutVin = 0;
    let notaParVin = 0;
    let notaDirVin = 0;

    if (this.respAutVin.length <= 0) {
      notaAutVin = 0;
    } else {
      notaAutVin = (this.totalAutVin * 10) / (this.respAutVin.length * 5);
    }

    if (this.respParVin.length <= 0) {
      notaParVin = 0;
    } else {
      notaParVin = (this.totalParVin * 10) / (this.respParVin.length * 5);
    }

    if (this.respDirVin.length <= 0) {
      notaDirVin = 0;
    } else {
      notaDirVin = (this.totalDirVin * 10) / (this.respDirVin.length * 5);
    }

    let totalDocencia = notaAutDoc / 10 + (notaHetDoc * 3.5) / 10 + (notaParDoc * 3) / 10 + (notaDirDoc * 2.5) / 10;
    let totalInvestigacion = notaAutInv / 10 + (notaParInv * 4) / 10 + (notaDirInv * 5) / 10;
    let totalGestion = (notaAutGes * 4) / 10 + (notaDirGes * 6) / 10;
    let totalVinculacion = notaAutVin / 10 + (notaParVin * 4) / 10 + (notaDirVin * 5) / 10;

    let totalFinal = 0;

    if(this.horasDocencia > 0 && this.horasInvestigacion > 0 && this.horasGestion > 0 && this.horasVinculacion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalInvestigacion*1.5)/10) + ((totalVinculacion*1.5)/10) + (totalGestion/10);
    } 
    else if(this.horasDocencia > 0 && this.horasInvestigacion > 0 && this.horasVinculacion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalInvestigacion*2)/10) + ((totalVinculacion*2)/10);
    }
    else if(this.horasDocencia > 0 && this.horasVinculacion > 0 && this.horasGestion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalInvestigacion*2)/10) + ((totalGestion*2)/10);
    }
    else if(this.horasDocencia > 0 && this.horasGestion > 0 && this.horasVinculacion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalVinculacion*2)/10) + ((totalGestion*2)/10);
    }
    else if(this.horasDocencia > 0 && this.horasInvestigacion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalInvestigacion*4)/10);
    }
    else if(this.horasDocencia > 0 && this.horasVinculacion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalVinculacion*4)/10);
    }
    else if(this.horasDocencia > 0 && this.horasGestion > 0) {
      totalFinal = ((totalDocencia*6)/10) + ((totalGestion*4)/10);
    }
    else if(this.horasDocencia > 0 ) {
      totalFinal = totalDocencia;
    }
    else if(this.horasVinculacion > 0 ) {
      totalFinal = totalVinculacion;
    }
    else if(this.horasGestion > 0 ) {
      totalFinal = totalGestion;
    }
    else if(this.horasInvestigacion > 0 ) {
      totalFinal = totalInvestigacion;
    }

    autoTable(pdf, {
      startY: 110,
      margin: { left: 15 },
      head: [
        [
          {
            content: 'DOCENCIA',
            colSpan: 2,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
            },
          },
          {
            content: 'INVESTIGACIÓN',
            colSpan: 2,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
            },
          },
          {
            content: 'GESTIÓN',
            colSpan: 2,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
            },
          },
          {
            content: 'VINCULACIÓN',
            colSpan: 2,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
            },
          },
          {
            content: 'EVALUACIÓN INTEGRAL DOCENTE',
            colSpan: 2,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
            },
          },
        ],
      ],
      body: [
        [
          { content: 'Horas', styles: { fontStyle: 'bold', halign: 'center' } },
          {
            content: 'Ponderación',
            styles: { fontStyle: 'bold', halign: 'center' },
          },
          { content: 'Horas', styles: { fontStyle: 'bold', halign: 'center' } },
          {
            content: 'Ponderación',
            styles: { fontStyle: 'bold', halign: 'center' },
          },
          { content: 'Horas', styles: { fontStyle: 'bold', halign: 'center' } },
          {
            content: 'Ponderación',
            styles: { fontStyle: 'bold', halign: 'center' },
          },
          { content: 'Horas', styles: { fontStyle: 'bold', halign: 'center' } },
          {
            content: 'Ponderación',
            styles: { fontStyle: 'bold', halign: 'center' },
          },
          {
            content: 'Total',
            colSpan: 2,
            styles: { fontStyle: 'bold', halign: 'center' },
          },
        ],
        [
          { content: this.horasDocencia, styles: { halign: 'center' } },
          {
            content: totalDocencia,
            styles: { halign: 'center' },
          },
          { content: this.horasInvestigacion, styles: { halign: 'center' } },
          {
            content: totalInvestigacion,
            styles: { halign: 'center' },
          },
          { content: this.horasGestion, styles: { halign: 'center' } },
          {
            content: totalGestion,
            styles: { halign: 'center' },
          },
          { content: this.horasVinculacion, styles: { halign: 'center' } },
          {
            content: totalVinculacion,
            styles: { halign: 'center' },
          },
          { content: totalFinal, colSpan: 2, styles: { fontStyle: 'bold', halign: 'center', fontSize: 10} },
        ],
      ],
      theme: 'grid',
      styles: { fontSize: 9 },
      tableWidth: 'auto',
      pageBreak: 'auto',
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 },
        7: { cellWidth: 25 },
        8: { cellWidth: 25 },
        9: { cellWidth: 25 },
      },
    });

    autoTable(pdf, {
      startY: 140,
      margin: { left: 5 },
      head: [
        [
          {
            content: 'EVALUACIÓN ACTIVIDAD DOCENCIA',
            colSpan: 4,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
              fontSize: 8,
            },
          },
          {
            content: 'EVALUACIÓN ACTIVIDAD INVESTIGACIÓN',
            colSpan: 3,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
              fontSize: 8,
            },
          },
          {
            content: 'EVALUACIÓN ACTIVIDAD GESTIÓN',
            colSpan: 2,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
              fontSize: 8,
            },
          },
          {
            content: 'EVALUACIÓN ACTIVIDAD VINCULACIÓN',
            colSpan: 3,
            styles: {
              fillColor: [0, 130, 90],
              fontStyle: 'bold',
              textColor: [255, 255, 255],
              halign: 'center',
              fontSize: 8,
            },
          },
        ],
      ],
      body: [
        [
          { content: 'AUTO\nEVALUACIÓN\n10 %', styles: { halign: 'center' } },
          { content: 'HETERO\nEVALUACIÓN\n35 %', styles: { halign: 'center' } },
          {
            content: 'COEVALUACION\nPARES\n30 %',
            styles: { halign: 'center' },
          },
          {
            content: 'COEVALUACION\nDIRECTIVA\n25 %',
            styles: { halign: 'center' },
          },
          { content: 'AUTO\nEVALUACIÓN\n10 %', styles: { halign: 'center' } },
          {
            content: 'COEVALUACION\nPARES\n40 %',
            styles: { halign: 'center' },
          },
          {
            content: 'COEVALUACION\nDIRECTIVA\n50 %',
            styles: { halign: 'center' },
          },
          { content: 'AUTO\nEVALUACIÓN\n40 %', styles: { halign: 'center' } },
          {
            content: 'COEVALUACION\nDIRECTIVA\n60 %',
            styles: { halign: 'center' },
          },
          { content: 'AUTO\nEVALUACIÓN\n10 %', styles: { halign: 'center' } },
          {
            content: 'COEVALUACION\nPARES\n40 %',
            styles: { halign: 'center' },
          },
          {
            content: 'COEVALUACION\nDIRECTIVA\n50 %',
            styles: { halign: 'center' },
          },
        ],
        [
          { content: notaAutDoc, styles: { fontSize: 9, halign: 'center' } },
          { content: notaHetDoc, styles: { fontSize: 9, halign: 'center' } },
          { content: notaParDoc, styles: { fontSize: 9, halign: 'center' } },
          { content: notaDirDoc, styles: { fontSize: 9, halign: 'center' } },
          { content: notaAutInv, styles: { fontSize: 9, halign: 'center' } },
          { content: notaParInv, styles: { fontSize: 9, halign: 'center' } },
          { content: notaDirInv, styles: { fontSize: 9, halign: 'center' } },
          { content: notaAutGes, styles: { fontSize: 9, halign: 'center' } },
          { content: notaDirGes, styles: { fontSize: 9, halign: 'center' } },
          { content: notaAutVin, styles: { fontSize: 9, halign: 'center' } },
          { content: notaParVin, styles: { fontSize: 9, halign: 'center' } },
          { content: notaDirVin, styles: { fontSize: 9, halign: 'center' } },
        ],
        [
          {
            content: 'PORCENTAJE\n100%',
            colSpan: 2,
            styles: { fontStyle: 'bold', halign: 'center' },
          },
          {
            content: totalDocencia,
            colSpan: 2,
            styles: { halign: 'center', fontSize: 9 },
          },
          {
            content: 'PORCENTAJE\n100%',
            colSpan: 2,
            styles: { halign: 'center' },
          },
          {
            content: totalInvestigacion,
            styles: { halign: 'center', fontSize: 9 },
          },
          {
            content: 'PORCENTAJE\n100%',
            styles: { halign: 'center' },
          },
          {
            content: totalGestion,
            styles: { halign: 'center', fontSize: 9 },
          },
          {
            content: 'PORCENTAJE\n100%',
            colSpan: 2,
            styles: { halign: 'center' },
          },
          {
            content: totalVinculacion,
            styles: { halign: 'center', fontSize: 9 },
          },
        ],
      ],
      theme: 'grid',
      styles: { fontSize: 7 },
      tableWidth: 'auto',
      pageBreak: 'auto',
      columnStyles: {
        0: { cellWidth: 24 },
        1: { cellWidth: 24 },
        2: { cellWidth: 24 },
        3: { cellWidth: 24 },
        4: { cellWidth: 24 },
        5: { cellWidth: 24 },
        6: { cellWidth: 24 },
        7: { cellWidth: 24 },
        8: { cellWidth: 24 },
        9: { cellWidth: 24 },
        10: { cellWidth: 24 },
        11: { cellWidth: 24 },
        12: { cellWidth: 24 },
      },
    });

    pdf.save('EVALUACION_DETALLE_IND.pdf');
  }
}
