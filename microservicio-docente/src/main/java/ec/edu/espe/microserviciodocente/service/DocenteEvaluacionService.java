package ec.edu.espe.microserviciodocente.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.model.Docente;
import ec.edu.espe.microserviciodocente.model.DocenteEvaluacion;
import ec.edu.espe.microserviciodocente.repository.DocenteEvaluacionRepository;
import ec.edu.espe.microserviciodocente.repository.DocenteRepository;

@Service
public class DocenteEvaluacionService {
    private final DocenteEvaluacionRepository docenteEvaluacionRepository;
    private final DocenteRepository docenteRepository;

    public DocenteEvaluacionService(DocenteEvaluacionRepository docenteEvaluacionRepository,
            DocenteRepository docenteRepository) {
        this.docenteEvaluacionRepository = docenteEvaluacionRepository;
        this.docenteRepository = docenteRepository;
    }

    public List<DocenteEvaluacion> findByDocEvaluador(String docEvaluador) {
        return docenteEvaluacionRepository.findByDocEvaluador(docEvaluador);
    }

    public List<DocenteEvaluacion> findByDocEvaluado(String docEvaluado) {
        return docenteEvaluacionRepository.findByDocEvaluado(docEvaluado);
    }

    public DocenteEvaluacion findByEvaluacion(String docEvaluador, String docEvaluado, Long evalId) {
        return docenteEvaluacionRepository.findByDocEvaluadorAndDocEvaluadoAndEvalId(docEvaluador, docEvaluado, evalId)
                .get();
    }

    public DocenteEvaluacion save(DocenteEvaluacion docenteEvaluacion) {
        Optional<Docente> evaluador = docenteRepository.findById(docenteEvaluacion.getDocEvaluador());

        if (evaluador.isPresent()) {
            Optional<Docente> evaluado = docenteRepository.findById(docenteEvaluacion.getDocEvaluado());

            if (evaluado.isPresent()) {
                docenteEvaluacion.setEstado("TERMINADA");
                return docenteEvaluacionRepository.save(docenteEvaluacion);
            } else {
                throw new RuntimeException("Docente evaluado: " + docenteEvaluacion.getDocEvaluado() + " no existe.");
            }
        } else {
            throw new RuntimeException("Docente evaluador: " + docenteEvaluacion.getDocEvaluador() + " no existe.");
        }
    }
}
