package ec.edu.espe.microserviciocursoestudiante.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.service.EstudianteService;

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
}
