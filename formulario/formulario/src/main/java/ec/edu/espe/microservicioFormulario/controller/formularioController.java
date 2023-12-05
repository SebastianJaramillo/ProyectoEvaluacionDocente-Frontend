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
import ec.edu.espe.microservicioFormulario.service.formularioService;
import ec.edu.espe.microservicioFormulario.model.formulario;
@RestController
@RequestMapping("/formulario")
public class formularioController {

    @Autowired
    private formularioService formularioService;

    @GetMapping("/listar")
    public ResponseEntity<List<formulario>> listAll() {
        return ResponseEntity.ok().body(formularioService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<formulario> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(formularioService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<formulario> save(@RequestBody formulario formulario) {
        return ResponseEntity.ok().body(formularioService.save(formulario));
    }
}
