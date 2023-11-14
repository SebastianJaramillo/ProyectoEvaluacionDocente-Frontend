package com.microservicios.app.cursos.models.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservicios.app.cursos.models.entity.Curso;

public interface CursosRepository extends CrudRepository<Curso, Long> {
	@Query("select c from Curso c join fetch c.estudiante a where a.id=?1")
	public Curso findCursoByEstudiante(Long id);
}

