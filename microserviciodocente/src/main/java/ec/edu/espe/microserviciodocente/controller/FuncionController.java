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

import ec.edu.espe.microserviciodocente.domain.Funcion;
import ec.edu.espe.microserviciodocente.service.FuncionService;

@RestController
@RequestMapping("/funcion")
public class FuncionController {
    
    @Autowired
    private FuncionService funcionService;

    @GetMapping("/listar")
    public ResponseEntity<List<Funcion>> listAll() {
        return ResponseEntity.ok().body(funcionService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Funcion> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(funcionService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<Funcion> save(@RequestBody Funcion funcion) {
        return ResponseEntity.ok().body(funcionService.save(funcion));
    }
}
