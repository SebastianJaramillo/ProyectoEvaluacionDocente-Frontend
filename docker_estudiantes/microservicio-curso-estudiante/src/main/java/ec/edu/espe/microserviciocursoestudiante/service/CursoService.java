package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;

import ec.edu.espe.microserviciocursoestudiante.model.Curso;

public interface CursoService {

    public Curso save(Curso curso);

    public List<Curso> listAll();

    public Curso findByNrc(long nrc);
}
