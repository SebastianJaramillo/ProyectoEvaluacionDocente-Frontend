package ec.edu.espe.microservicioformulario.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microservicioformulario.repository.FormularioRepository;
import ec.edu.espe.microservicioformulario.model.Formulario;

@Service
public class FormularioService {

    private final FormularioRepository formularioRepository;

    public FormularioService(FormularioRepository formularioRepository) {
        this.formularioRepository = formularioRepository;
    }
    
    public Formulario save(Formulario formulario) {
        return this.formularioRepository.save(formulario);
    }
    
    public Iterable<Formulario> listAll() {
        return this.formularioRepository.findAll();
    }
    
    public Formulario findById(long id) {
        Optional<Formulario> optionalformulario = this.formularioRepository.findById(id);

        if (optionalformulario.isPresent()) {
            return optionalformulario.get();
        }

        throw new RuntimeException("Formulario con ID: " + id + " no se encuentra.");
    }

    public void eliminarById(Long id) {
        if (this.formularioRepository.existsById(id)) {
            this.formularioRepository.deleteById(id);
        } else {
            throw new RuntimeException("Formulario no encontrado con ID: " + id);
        }
    }
}
