package ec.edu.espe.microserviciocursoestudiante.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ec.edu.espe.microserviciocursoestudiante.domain.Curso;
import ec.edu.espe.microserviciocursoestudiante.domain.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.service.EstudianteService;
import org.springframework.web.bind.annotation.PutMapping;


@CrossOrigin
@RestController
@RequestMapping("/estudiante")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @GetMapping("/listar")
    public ResponseEntity<List<Estudiante>> listAll() {
        return ResponseEntity.ok().body(estudianteService.listAll());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Estudiante> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(estudianteService.findById(id));
    }

    @PostMapping("/registro")
    public ResponseEntity<Estudiante> save(@RequestBody Estudiante estudiante) {
        return ResponseEntity.ok().body(estudianteService.save(estudiante));
    }

    @PutMapping("/{id}/curso/{nrc}")
    public Estudiante addCursosEstudiante(@PathVariable String id, @PathVariable Long nrc) {
        
        return estudianteService.addCursosEstudiante(id, nrc);
    }

    @GetMapping("/cursos/{id}")
    public ResponseEntity<List<Curso>> addCursosEstudiante(@PathVariable String id) {
       return ResponseEntity.ok().body(estudianteService.findCursosByEstudiante(id));
    }
}
