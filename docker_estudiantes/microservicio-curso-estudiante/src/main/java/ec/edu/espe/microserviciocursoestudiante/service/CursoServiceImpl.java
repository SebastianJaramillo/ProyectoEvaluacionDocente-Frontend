package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.domain.Curso;
import ec.edu.espe.microserviciocursoestudiante.repository.CursoRepository;

@Service
public class CursoServiceImpl implements CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Override
    public Curso save(Curso curso) {
        return cursoRepository.save(curso);
    }

    @Override
    public List<Curso> listAll() {
        return cursoRepository.findAll();
    }

    @Override
    public Curso findByNrc(long nrc) {
        Optional<Curso> optionalCurso = cursoRepository.findById(nrc);

        if(optionalCurso.isPresent()) {
            return optionalCurso.get();
        }

        throw new RuntimeException("Curso con NRC: " + nrc + " no se encuentra.");
    }
}
