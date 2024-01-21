package ec.edu.espe.microserviciodocente.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.model.Docente;
import ec.edu.espe.microserviciodocente.repository.DocenteRepository;

@Service
public class DocenteService {
    
    private final DocenteRepository docenteRepository;

    public DocenteService(DocenteRepository docenteRepository) {
        this.docenteRepository = docenteRepository;
    }

    public Docente save(Docente docente) {
        return docenteRepository.save(docente);
    }

    public Iterable<Docente> listAll() {
        return docenteRepository.findAll();
    }

    public Docente findById(String id) {
        Optional<Docente> optionalDocente = docenteRepository.findById(id);

        if (optionalDocente.isPresent()) {
            return optionalDocente.get();
        }

        throw new RuntimeException("Docente con ID: " + id + " no se encuentra.");
    }
}
