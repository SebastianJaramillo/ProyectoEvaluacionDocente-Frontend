package ec.edu.espe.microservicioevaluacion.service;

import java.util.Optional;
import org.springframework.stereotype.Service;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;
import ec.edu.espe.microservicioevaluacion.repository.EvaluacionRepository;

@Service
public class EvaluacionService {

    private final EvaluacionRepository evaluacionRepository;

    public EvaluacionService(EvaluacionRepository evaluacionRepository) {
        this.evaluacionRepository = evaluacionRepository;
    }

    public Evaluacion save(Evaluacion evaluacion) {
        return this.evaluacionRepository.save(evaluacion);
    }

    public Iterable<Evaluacion> listAll() {
        return this.evaluacionRepository.findAll();
    }

    public Evaluacion findById(long id) {
        Optional<Evaluacion> optionalevaluacion = this.evaluacionRepository.findById(id);

        if(optionalevaluacion.isPresent()) {
            return optionalevaluacion.get();
        }

        throw new RuntimeException("evaluacion con ID: " + id + " no se encuentra.");
    }
}
