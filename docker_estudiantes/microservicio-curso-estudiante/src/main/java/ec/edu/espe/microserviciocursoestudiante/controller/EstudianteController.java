package ec.edu.espe.microserviciocursoestudiante.controller;

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

import ec.edu.espe.microserviciocursoestudiante.model.CursoEstudiante;
import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.service.CursoEstudianteService;
import ec.edu.espe.microserviciocursoestudiante.service.EstudianteService;

@CrossOrigin
@RestController
@RequestMapping("/estudiante")
public class EstudianteController {

    private final EstudianteService estudianteService;
    private final CursoEstudianteService cursoEstudianteService;

    public EstudianteController(EstudianteService estudianteService, CursoEstudianteService cursoEstudianteService) {
        this.estudianteService = estudianteService;
        this.cursoEstudianteService = cursoEstudianteService;
    }

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Estudiante>> listAll() {
        return ResponseEntity.ok().body(this.estudianteService.listAll());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Estudiante> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(this.estudianteService.findById(id));
    }

    @PostMapping("/registro")
    public ResponseEntity<Estudiante> save(@RequestBody Estudiante estudiante) {
        return ResponseEntity.ok().body(this.estudianteService.save(estudiante));
    }

    @GetMapping("/cursos/{id}/{evalId}")
    public ResponseEntity<List<CursoEstudiante>> findByEstudiante(@PathVariable String id, @PathVariable Long evalId) {
        return ResponseEntity.ok().body(this.cursoEstudianteService.findByEstudiante(id, evalId));
    }

    @PostMapping("/curso/registro")
    public ResponseEntity<CursoEstudiante> addCursoEstudiante(@RequestBody CursoEstudiante cursoEstudiante) {
        return ResponseEntity.ok().body(this.cursoEstudianteService.addCursoEstudiante(cursoEstudiante));
    }

    @PutMapping("/curso/evaluacion")
    public ResponseEntity<CursoEstudiante> updateEvaluacion(@RequestBody Long id) {
        return ResponseEntity.ok().body(this.cursoEstudianteService.updateEstadoEval(id));
    }
}
