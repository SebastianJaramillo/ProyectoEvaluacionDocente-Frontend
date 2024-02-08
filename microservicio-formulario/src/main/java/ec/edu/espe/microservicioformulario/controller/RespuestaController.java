package ec.edu.espe.microservicioformulario.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microservicioformulario.model.Respuesta;
import ec.edu.espe.microservicioformulario.service.RespuestaService;

@CrossOrigin
@RestController
@RequestMapping("/respuesta")
public class RespuestaController {

    private RespuestaService respuestaService;

    public RespuestaController(RespuestaService respuestaService) {
        this.respuestaService = respuestaService;
    }

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Respuesta>> listAll() {
        return ResponseEntity.ok().body(this.respuestaService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Respuesta> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(this.respuestaService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<Iterable<Respuesta>> save(@RequestBody Iterable<Respuesta> respuestas) {
        return ResponseEntity.ok().body(this.respuestaService.save(respuestas));
    }
}
