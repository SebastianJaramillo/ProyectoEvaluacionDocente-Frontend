package ec.edu.espe.microservicioevaluacion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;
import ec.edu.espe.microservicioevaluacion.service.EvaluacionService;

@RestController
@RequestMapping("/evaluacion")
public class EvaluacionController {
    
    @Autowired
    private EvaluacionService evaluacionService;

    @GetMapping("/listar")
    public ResponseEntity<List<Evaluacion>> listAll() {
        return ResponseEntity.ok().body(evaluacionService.listAll());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Evaluacion> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(evaluacionService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<Evaluacion> save(@RequestBody Evaluacion evaluacion) {
        return ResponseEntity.ok().body(evaluacionService.save(evaluacion));
    }
}
