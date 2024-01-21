package ec.edu.espe.microserviciodocente.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.model.Funcion;
import ec.edu.espe.microserviciodocente.repository.FuncionRepository;

@Service
public class FuncionService {
    
    private final FuncionRepository funcionRepository;

    public FuncionService(FuncionRepository funcionRepository) {
        this.funcionRepository = funcionRepository;
    }

    public Funcion save(Funcion funcion) {
        return funcionRepository.save(funcion);
    }

    public Iterable<Funcion> listAll() {
        return funcionRepository.findAll();
    }

    public Funcion findById(String id) {
        Optional<Funcion> optionalFuncion = funcionRepository.findById(id);

        if (optionalFuncion.isPresent()) {
            return optionalFuncion.get();
        }

        throw new RuntimeException("Función con id: " + id + " no se encuentra.");
    }
}
