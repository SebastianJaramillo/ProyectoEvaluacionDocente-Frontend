package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.domain.Curso;
import ec.edu.espe.microserviciocursoestudiante.domain.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.repository.CursoRepository;
import ec.edu.espe.microserviciocursoestudiante.repository.EstudianteRepository;

@Service
public class EstudianteServiceImpl implements EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;
    @Autowired
    private CursoRepository cursoRepository;

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

        if (optionalEstudiante.isPresent()) {
            return optionalEstudiante.get();
        }

        throw new RuntimeException("Estudiante con ID: " + id + " no se encuentra.");
    }

    @Override
    public Estudiante addCursosEstudiante(String id, Long nrc) {
        Optional<Estudiante> estudianteOptional = estudianteRepository.findById(id);
        if (estudianteOptional.isEmpty()) {
            throw new NoSuchElementException("No se encontró estudiante con ID: " + id);
        }

        Optional<Curso> cursoOptional = cursoRepository.findById(nrc);
        if (cursoOptional.isEmpty()) {
            throw new NoSuchElementException("No se encontró curso con NRC: " + nrc);
        }

        Estudiante estudiante = estudianteOptional.get();
        Curso curso = cursoOptional.get();

        List<Curso> cursos = estudiante.getCursos();

        if (cursos.contains(curso)) {
            throw new IllegalArgumentException("El estudiante ya está registrado en el NRC: " + nrc);
        }

        cursos.add(curso);
        estudiante.setCursos(cursos);
        return estudianteRepository.save(estudiante);
    }

    @Override
    public List<Curso> findCursosByEstudiante(String id) {
        Optional<Estudiante> estudianteOptional = estudianteRepository.findById(id);

        if (estudianteOptional.isPresent()) {
            return estudianteOptional.get().getCursos();
        } else {
            return Collections.emptyList();
        }
    }
}
