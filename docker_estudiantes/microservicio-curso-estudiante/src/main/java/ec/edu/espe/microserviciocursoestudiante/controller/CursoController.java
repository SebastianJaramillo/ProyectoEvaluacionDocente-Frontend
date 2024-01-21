package ec.edu.espe.microserviciocursoestudiante.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microserviciocursoestudiante.model.Curso;
import ec.edu.espe.microserviciocursoestudiante.model.CursoEstudiante;
import ec.edu.espe.microserviciocursoestudiante.service.CursoEstudianteService;
import ec.edu.espe.microserviciocursoestudiante.service.CursoService;

@CrossOrigin
@RestController
@RequestMapping("/curso")
public class CursoController {

    private final CursoService cursoService;
    private final CursoEstudianteService cursoEstudianteService;

    public CursoController(CursoService cursoService, CursoEstudianteService cursoEstudianteService) {
        this.cursoService = cursoService;
        this.cursoEstudianteService = cursoEstudianteService;
    }

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Curso>> listAll() {
        return ResponseEntity.ok().body(cursoService.listAll());
    }
    
    @GetMapping("/buscar/{nrc}")
    public ResponseEntity<Curso> findByNrc(@PathVariable String nrc) {
        return ResponseEntity.ok().body(cursoService.findByNrc(Long.parseLong(nrc)));
    }

    @PostMapping("/registro")
    public ResponseEntity<Curso> save(@RequestBody Curso curso) {
        return ResponseEntity.ok().body(cursoService.save(curso));
    }

    @GetMapping("/estudiante/{nrc}")
    public ResponseEntity<List<CursoEstudiante>> findByCurso(@PathVariable Long nrc) {
        return ResponseEntity.ok().body(this.cursoEstudianteService.findByCurso(nrc));
    }
}
