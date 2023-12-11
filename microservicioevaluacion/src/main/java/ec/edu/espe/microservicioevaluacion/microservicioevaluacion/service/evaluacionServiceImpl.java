package ec.edu.espe.microservicioevaluacion.microservicioevaluacion.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import ec.edu.espe.microservicioevaluacion.microservicioevaluacion.model.evaluacion;
import ec.edu.espe.microservicioevaluacion.microservicioevaluacion.repository.evaluacionRepository;
@Service
public class evaluacionServiceImpl implements evaluacionService {

    @Autowired
    private evaluacionRepository evaluacionRepository;

    @Override
    public evaluacion save(evaluacion evaluacion) {
        return evaluacionRepository.save(evaluacion);
    }

    @Override
    public List<evaluacion> listAll() {
        return evaluacionRepository.findAll();
    }

    @Override
    public evaluacion findById(long id) {
        Optional<evaluacion> optionalevaluacion = evaluacionRepository.findById(id);

        if(optionalevaluacion.isPresent()) {
            return optionalevaluacion.get();
        }

        throw new RuntimeException("evaluacion con ID: " + id + " no se encuentra.");
    }
}
