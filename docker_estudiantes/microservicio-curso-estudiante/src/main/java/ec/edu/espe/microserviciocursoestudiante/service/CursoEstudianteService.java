package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciocursoestudiante.model.Curso;
import ec.edu.espe.microserviciocursoestudiante.model.CursoEstudiante;
import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;
import ec.edu.espe.microserviciocursoestudiante.repository.EstudianteRepository;
import ec.edu.espe.microserviciocursoestudiante.repository.CursoRepository;
import ec.edu.espe.microserviciocursoestudiante.repository.CursoEstudianteRepository;

@Service
public class CursoEstudianteService {
    private final CursoEstudianteRepository cursoEstudianteRepository;
    private final EstudianteRepository estudianteRepository;
    private final CursoRepository cursoRepository;

    public CursoEstudianteService(CursoEstudianteRepository cursoEstudianteRepository,
            EstudianteRepository estudianteRepository, CursoRepository cursoRepository) {
        this.cursoEstudianteRepository = cursoEstudianteRepository;
        this.estudianteRepository = estudianteRepository;
        this.cursoRepository = cursoRepository;
    }

    public List<CursoEstudiante> findByEstudiante(String estId, Long evalId) {
        return cursoEstudianteRepository.findByEstIdAndEvalIdOrderByCurNrc(estId, evalId);
    }

    public List<CursoEstudiante> findByCurso(Long curNrc) {
        return cursoEstudianteRepository.findByCurNrc(curNrc);
    }

    public CursoEstudiante addCursoEstudiante(CursoEstudiante cursoEstudiante) {
        Optional<Curso> optionalCurso = this.cursoRepository.findById(cursoEstudiante.getCurNrc());

        if (optionalCurso.isPresent()) {
            Optional<Estudiante> optionalEstudiante = this.estudianteRepository.findById(cursoEstudiante.getEstId());

            if(optionalEstudiante.isPresent()) {
                Optional<CursoEstudiante> optionalCursoEstudiante = this.cursoEstudianteRepository.findByCurNrcAndEstId(cursoEstudiante.getCurNrc(), cursoEstudiante.getEstId());
                if(!optionalCursoEstudiante.isPresent()) {
                    cursoEstudiante.setEval_estado("NO INICIADO");
                    return this.cursoEstudianteRepository.save(cursoEstudiante);
                } else {
                    throw new RuntimeException("Estudiante con ID: " + cursoEstudiante.getEstId() + " ya ha sido asignado a Curso con NRC: " + cursoEstudiante.getCurNrc());
                }
            } else {
                throw new RuntimeException("Estudiante con ID: " + cursoEstudiante.getEstId() + " no existe.");
            }
        } else {
            throw new RuntimeException("Curso con NRC: " + cursoEstudiante.getCurNrc() + " no existe.");
        }        
    }

    public CursoEstudiante updateEstadoEval(Long id) {
        Optional<CursoEstudiante> optionalCursoEstudiante = this.cursoEstudianteRepository.findById(id);

        if (optionalCursoEstudiante.isPresent()) {
            optionalCursoEstudiante.get().setEval_estado("TERMINADA");
            return this.cursoEstudianteRepository.save(optionalCursoEstudiante.get());
        } else {
            throw new RuntimeException("No se pudo encontrar estudiante en ese NRC para evaluacion.");
        }        
    }
}
