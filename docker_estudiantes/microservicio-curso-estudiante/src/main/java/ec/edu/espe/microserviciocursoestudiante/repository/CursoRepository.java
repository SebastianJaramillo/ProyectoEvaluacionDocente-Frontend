package ec.edu.espe.microserviciocursoestudiante.repository;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciocursoestudiante.model.Curso;

public interface CursoRepository extends CrudRepository<Curso, Long> {

}
