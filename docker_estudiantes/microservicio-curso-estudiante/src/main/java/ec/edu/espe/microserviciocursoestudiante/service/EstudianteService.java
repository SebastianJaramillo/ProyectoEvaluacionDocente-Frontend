package ec.edu.espe.microserviciocursoestudiante.service;

import java.util.List;

import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;

public interface EstudianteService {

    public Estudiante save(Estudiante estudiante);

    public List<Estudiante> listAll();

    public Estudiante findById(String id);
}
