package ec.edu.espe.microservicioevaluacion.service;

import java.util.List;

import ec.edu.espe.microservicioevaluacion.domain.Periodo;

public interface PeriodoService {

    public Periodo save(Periodo periodo);

    public List<Periodo> listAll();

    public Periodo findById(long id);
}
