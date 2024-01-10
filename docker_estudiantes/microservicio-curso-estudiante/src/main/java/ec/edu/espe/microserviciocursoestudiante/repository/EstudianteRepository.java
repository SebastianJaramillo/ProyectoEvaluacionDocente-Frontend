package ec.edu.espe.microserviciocursoestudiante.repository;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;

public interface EstudianteRepository extends CrudRepository<Estudiante, String> {

}
