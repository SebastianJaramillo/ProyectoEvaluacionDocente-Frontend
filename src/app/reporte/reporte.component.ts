import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DocenteService } from '../services/docente/docente.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { Observable } from 'rxjs';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import * as XLSX from 'xlsx';

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
  docentes: any[] = [];
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

  notaAutDoc = 0;
  notaHetDoc = 0;
  notaParDoc = 0;
  notaDirDoc = 0;

  notaAutInv = 0;
  notaParInv = 0;
  notaDirInv = 0;

  notaAutGes = 0;
  notaDirGes = 0;

  notaAutVin = 0;
  notaParVin = 0;
  notaDirVin = 0;

  totalDocencia = 0;
  totalGestion = 0;
  totalInvestigacion = 0;
  totalVinculacion = 0;

  totalDocenciaPonderacion = 0;
  totalGestionPonderacion = 0;
  totalInvestigacionPonderacion = 0;
  totalVinculacionPonderacion = 0;

  totalFinal = 0;

  constructor(
    private route: ActivatedRoute,
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
    this.listarDocentes();
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
    this.horasGestion = 0;
    this.horasDocencia = 0;
    this.horasInvestigacion = 0;
    this.horasVinculacion = 0;

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

  listarDocentes() {
    this.docenteService.findAllDocente().subscribe(
      (data) => {
        this.docentes = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async generarInforme() {
    await this.findFunciones(atob(this.id));
    
    await this.findPeriodo(this.perId);    

    await this.sleep(100);

    await this.calculos(this.docente.id);

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
            content: Number(this.totalDocenciaPonderacion.toFixed(2)),
            styles: { halign: 'center' },
          },
          { content: this.horasInvestigacion, styles: { halign: 'center' } },
          {
            content: Number(this.totalInvestigacionPonderacion.toFixed(2)),
            styles: { halign: 'center' },
          },
          { content: this.horasGestion, styles: { halign: 'center' } },
          {
            content: Number(this.totalGestionPonderacion.toFixed(2)),
            styles: { halign: 'center' },
          },
          { content: this.horasVinculacion, styles: { halign: 'center' } },
          {
            content: Number(this.totalVinculacionPonderacion.toFixed(2)),
            styles: { halign: 'center' },
          },
          {
            content: Number(this.totalFinal.toFixed(2)),
            colSpan: 2,
            styles: { fontStyle: 'bold', halign: 'center', fontSize: 10 },
          },
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
          {
            content: Number(this.notaAutDoc.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaHetDoc.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaParDoc.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaDirDoc.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaAutInv.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaParInv.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaDirInv.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaAutGes.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaDirGes.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaAutVin.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaParVin.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
          {
            content: Number(this.notaDirVin.toFixed(2)),
            styles: { fontSize: 9, halign: 'center' },
          },
        ],
        [
          {
            content: 'PORCENTAJE\n100%',
            colSpan: 2,
            styles: { fontStyle: 'bold', halign: 'center' },
          },
          {
            content: Number(this.totalDocencia.toFixed(2)),
            colSpan: 2,
            styles: { halign: 'center', fontSize: 9 },
          },
          {
            content: 'PORCENTAJE\n100%',
            colSpan: 2,
            styles: { halign: 'center' },
          },
          {
            content: Number(this.totalInvestigacion.toFixed(2)),
            styles: { halign: 'center', fontSize: 9 },
          },
          {
            content: 'PORCENTAJE\n100%',
            styles: { halign: 'center' },
          },
          {
            content: Number(this.totalGestion.toFixed(2)),
            styles: { halign: 'center', fontSize: 9 },
          },
          {
            content: 'PORCENTAJE\n100%',
            colSpan: 2,
            styles: { halign: 'center' },
          },
          {
            content: Number(this.totalVinculacion.toFixed(2)),
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

  async generarInformeGlobal() {
    await this.findPeriodo(this.perId);

    await this.sleep(100);

    var datos: any[] = [];

    this.docentes.forEach((item) => {      
      this.findFunciones(item.id);

      this.calculos(item.id);
      
      const registro = {
        DOCENTE: item.apellidos + ' ' + item.nombres,
        'HORAS DOCENCIA': this.horasDocencia,
        "NOTA DOCENCIA": this.totalDocencia,
        'HORAS INVESTIGACION': this.horasInvestigacion,
        "NOTA INVESTIGACION": this.totalInvestigacion,
        'HORAS GESTION': this.horasGestion,
        "NOTA GESTION": this.totalGestion,
        'HORAS VINCULACION': this.horasVinculacion,
        "NOTA VINCULACION": this.totalVinculacion,
        'NOTA FINAL': this.totalFinal,
      };      
      datos.push(registro);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'EVALUACION DOCENTE');
    XLSX.writeFile(wb, 'REPORTE GLOBAL_' + this.periodo.descripcion + '.xlsx');
  }

  async calculos(docId: string) {
    this.findRespuestas('HET', docId, this.evalId).subscribe((data) => {
      this.respHetDoc = data;

      this.totalHetDoc = 0;

      this.respHetDoc.forEach((resp) => {
        this.totalHetDoc += parseInt(resp.texto);
      });
    });

    this.findRespuestas('AD', docId, this.evalId).subscribe((data) => {
      this.respAutDoc = data;

      this.totalAutDoc = 0;

      this.respAutDoc.forEach((resp) => {
        this.totalAutDoc += parseInt(resp.texto);
      });
    });

    this.findRespuestas('CD', docId, this.evalId).subscribe((data) => {
      this.respParDoc = data;

      this.totalParDoc = 0;

      this.respParDoc.forEach((resp) => {
        this.totalParDoc += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DD', docId, this.evalId).subscribe((data) => {
      this.respDirDoc = data;

      this.totalDirDoc = 0;

      this.respDirDoc.forEach((resp) => {
        this.totalDirDoc += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    this.notaAutDoc = 0;
    this.notaHetDoc = 0;
    this.notaParDoc = 0;
    this.notaDirDoc = 0;

    if (this.respHetDoc.length <= 0) {
      this.notaHetDoc = 0;
    } else {
      this.notaHetDoc = (this.totalHetDoc * 10) / (this.respHetDoc.length * 5);
    }

    if (this.respAutDoc.length <= 0) {
      this.notaAutDoc = 0;
    } else {
      this.notaAutDoc = (this.totalAutDoc * 10) / (this.respAutDoc.length * 5);
    }

    if (this.respParDoc.length <= 0) {
      this.notaParDoc = 0;
    } else {
      this.notaParDoc = (this.totalParDoc * 10) / (this.respParDoc.length * 5);
    }

    if (this.respDirDoc.length <= 0) {
      this.notaDirDoc = 0;
    } else {
      this.notaDirDoc = (this.totalDirDoc * 10) / (this.respDirDoc.length * 5);
    }

    this.findRespuestas('AI', docId, this.evalId).subscribe((data) => {
      this.respAutInv = data;

      this.totalAutInv = 0;

      this.respAutInv.forEach((resp) => {
        this.totalAutInv += parseInt(resp.texto);
      });
    });

    this.findRespuestas('CI', docId, this.evalId).subscribe((data) => {
      this.respParInv = data;

      this.totalParInv = 0;

      this.respParInv.forEach((resp) => {
        this.totalParInv += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DI', docId, this.evalId).subscribe((data) => {
      this.respDirInv = data;

      this.totalDirInv = 0;

      this.respDirInv.forEach((resp) => {
        this.totalDirInv += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    this.notaAutInv = 0;
    this.notaParInv = 0;
    this.notaDirInv = 0;

    if (this.respAutInv.length <= 0) {
      this.notaAutInv = 0;
    } else {
      this.notaAutInv = (this.totalAutInv * 10) / (this.respAutInv.length * 5);
    }

    if (this.respParInv.length <= 0) {
      this.notaParInv = 0;
    } else {
      this.notaParInv = (this.totalParInv * 10) / (this.respParInv.length * 5);
    }

    if (this.respDirInv.length <= 0) {
      this.notaDirInv = 0;
    } else {
      this.notaDirInv = (this.totalDirInv * 10) / (this.respDirInv.length * 5);
    }

    this.findRespuestas('AG', docId, this.evalId).subscribe((data) => {
      this.respAutGes = data;

      this.totalAutGes = 0;

      this.respAutGes.forEach((resp) => {
        this.totalAutGes += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DG', docId, this.evalId).subscribe((data) => {
      this.respDirGes = data;

      this.totalDirGes = 0;

      this.respDirGes.forEach((resp) => {
        this.totalDirGes += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    this.notaAutGes = 0;
    this.notaDirGes = 0;

    if (this.respAutGes.length <= 0) {
      this.notaAutGes = 0;
    } else {
      this.notaAutGes = (this.totalAutGes * 10) / (this.respAutGes.length * 5);
    }

    if (this.respDirGes.length <= 0) {
      this.notaDirGes = 0;
    } else {
      this.notaDirGes = (this.totalDirGes * 10) / (this.respDirGes.length * 5);
    }

    this.findRespuestas('AV', docId, this.evalId).subscribe((data) => {
      this.respAutVin = data;

      this.totalAutVin = 0;

      this.respAutVin.forEach((resp) => {
        this.totalAutVin += parseInt(resp.texto);
      });
    });

    this.findRespuestas('CV', docId, this.evalId).subscribe((data) => {
      this.respParVin = data;

      this.totalParVin = 0;

      this.respParVin.forEach((resp) => {
        this.totalParVin += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DV', docId, this.evalId).subscribe((data) => {
      this.respDirVin = data;

      this.totalDirVin = 0;

      this.respDirVin.forEach((resp) => {
        this.totalDirVin += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    this.notaAutVin = 0;
    this.notaParVin = 0;
    this.notaDirVin = 0;

    if (this.respAutVin.length <= 0) {
      this.notaAutVin = 0;
    } else {
      this.notaAutVin = (this.totalAutVin * 10) / (this.respAutVin.length * 5);
    }

    if (this.respParVin.length <= 0) {
      this.notaParVin = 0;
    } else {
      this.notaParVin = (this.totalParVin * 10) / (this.respParVin.length * 5);
    }

    if (this.respDirVin.length <= 0) {
      this.notaDirVin = 0;
    } else {
      this.notaDirVin = (this.totalDirVin * 10) / (this.respDirVin.length * 5);
    }

    this.totalDocencia =
      this.notaAutDoc / 10 +
      (this.notaHetDoc * 3.5) / 10 +
      (this.notaParDoc * 3) / 10 +
      (this.notaDirDoc * 2.5) / 10;
    this.totalInvestigacion =
      this.notaAutInv / 10 +
      (this.notaParInv * 4) / 10 +
      (this.notaDirInv * 5) / 10;
    this.totalGestion = (this.notaAutGes * 4) / 10 + (this.notaDirGes * 6) / 10;
    this.totalVinculacion =
      this.notaAutVin / 10 +
      (this.notaParVin * 4) / 10 +
      (this.notaDirVin * 5) / 10;

    this.totalDocenciaPonderacion = 0;
    this.totalInvestigacionPonderacion = 0;
    this.totalGestionPonderacion = 0;
    this.totalVinculacionPonderacion = 0;
    this.totalFinal = 0;

    if (
      this.horasDocencia > 0 &&
      this.horasInvestigacion > 0 &&
      this.horasGestion > 0 &&
      this.horasVinculacion > 0
    ) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalInvestigacionPonderacion = (this.totalInvestigacion * 1.5) / 10;
      this.totalGestionPonderacion = (this.totalVinculacion * 1.5) / 10;
      this.totalVinculacionPonderacion = this.totalGestion / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 +
        (this.totalInvestigacion * 1.5) / 10 +
        (this.totalVinculacion * 1.5) / 10 +
        this.totalGestion / 10;
    } else if (
      this.horasDocencia > 0 &&
      this.horasInvestigacion > 0 &&
      this.horasVinculacion > 0
    ) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalInvestigacionPonderacion = (this.totalInvestigacion * 2) / 10;
      this.totalVinculacionPonderacion = (this.totalVinculacion * 2) / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 +
        (this.totalInvestigacion * 2) / 10 +
        (this.totalVinculacion * 2) / 10;
    } else if (
      this.horasDocencia > 0 &&
      this.horasVinculacion > 0 &&
      this.horasGestion > 0
    ) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalVinculacionPonderacion = (this.totalInvestigacion * 2) / 10;
      this.totalGestionPonderacion = (this.totalGestion * 2) / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 +
        (this.totalInvestigacion * 2) / 10 +
        (this.totalGestion * 2) / 10;
    } else if (
      this.horasDocencia > 0 &&
      this.horasGestion > 0 &&
      this.horasInvestigacion > 0
    ) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalInvestigacionPonderacion = (this.totalInvestigacion * 2) / 10;
      this.totalGestionPonderacion = (this.totalGestion * 2) / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 +
        (this.totalInvestigacion * 2) / 10 +
        (this.totalGestion * 2) / 10;
    } else if (this.horasDocencia > 0 && this.horasInvestigacion > 0) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalInvestigacionPonderacion = (this.totalInvestigacion * 4) / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 + (this.totalInvestigacion * 4) / 10;
    } else if (this.horasDocencia > 0 && this.horasVinculacion > 0) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalVinculacionPonderacion = (this.totalVinculacion * 4) / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 + (this.totalVinculacion * 4) / 10;
    } else if (this.horasDocencia > 0 && this.horasGestion > 0) {
      this.totalDocenciaPonderacion = (this.totalDocencia * 6) / 10;
      this.totalGestionPonderacion = (this.totalGestion * 4) / 10;
      this.totalFinal =
        (this.totalDocencia * 6) / 10 + (this.totalGestion * 4) / 10;
    } else if (this.horasDocencia > 0) {
      this.totalDocenciaPonderacion = this.totalDocencia;
      this.totalFinal = this.totalDocencia;
    } else if (this.horasVinculacion > 0) {
      this.totalVinculacionPonderacion = this.totalVinculacion;
      this.totalFinal = this.totalVinculacion;
    } else if (this.horasGestion > 0) {
      this.totalGestionPonderacion = this.totalGestion;
      this.totalFinal = this.totalGestion;
    } else if (this.horasInvestigacion > 0) {
      this.totalInvestigacionPonderacion = this.totalInvestigacion;
      this.totalFinal = this.totalInvestigacion;
    }
  }
}
