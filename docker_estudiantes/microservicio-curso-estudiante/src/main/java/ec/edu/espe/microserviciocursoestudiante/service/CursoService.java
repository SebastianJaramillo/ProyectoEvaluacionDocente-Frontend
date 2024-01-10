package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.model.Curso;
import ec.edu.espe.microserviciocursoestudiante.repository.CursoRepository;

@Service
public class CursoService {

    private final CursoRepository cursoRepository;

    public CursoService(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    public Curso save(Curso curso) {
        return this.cursoRepository.save(curso);
    }

    public Iterable<Curso> listAll() {
        return this.cursoRepository.findAll();
    }

    public Curso findByNrc(long nrc) {
        Optional<Curso> optionalCurso = this.cursoRepository.findById(nrc);

        if(optionalCurso.isPresent()) {
            return optionalCurso.get();
        }

        throw new RuntimeException("Curso con NRC: " + nrc + " no se encuentra.");
    }
}
