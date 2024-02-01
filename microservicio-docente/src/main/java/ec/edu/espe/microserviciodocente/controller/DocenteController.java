package ec.edu.espe.microserviciodocente.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microserviciodocente.model.Docente;
import ec.edu.espe.microserviciodocente.model.DocenteEvaluacion;
import ec.edu.espe.microserviciodocente.model.DocenteFuncion;
import ec.edu.espe.microserviciodocente.model.DocenteRelacion;
import ec.edu.espe.microserviciodocente.service.DocenteEvaluacionService;
import ec.edu.espe.microserviciodocente.service.DocenteFuncionService;
import ec.edu.espe.microserviciodocente.service.DocenteRelacionService;
import ec.edu.espe.microserviciodocente.service.DocenteService;

@RestController
@RequestMapping("/docente")
@CrossOrigin
public class DocenteController {

    private final DocenteService docenteService;
    private final DocenteFuncionService docenteFuncionService;
    private final DocenteRelacionService docenteRelacionService;
    private final DocenteEvaluacionService docenteEvaluacionService;

    public DocenteController(DocenteService docenteService, DocenteFuncionService docenteFuncionService,
            DocenteRelacionService docenteRelacionService, DocenteEvaluacionService docenteEvaluacionService) {
        this.docenteService = docenteService;
        this.docenteFuncionService = docenteFuncionService;
        this.docenteRelacionService = docenteRelacionService;
        this.docenteEvaluacionService = docenteEvaluacionService;
    }

    // DOCENTE
    @GetMapping("/listar")
    public ResponseEntity<Iterable<Docente>> listAll() {
        return ResponseEntity.ok().body(docenteService.listAll());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Docente> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(docenteService.findById(id));
    }

    @PostMapping("/registro")
    public ResponseEntity<Docente> save(@RequestBody Docente docennte) {
        return ResponseEntity.ok().body(docenteService.save(docennte));
    }

    // FUNCIONES
    @GetMapping("/funciones/{id}")
    public ResponseEntity<List<DocenteFuncion>> findByDocente(@PathVariable String id) {
        return ResponseEntity.ok().body(this.docenteFuncionService.findByDocente(id));
    }

    @GetMapping("/funciones/buscar/{id}")
    public ResponseEntity<List<DocenteFuncion>> findByFuncion(@PathVariable String id) {
        return ResponseEntity.ok().body(this.docenteFuncionService.findByFuncion(id));
    }

    @PostMapping("/funcion/registro")
    public ResponseEntity<DocenteFuncion> addDocenteFuncion(@RequestBody DocenteFuncion docenteFuncion) {
        return ResponseEntity.ok().body(this.docenteFuncionService.addDocenteFuncion(docenteFuncion));
    }

    @PutMapping("/funcion/desactivar")
    public ResponseEntity<DocenteFuncion> desactivarDocenteFuncion(@RequestBody Long id) {
        return ResponseEntity.ok().body(this.docenteFuncionService.updateEstado(id));
    }

    // RELACION JEFE
    @GetMapping("/relacion/jefe/{id}")
    public ResponseEntity<List<DocenteRelacion>> findByJefe(@PathVariable String id) {
        return ResponseEntity.ok().body(this.docenteRelacionService.findByJefe(id));
    }

    @GetMapping("/relacion/doc/{id}")
    public ResponseEntity<List<DocenteRelacion>> findByDocenteRelacion(@PathVariable String id) {
        return ResponseEntity.ok().body(this.docenteRelacionService.findByDocente(id));
    }

    @PostMapping("/relacion/registro")
    public ResponseEntity<DocenteRelacion> addDocenteRelacion(@RequestBody DocenteRelacion docenteRelacion) {
        return ResponseEntity.ok().body(this.docenteRelacionService.addDocenteRelacion(docenteRelacion));
    }

    // EVALUACION ESTADO
    @GetMapping("/evaluacion/evaluador/{id}")
    public ResponseEntity<List<DocenteEvaluacion>> findByDocEvaluador(@PathVariable String id) {
        return ResponseEntity.ok().body(this.docenteEvaluacionService.findByDocEvaluador(id));
    }

    @GetMapping("/evaluacion/evaluado/{id}")
    public ResponseEntity<List<DocenteEvaluacion>> findByDocEvaluado(@PathVariable String id) {
        return ResponseEntity.ok().body(this.docenteEvaluacionService.findByDocEvaluado(id));
    }

    @GetMapping("/evaluacion/{docEvaluador}/{docEvaluado}/{evalId}")
    public ResponseEntity<DocenteEvaluacion> findByEvaluacion(@PathVariable String docEvaluador, @PathVariable String docEvaluado, @PathVariable Long evalId) {
        return ResponseEntity.ok().body(this.docenteEvaluacionService.findByEvaluacion(docEvaluador, docEvaluado, evalId));
    }

    @PostMapping("/evaluacion/registro")
    public ResponseEntity<DocenteEvaluacion> saveEvaluacion(@RequestBody DocenteEvaluacion docenteEvaluacion) {
        return ResponseEntity.ok().body(this.docenteEvaluacionService.save(docenteEvaluacion));
    }
}
