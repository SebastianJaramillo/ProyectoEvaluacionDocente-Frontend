package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;
import ec.edu.espe.microserviciocursoestudiante.domain.Curso;
import ec.edu.espe.microserviciocursoestudiante.domain.Estudiante;

public interface EstudianteService {

    public Estudiante save(Estudiante estudiante);

    public List<Estudiante> listAll();

    public Estudiante findById(String id);

    public Estudiante addCursosEstudiante(String id, Long nrc);

    public List<Curso> findCursosByEstudiante(String id);
}
