package ec.edu.espe.microservicioFormulario.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microservicioFormulario.model.pregunta;
import ec.edu.espe.microservicioFormulario.service.preguntaService;

@RestController
@RequestMapping("/pregunta")
public class preguntaController {
 @Autowired
    private preguntaService preguntaService;

    @GetMapping("/listar")
    public ResponseEntity<List<pregunta>> listAll() {
        return ResponseEntity.ok().body(preguntaService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<pregunta> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(preguntaService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<pregunta> save(@RequestBody pregunta pregunta) {
        return ResponseEntity.ok().body(preguntaService.save(pregunta));
    }
}
