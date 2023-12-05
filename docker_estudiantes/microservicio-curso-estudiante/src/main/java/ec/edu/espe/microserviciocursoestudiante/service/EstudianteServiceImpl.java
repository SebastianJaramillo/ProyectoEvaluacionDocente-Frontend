package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.repository.EstudianteRepository;

@Service
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Override
    public Estudiante save(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public List<Estudiante> listAll() {
        return estudianteRepository.findAll();
    }

    @Override
    public Estudiante findById(String id) {
        Optional<Estudiante> optionalEstudiante = estudianteRepository.findById(id);

        if(optionalEstudiante.isPresent()) {
            return optionalEstudiante.get();
        }

        throw new RuntimeException("Estudiante con ID: " + id + " no se encuentra.");
    }
}
