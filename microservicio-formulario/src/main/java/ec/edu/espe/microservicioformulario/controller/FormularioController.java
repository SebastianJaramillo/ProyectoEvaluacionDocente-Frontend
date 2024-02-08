package ec.edu.espe.microservicioformulario.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ec.edu.espe.microservicioformulario.service.FormularioService;
import ec.edu.espe.microservicioformulario.model.Formulario;

@CrossOrigin
@RestController
@RequestMapping("/formulario")
public class FormularioController {

    private final FormularioService formularioService;

    public FormularioController(FormularioService formularioService) {
        this.formularioService = formularioService;
    }

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Formulario>> listAll() {
        return ResponseEntity.ok().body(this.formularioService.listAll());
    }
    
    @GetMapping("/buscar/{id}")
    public ResponseEntity<Formulario> findById(@PathVariable String id) {
        return ResponseEntity.ok().body(this.formularioService.findById(Long.parseLong(id)));
    }

    @PostMapping("/registro")
    public ResponseEntity<Formulario> save(@RequestBody Formulario formulario) {
        return ResponseEntity.ok().body(this.formularioService.save(formulario));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarById(@PathVariable String id) {
        this.formularioService.eliminarById(Long.parseLong(id));
         return ResponseEntity.ok().build();

    }
    
}
