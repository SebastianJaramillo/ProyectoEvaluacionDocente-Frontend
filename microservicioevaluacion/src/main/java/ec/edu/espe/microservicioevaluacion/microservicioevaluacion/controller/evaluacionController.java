package ec.edu.espe.microservicioevaluacion.microservicioevaluacion.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ec.edu.espe.microservicioevaluacion.microservicioevaluacion.model.evaluacion;
import ec.edu.espe.microservicioevaluacion.microservicioevaluacion.service.evaluacionService;

@RestController
@RequestMapping("/evaluacion")
public class evaluacionController {
    @Autowired
    private evaluacionService evaluacionService;

    @GetMapping("/listar")
    public ResponseEntity<List<evaluacion>> listAll() {
        return ResponseEntity.ok().body(evaluacionService.listAll());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<evaluacion> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(evaluacionService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<evaluacion> save(@RequestBody evaluacion evaluacion) {
        return ResponseEntity.ok().body(evaluacionService.save(evaluacion));
    }
}
