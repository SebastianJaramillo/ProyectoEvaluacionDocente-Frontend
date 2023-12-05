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

import ec.edu.espe.microservicioFormulario.model.respuesta;
import ec.edu.espe.microservicioFormulario.service.respuestaService;

@RestController
@RequestMapping("/respuesta")
public class respuestaController {
    @Autowired
    private respuestaService respuestaService;

    @GetMapping("/listar")
    public ResponseEntity<List<respuesta>> listAll() {
        return ResponseEntity.ok().body(respuestaService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<respuesta> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(respuestaService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<respuesta> save(@RequestBody respuesta respuesta) {
        return ResponseEntity.ok().body(respuestaService.save(respuesta));
    }
}
