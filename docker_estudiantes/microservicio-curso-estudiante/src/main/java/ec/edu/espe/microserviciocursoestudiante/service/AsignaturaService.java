package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.model.Asignatura;
import ec.edu.espe.microserviciocursoestudiante.repository.AsignaturaRepository;

@Service
public class AsignaturaService {
    
    private final AsignaturaRepository asignaturaRepository;

    public AsignaturaService(AsignaturaRepository asignaturaRepository) {
        this.asignaturaRepository = asignaturaRepository;
    }
    
    public Asignatura save(Asignatura asignatura) {
        return this.asignaturaRepository.save(asignatura);
    }
    
    public Iterable<Asignatura> listAll() {
        return this.asignaturaRepository.findAll();
    }
    
    public Asignatura findById(long id) {
        Optional<Asignatura> optionalAsignatura = this.asignaturaRepository.findById(id);

        if(optionalAsignatura.isPresent()) {
            return optionalAsignatura.get();
        }

        throw new RuntimeException("Asignatura con ID: " + id + " no se encuentra.");
    }
}
