package com.microservicios.app.evaluacion.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservicios.app.evaluacion.models.entity.Examen;

public interface ExamenRepository extends CrudRepository<Examen,Long> {
	@Query("select a from Examen a where a.nombre like %?1% " )
	public List<Examen> findByNombre(String term);

}
