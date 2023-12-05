package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.model.Asignatura;
import ec.edu.espe.microserviciocursoestudiante.repository.AsignaturaRepository;

@Service
public class AsignaturaServiceImpl implements AsignaturaService {

    @Autowired
    private AsignaturaRepository asignaturaRepository;

    @Override
    public Asignatura save(Asignatura asignatura) {
        return asignaturaRepository.save(asignatura);
    }

    @Override
    public List<Asignatura> listAll() {
        return asignaturaRepository.findAll();
    }

    @Override
    public Asignatura findById(long id) {
        Optional<Asignatura> optionalAsignatura = asignaturaRepository.findById(id);

        if(optionalAsignatura.isPresent()) {
            return optionalAsignatura.get();
        }

        throw new RuntimeException("Asignatura con ID: " + id + " no se encuentra.");
    }
}
