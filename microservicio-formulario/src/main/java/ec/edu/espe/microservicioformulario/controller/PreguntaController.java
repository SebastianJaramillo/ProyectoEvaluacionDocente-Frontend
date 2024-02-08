package ec.edu.espe.microservicioformulario.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microservicioformulario.model.Pregunta;
import ec.edu.espe.microservicioformulario.service.PreguntaService;

@CrossOrigin
@RestController
@RequestMapping("/pregunta")
public class PreguntaController {

    private final PreguntaService preguntaService;

    public PreguntaController(PreguntaService preguntaService) {
        this.preguntaService = preguntaService;
    }

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Pregunta>> listAll() {
        return ResponseEntity.ok().body(this.preguntaService.listAll());
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Pregunta> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(this.preguntaService.findById(id));
    }

    @PostMapping("/registro")
    public ResponseEntity<Pregunta> save(@RequestBody Pregunta pregunta) {
        return ResponseEntity.ok().body(this.preguntaService.save(pregunta));
    }

    @GetMapping("/formulario/{id}")
    public ResponseEntity<List<Pregunta>> findByFormId(@PathVariable long id) {
        return ResponseEntity.ok().body(this.preguntaService.findByFormId(id));
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Pregunta> update(@PathVariable String id, @RequestBody Pregunta pregunta) {
        Pregunta preguntaActualizada = preguntaService.update(id, pregunta);
        return ResponseEntity.ok().body(preguntaActualizada);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarById(@PathVariable String id) {
        this.preguntaService.eliminarById(id);
         return ResponseEntity.ok().build();

    }

}
