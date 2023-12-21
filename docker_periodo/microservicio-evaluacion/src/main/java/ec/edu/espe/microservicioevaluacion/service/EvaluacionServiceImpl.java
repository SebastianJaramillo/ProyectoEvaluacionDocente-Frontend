package ec.edu.espe.microservicioevaluacion.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;
import ec.edu.espe.microservicioevaluacion.repository.EvaluacionRepository;

@Service
public class EvaluacionServiceImpl implements EvaluacionService {

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    @Override
    public Evaluacion save(Evaluacion evaluacion) {
        return evaluacionRepository.save(evaluacion);
    }

    @Override
    public List<Evaluacion> listAll() {
        return evaluacionRepository.findAll();
    }

    @Override
    public Evaluacion findById(long id) {
        Optional<Evaluacion> optionalevaluacion = evaluacionRepository.findById(id);

        if(optionalevaluacion.isPresent()) {
            return optionalevaluacion.get();
        }

        throw new RuntimeException("evaluacion con ID: " + id + " no se encuentra.");
    }
}
