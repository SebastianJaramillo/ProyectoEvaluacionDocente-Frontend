package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;

import ec.edu.espe.microserviciocursoestudiante.model.Asignatura;

public interface AsignaturaService {

    public Asignatura save(Asignatura asignatura);

    public List<Asignatura> listAll();

    public Asignatura findById(long id);
}
