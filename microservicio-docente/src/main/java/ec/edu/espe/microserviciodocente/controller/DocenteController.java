package ec.edu.espe.microserviciodocente.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.edu.espe.microserviciodocente.domain.Docente;
import ec.edu.espe.microserviciodocente.service.DocenteService;

@RestController
@RequestMapping("/docente")
public class DocenteController {

    @Autowired
    private DocenteService docenteService;

    @GetMapping("/listar")
    public ResponseEntity<List<Docente>> listAll() {
        return ResponseEntity.ok().body(docenteService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Docente> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(docenteService.findById(id));
    }

    @PostMapping("/registro")
    public ResponseEntity<Docente> save(@RequestBody Docente docennte) {
        return ResponseEntity.ok().body(docenteService.save(docennte));
    }
}
