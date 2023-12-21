package ec.edu.espe.microservicioevaluacion.service;

import java.util.List;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;

public interface EvaluacionService {

    public Evaluacion save(Evaluacion evaluacion);

    public List<Evaluacion> listAll();

    public Evaluacion findById(long id);
}
