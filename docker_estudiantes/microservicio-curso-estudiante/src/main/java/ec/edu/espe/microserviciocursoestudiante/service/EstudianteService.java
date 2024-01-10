package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.Optional;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.repository.EstudianteRepository;

@Service
public class EstudianteService {

    private final EstudianteRepository estudianteRepository;

    public EstudianteService(EstudianteRepository estudianteRepository) {
        this.estudianteRepository = estudianteRepository;
    }

    public Estudiante save(Estudiante estudiante) {
        return this.estudianteRepository.save(estudiante);
    }

    public Iterable<Estudiante> listAll() {
        return this.estudianteRepository.findAll();
    }

    public Estudiante findById(String id) {
        Optional<Estudiante> optionalEstudiante = this.estudianteRepository.findById(id);

        if (optionalEstudiante.isPresent()) {
            return optionalEstudiante.get();
        }

        throw new RuntimeException("Estudiante con ID: " + id + " no se encuentra.");
    }
}
