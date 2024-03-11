import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DocenteService } from '../services/docente/docente.service';
import { FormularioService } from '../services/formulario/formulario.service';
import { Observable } from 'rxjs';
import { EvaluacionService } from '../services/evaluacion/evaluacion.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
import {
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent implements OnInit {
  id: any;
  evalId: any;
  docId: any;
  director: any;
  reporte: any;
  actividad: any;
  docente: any = {};
  periodo: any = {};
  periodos: any[] = [];
  perId: any;
  docentes: any[] = [];
  docentesAux: any[] = [];
  docFunciones: any[] = [];
  areas: any[] = [
    'DOCENCIA',
    'INVESTIGACION',
    'VINCULACION',
    'GESTION ACADEMICA',
  ];
  areasRelacion: any[] = [];
  todasAreas: any[] = [];
  funciones: any[] = [];
  area: any;

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

  @ViewChild('barChart') barChart!: ElementRef;
  chart: Chart | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formularioService: FormularioService,
    private evaluacionService: EvaluacionService,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role && role === 'DOCENTE') {
    } else {
      this.mensaje('Acceso denegado. Vuelva a iniciar sesión.');
      localStorage.clear();
      this.router.navigate(['']);
    }

    this.reporte = '';
    this.docId = '';
    this.area = 'T';
    this.evalId = 0;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.findFunciones(atob(this.id));
    this.getAllPeriodos();
    this.findRelacion();

    this.crearGrafico([]);
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

  findFuncionesTodos(id: string): any {
    this.docenteService.findFuncionTodos(id).subscribe(
      (data) => {
        const funcionesSet = new Set();
        this.funciones = [];
        data.forEach((funcion) => {
          if (!funcionesSet.has(funcion.docId)) {
            funcionesSet.add(funcion.docId);
            this.funciones.push(funcion);
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findRelacion(): any {
    this.docenteService.listarRelacion().subscribe(
      (data) => {
        this.areasRelacion = data;
        if (this.areasRelacion.length > 0) {
          const areasRelacionValues = new Set(
            this.areasRelacion.map((item: any) => item.area)
          );
          this.todasAreas = Array.from(
            new Set([...this.areas, ...areasRelacionValues])
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  findFunciones(id: any) {
    this.docenteService.findFunciones(id).subscribe(
      (data) => {
        this.docFunciones = data;
        this.director = this.docFunciones.some(
          (f) => f.funcion.rol === 'Director'
        );

        if (this.director) {
          this.listarDocentes();
        } else {
          this.docId = id;
          this.findDocente(id);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllPeriodos() {
    this.evaluacionService.getPeriodosActivosInactivos().subscribe(
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  reporteIndividual() {
    this.reporte = 'Individual';
  }

  reporteGlobal() {
    this.reporte = 'Global';
  }

  async generarInforme() {
    if (this.evalId > 0) {
      if (this.docId == '') {
        this.mensaje('Seleccione un docente para genererar informe individual');
        return;
      }
      await this.findDocente(this.docId);

      await this.sleep(100);

      await this.findPeriodo(this.evalId);

      await this.sleep(100);

      let {
        horasDocencia,
        horasInvestigacion,
        horasGestion,
        horasVinculacion,
        notaAutDoc,
        notaHetDoc,
        notaParDoc,
        notaDirDoc,
        notaAutInv,
        notaParInv,
        notaDirInv,
        notaAutGes,
        notaDirGes,
        notaAutVin,
        notaParVin,
        notaDirVin,
        totalDocencia,
        totalGestion,
        totalInvestigacion,
        totalVinculacion,
        totalDocenciaPonderacion,
        totalGestionPonderacion,
        totalInvestigacionPonderacion,
        totalVinculacionPonderacion,
        totalFinal,
      } = await this.calculos(this.docId);

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
          const columnWidths =
            data.table?.columns.map((col) => col.width) || [];
          const tableWidth = columnWidths.reduce(
            (total, width) => total + (width || 0),
            0
          );

          if (
            tableWidth > anchoPagina &&
            data.settings &&
            data.settings.margin
          ) {
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
            {
              content: 'Horas',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
            {
              content: 'Ponderación',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
            {
              content: 'Horas',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
            {
              content: 'Ponderación',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
            {
              content: 'Horas',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
            {
              content: 'Ponderación',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
            {
              content: 'Horas',
              styles: { fontStyle: 'bold', halign: 'center' },
            },
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
            {
              content: horasDocencia === 0 ? '' : horasDocencia,
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalDocenciaPonderacion.toFixed(2)) === 0
                  ? ''
                  : Number(totalDocenciaPonderacion.toFixed(2)),
              styles: { halign: 'center' },
            },
            {
              content: horasInvestigacion === 0 ? '' : horasInvestigacion,
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalInvestigacionPonderacion.toFixed(2)) === 0
                  ? ''
                  : Number(totalInvestigacionPonderacion.toFixed(2)),
              styles: { halign: 'center' },
            },
            {
              content: horasGestion === 0 ? '' : horasGestion,
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalGestionPonderacion.toFixed(2)) === 0
                  ? ''
                  : Number(totalGestionPonderacion.toFixed(2)),
              styles: { halign: 'center' },
            },
            {
              content: horasVinculacion === 0 ? '' : horasVinculacion,
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalVinculacionPonderacion.toFixed(2)) === 0
                  ? ''
                  : Number(totalVinculacionPonderacion.toFixed(2)),
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalFinal.toFixed(2)) === 0
                  ? ''
                  : Number(totalFinal.toFixed(2)),
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
            {
              content: 'HETERO\nEVALUACIÓN\n35 %',
              styles: { halign: 'center' },
            },
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
              content:
                Number(notaAutDoc.toFixed(2)) === 0
                  ? ''
                  : Number(notaAutDoc.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaHetDoc.toFixed(2)) === 0
                  ? ''
                  : Number(notaHetDoc.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaParDoc.toFixed(2)) === 0
                  ? ''
                  : Number(notaParDoc.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaDirDoc.toFixed(2)) === 0
                  ? ''
                  : Number(notaDirDoc.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaAutInv.toFixed(2)) === 0
                  ? ''
                  : Number(notaAutInv.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaParInv.toFixed(2)) === 0
                  ? ''
                  : Number(notaParInv.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaDirInv.toFixed(2)) === 0
                  ? ''
                  : Number(notaDirInv.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaAutGes.toFixed(2)) === 0
                  ? ''
                  : Number(notaAutGes.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaDirGes.toFixed(2)) === 0
                  ? ''
                  : Number(notaDirGes.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaAutVin.toFixed(2)) === 0
                  ? ''
                  : Number(notaAutVin.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaParVin.toFixed(2)) === 0
                  ? ''
                  : Number(notaParVin.toFixed(2)),
              styles: { fontSize: 9, halign: 'center' },
            },
            {
              content:
                Number(notaDirVin.toFixed(2)) === 0
                  ? ''
                  : Number(notaDirVin.toFixed(2)),
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
              content:
                Number(totalDocencia.toFixed(2)) === 0
                  ? ''
                  : Number(totalDocencia.toFixed(2)),
              colSpan: 2,
              styles: { halign: 'center', fontSize: 9 },
            },
            {
              content: 'PORCENTAJE\n100%',
              colSpan: 2,
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalInvestigacion.toFixed(2)) === 0
                  ? ''
                  : Number(totalInvestigacion.toFixed(2)),
              styles: { halign: 'center', fontSize: 9 },
            },
            {
              content: 'PORCENTAJE\n100%',
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalGestion.toFixed(2)) === 0
                  ? ''
                  : Number(totalGestion.toFixed(2)),
              styles: { halign: 'center', fontSize: 9 },
            },
            {
              content: 'PORCENTAJE\n100%',
              colSpan: 2,
              styles: { halign: 'center' },
            },
            {
              content:
                Number(totalVinculacion.toFixed(2)) === 0
                  ? ''
                  : Number(totalVinculacion.toFixed(2)),
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

      pdf.save(
        this.docente.id +
          '_' +
          this.docente.apellidos +
          '_EVALUACION_DETALLE_IND.pdf'
      );
    } else {
      this.mensaje('Seleccione un periodo');
    }
  }

  async generarInformeGlobal() {
    if (this.evalId > 0) {
      await this.findPeriodo(this.evalId);

      await this.sleep(100);

      let datos: any[] = [];

      if (this.area == 'T') {
        await this.sleep(100);

        await Promise.all(
          this.docentes.map(async (item) => {
            let {
              horasDocencia,
              horasInvestigacion,
              horasGestion,
              horasVinculacion,
              notaAutDoc,
              notaHetDoc,
              notaParDoc,
              notaDirDoc,
              notaAutInv,
              notaParInv,
              notaDirInv,
              notaAutGes,
              notaDirGes,
              notaAutVin,
              notaParVin,
              notaDirVin,
              totalDocencia,
              totalGestion,
              totalInvestigacion,
              totalVinculacion,
              totalDocenciaPonderacion,
              totalGestionPonderacion,
              totalInvestigacionPonderacion,
              totalVinculacionPonderacion,
              totalFinal,
            } = await this.calculos(item.id);

            await this.sleep(100);

            const registro = {
              DOCENTE: item.apellidos + ' ' + item.nombres,
              'HORAS DOCENCIA': horasDocencia,
              'NOTA DOCENCIA': Number(totalDocencia).toFixed(2),
              'HORAS INVESTIGACION': horasInvestigacion,
              'NOTA INVESTIGACION': Number(totalInvestigacion).toFixed(2),
              'HORAS GESTION': horasGestion,
              'NOTA GESTION': Number(totalGestion).toFixed(2),
              'HORAS VINCULACION': horasVinculacion,
              'NOTA VINCULACION': Number(totalVinculacion).toFixed(2),
              'NOTA FINAL': Number(totalFinal).toFixed(2),
            };
            datos.push(registro);
          })
        );

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(datos);
        XLSX.utils.book_append_sheet(wb, ws, 'EVALUACION DOCENTE');
        XLSX.writeFile(
          wb,
          'REPORTE GLOBAL_' + this.periodo.descripcion + '.xlsx'
        );
      } else {
        switch (this.area) {
          case 'DOCENCIA':
            this.actividad = 'DOC';
            break;
          case 'GESTION ACADEMICA':
            this.actividad = 'GES';
            break;
          case 'INVESTIGACION':
            this.actividad = 'INV';
            break;
          case 'VINCULACION':
            this.actividad = 'VIN';
            break;
          default:
            console.log('No se encontró función');
        }

        await this.findFuncionesTodos(this.actividad);

        await this.sleep(100);

        if (this.funciones.length > 0) {
          await Promise.all(
            this.funciones.map(async (item) => {
              let {
                horasDocencia,
                horasInvestigacion,
                horasGestion,
                horasVinculacion,
                notaAutDoc,
                notaHetDoc,
                notaParDoc,
                notaDirDoc,
                notaAutInv,
                notaParInv,
                notaDirInv,
                notaAutGes,
                notaDirGes,
                notaAutVin,
                notaParVin,
                notaDirVin,
                totalDocencia,
                totalGestion,
                totalInvestigacion,
                totalVinculacion,
                totalDocenciaPonderacion,
                totalGestionPonderacion,
                totalInvestigacionPonderacion,
                totalVinculacionPonderacion,
                totalFinal,
              } = await this.calculos(item.docId);

              await this.sleep(100);

              const registro = {
                DOCENTE: item.docente.apellidos + ' ' + item.docente.nombres,
                'HORAS DOCENCIA': horasDocencia,
                'NOTA DOCENCIA': Number(totalDocencia).toFixed(2),
                'HORAS INVESTIGACION': horasInvestigacion,
                'NOTA INVESTIGACION': Number(totalInvestigacion).toFixed(2),
                'HORAS GESTION': horasGestion,
                'NOTA GESTION': Number(totalGestion).toFixed(2),
                'HORAS VINCULACION': horasVinculacion,
                'NOTA VINCULACION': Number(totalVinculacion).toFixed(2),
                'NOTA FINAL': Number(totalFinal).toFixed(2),
              };
              datos.push(registro);
            })
          );

          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(datos);
          XLSX.utils.book_append_sheet(wb, ws, this.area);
          XLSX.writeFile(
            wb,
            'REPORTE GLOBAL_' + this.periodo.descripcion + '.xlsx'
          );
        } else {
          this.mensaje('No existen registros para esa área');
        }
      }
      this.crearGrafico(datos);
    } else {
      this.mensaje('Seleccione un periodo');
    }
  }

  async calculos(docId: string) {
    let horasGestion = 0;
    let horasDocencia = 0;
    let horasInvestigacion = 0;
    let horasVinculacion = 0;

    this.docenteService.findFunciones(docId).subscribe(
      (data) => {
        this.docFunciones = data;
        this.docFunciones.forEach((item) => {
          switch (item.funcion.descripcion) {
            case 'Docencia':
              horasDocencia += item.horas;
              break;
            case 'Vinculacion':
              horasVinculacion += item.horas;
              break;
            case 'Gestion':
              horasGestion += item.horas;
              break;
            case 'Investigacion':
              horasInvestigacion += item.horas;
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

    await this.sleep(100);

    let totalHetDoc = 0;
    let totalAutDoc = 0;
    let totalParDoc = 0;
    let totalDirDoc = 0;

    let totalAutInv = 0;
    let totalParInv = 0;
    let totalDirInv = 0;

    let totalAutGes = 0;
    let totalDirGes = 0;

    let totalAutVin = 0;
    let totalParVin = 0;
    let totalDirVin = 0;

    let notaAutDoc = 0;
    let notaHetDoc = 0;
    let notaParDoc = 0;
    let notaDirDoc = 0;

    let notaAutInv = 0;
    let notaParInv = 0;
    let notaDirInv = 0;

    let notaAutGes = 0;
    let notaDirGes = 0;

    let notaAutVin = 0;
    let notaParVin = 0;
    let notaDirVin = 0;

    let totalDocencia = 0;
    let totalGestion = 0;
    let totalInvestigacion = 0;
    let totalVinculacion = 0;

    let totalDocenciaPonderacion = 0;
    let totalGestionPonderacion = 0;
    let totalInvestigacionPonderacion = 0;
    let totalVinculacionPonderacion = 0;

    let totalFinal = 0;

    this.findRespuestas('HET', docId, this.evalId).subscribe((data) => {
      this.respHetDoc = data;

      this.respHetDoc.forEach((resp) => {
        totalHetDoc += parseInt(resp.texto);
      });
    });

    this.findRespuestas('AD', docId, this.evalId).subscribe((data) => {
      this.respAutDoc = data;

      this.respAutDoc.forEach((resp) => {
        totalAutDoc += parseInt(resp.texto);
      });
    });

    this.findRespuestas('CD', docId, this.evalId).subscribe((data) => {
      this.respParDoc = data;

      this.respParDoc.forEach((resp) => {
        totalParDoc += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DD', docId, this.evalId).subscribe((data) => {
      this.respDirDoc = data;

      this.respDirDoc.forEach((resp) => {
        totalDirDoc += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    if (this.respHetDoc.length <= 0) {
      notaHetDoc = 0;
    } else {
      notaHetDoc = (totalHetDoc * 10) / (this.respHetDoc.length * 5);
    }

    if (this.respAutDoc.length <= 0) {
      notaAutDoc = 0;
    } else {
      notaAutDoc = (totalAutDoc * 10) / (this.respAutDoc.length * 5);
    }

    if (this.respParDoc.length <= 0) {
      notaParDoc = 0;
    } else {
      notaParDoc = (totalParDoc * 10) / (this.respParDoc.length * 5);
    }

    if (this.respDirDoc.length <= 0) {
      notaDirDoc = 0;
    } else {
      notaDirDoc = (totalDirDoc * 10) / (this.respDirDoc.length * 5);
    }

    this.findRespuestas('AI', docId, this.evalId).subscribe((data) => {
      this.respAutInv = data;

      this.respAutInv.forEach((resp) => {
        totalAutInv += parseInt(resp.texto);
      });
    });

    this.findRespuestas('CI', docId, this.evalId).subscribe((data) => {
      this.respParInv = data;

      totalParInv = 0;

      this.respParInv.forEach((resp) => {
        totalParInv += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DI', docId, this.evalId).subscribe((data) => {
      this.respDirInv = data;

      this.respDirInv.forEach((resp) => {
        totalDirInv += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    if (this.respAutInv.length <= 0) {
      notaAutInv = 0;
    } else {
      notaAutInv = (totalAutInv * 10) / (this.respAutInv.length * 5);
    }

    if (this.respParInv.length <= 0) {
      notaParInv = 0;
    } else {
      notaParInv = (totalParInv * 10) / (this.respParInv.length * 5);
    }

    if (this.respDirInv.length <= 0) {
      notaDirInv = 0;
    } else {
      notaDirInv = (totalDirInv * 10) / (this.respDirInv.length * 5);
    }

    this.findRespuestas('AG', docId, this.evalId).subscribe((data) => {
      this.respAutGes = data;

      this.respAutGes.forEach((resp) => {
        totalAutGes += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DG', docId, this.evalId).subscribe((data) => {
      this.respDirGes = data;

      this.respDirGes.forEach((resp) => {
        totalDirGes += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    if (this.respAutGes.length <= 0) {
      notaAutGes = 0;
    } else {
      notaAutGes = (totalAutGes * 10) / (this.respAutGes.length * 5);
    }

    if (this.respDirGes.length <= 0) {
      notaDirGes = 0;
    } else {
      notaDirGes = (totalDirGes * 10) / (this.respDirGes.length * 5);
    }

    this.findRespuestas('AV', docId, this.evalId).subscribe((data) => {
      this.respAutVin = data;

      this.respAutVin.forEach((resp) => {
        totalAutVin += parseInt(resp.texto);
      });
    });

    this.findRespuestas('CV', docId, this.evalId).subscribe((data) => {
      this.respParVin = data;

      this.respParVin.forEach((resp) => {
        totalParVin += parseInt(resp.texto);
      });
    });

    this.findRespuestas('DV', docId, this.evalId).subscribe((data) => {
      this.respDirVin = data;

      this.respDirVin.forEach((resp) => {
        totalDirVin += parseInt(resp.texto);
      });
    });

    await this.sleep(100);

    if (this.respAutVin.length <= 0) {
      notaAutVin = 0;
    } else {
      notaAutVin = (totalAutVin * 10) / (this.respAutVin.length * 5);
    }

    if (this.respParVin.length <= 0) {
      notaParVin = 0;
    } else {
      notaParVin = (totalParVin * 10) / (this.respParVin.length * 5);
    }

    if (this.respDirVin.length <= 0) {
      notaDirVin = 0;
    } else {
      notaDirVin = (totalDirVin * 10) / (this.respDirVin.length * 5);
    }

    totalDocencia =
      notaAutDoc / 10 +
      (notaHetDoc * 3.5) / 10 +
      (notaParDoc * 3) / 10 +
      (notaDirDoc * 2.5) / 10;
    totalInvestigacion =
      notaAutInv / 10 + (notaParInv * 4) / 10 + (notaDirInv * 5) / 10;
    totalGestion = (notaAutGes * 4) / 10 + (notaDirGes * 6) / 10;
    totalVinculacion =
      notaAutVin / 10 + (notaParVin * 4) / 10 + (notaDirVin * 5) / 10;

    if (
      horasDocencia > 0 &&
      horasInvestigacion > 0 &&
      horasGestion > 0 &&
      horasVinculacion > 0
    ) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalInvestigacionPonderacion = (totalInvestigacion * 1.5) / 10;
      totalGestionPonderacion = (totalVinculacion * 1.5) / 10;
      totalVinculacionPonderacion = totalGestion / 10;
      totalFinal =
        (totalDocencia * 6) / 10 +
        (totalInvestigacion * 1.5) / 10 +
        (totalVinculacion * 1.5) / 10 +
        totalGestion / 10;
    } else if (
      horasDocencia > 0 &&
      horasInvestigacion > 0 &&
      horasVinculacion > 0
    ) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalInvestigacionPonderacion = (totalInvestigacion * 2) / 10;
      totalVinculacionPonderacion = (totalVinculacion * 2) / 10;
      totalFinal =
        (totalDocencia * 6) / 10 +
        (totalInvestigacion * 2) / 10 +
        (totalVinculacion * 2) / 10;
    } else if (horasDocencia > 0 && horasVinculacion > 0 && horasGestion > 0) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalVinculacionPonderacion = (totalInvestigacion * 2) / 10;
      totalGestionPonderacion = (totalGestion * 2) / 10;
      totalFinal =
        (totalDocencia * 6) / 10 +
        (totalInvestigacion * 2) / 10 +
        (totalGestion * 2) / 10;
    } else if (
      horasDocencia > 0 &&
      horasGestion > 0 &&
      horasInvestigacion > 0
    ) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalInvestigacionPonderacion = (totalInvestigacion * 2) / 10;
      totalGestionPonderacion = (totalGestion * 2) / 10;
      totalFinal =
        (totalDocencia * 6) / 10 +
        (totalInvestigacion * 2) / 10 +
        (totalGestion * 2) / 10;
    } else if (horasDocencia > 0 && horasInvestigacion > 0) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalInvestigacionPonderacion = (totalInvestigacion * 4) / 10;
      totalFinal = (totalDocencia * 6) / 10 + (totalInvestigacion * 4) / 10;
    } else if (horasDocencia > 0 && horasVinculacion > 0) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalVinculacionPonderacion = (totalVinculacion * 4) / 10;
      totalFinal = (totalDocencia * 6) / 10 + (totalVinculacion * 4) / 10;
    } else if (horasDocencia > 0 && horasGestion > 0) {
      totalDocenciaPonderacion = (totalDocencia * 6) / 10;
      totalGestionPonderacion = (totalGestion * 4) / 10;
      totalFinal = (totalDocencia * 6) / 10 + (totalGestion * 4) / 10;
    } else if (horasDocencia > 0) {
      totalDocenciaPonderacion = totalDocencia;
      totalFinal = totalDocencia;
    } else if (horasVinculacion > 0) {
      totalVinculacionPonderacion = totalVinculacion;
      totalFinal = totalVinculacion;
    } else if (horasGestion > 0) {
      totalGestionPonderacion = totalGestion;
      totalFinal = totalGestion;
    } else if (horasInvestigacion > 0) {
      totalInvestigacionPonderacion = totalInvestigacion;
      totalFinal = totalInvestigacion;
    }

    return {
      horasDocencia,
      horasInvestigacion,
      horasGestion,
      horasVinculacion,
      notaAutDoc,
      notaHetDoc,
      notaParDoc,
      notaDirDoc,
      notaAutInv,
      notaParInv,
      notaDirInv,
      notaAutGes,
      notaDirGes,
      notaAutVin,
      notaParVin,
      notaDirVin,
      totalDocencia,
      totalGestion,
      totalInvestigacion,
      totalVinculacion,
      totalDocenciaPonderacion,
      totalGestionPonderacion,
      totalInvestigacionPonderacion,
      totalVinculacionPonderacion,
      totalFinal,
    };
  }

  crearGrafico(datos: any[]): void {
    if (datos.length > 0) {
      if (this.barChart) {
        const ctx = this.barChart.nativeElement.getContext('2d');
        const sortedData = datos
          .slice()
          .sort((a, b) => a['NOTA FINAL'] - b['NOTA FINAL']);
        const labels = sortedData.map((registro) => registro.DOCENTE);
        const data = sortedData.map((registro) => registro['NOTA FINAL']);

        if (this.chart) {
          this.chart.destroy();
        }

        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'CALIFICACION FINAL',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                type: 'linear',
              },
            },
          },
        });
      } else {
        console.log('No existen datos seleccionados');
      }
    } else {
      console.log('No hay datos para mostrar');
    }
  }

  mensaje(texto: any) {
    Swal.fire({
      title: 'Error',
      text: texto,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      width: '350px',
    });
  }
}
