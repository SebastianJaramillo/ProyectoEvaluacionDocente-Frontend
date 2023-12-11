package ec.edu.espe.microservicioevaluacion.microservicioevaluacion.service;

import java.util.List;

import ec.edu.espe.microservicioevaluacion.microservicioevaluacion.model.evaluacion;

public interface evaluacionService {
    public evaluacion save(evaluacion evaluacion);

    public List<evaluacion> listAll();

    public evaluacion findById(long id);
}
