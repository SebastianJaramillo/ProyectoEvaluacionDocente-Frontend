package ec.edu.espe.microservicioevaluacion.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import ec.edu.espe.microservicioevaluacion.domain.Periodo;
import ec.edu.espe.microservicioevaluacion.repository.PeriodoRepository;

@Service
public class PeriodoServiceImpl implements PeriodoService {

    @Autowired
    private PeriodoRepository periodoRepository;

    @Override
    public Periodo save(Periodo periodo) {
        return periodoRepository.save(periodo);
    }

    @Override
    public List<Periodo> listAll() {
        return periodoRepository.findAll();
    }

    @Override
    public Periodo findById(long id) {
        Optional<Periodo> optionalPeriodo = periodoRepository.findById(id);

        if(optionalPeriodo.isPresent()) {
            return optionalPeriodo.get();
        }

        throw new RuntimeException("Periodo con ID: " + id + " no se encuentra.");
    }
}
