package com.microservicios.app.estudiante.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservicios.app.estudiante.models.entity.Estudiante;


public interface EstudianteRepository extends CrudRepository<Estudiante, Long> {

	@Query("select a from Estudiante a where a.nombre like %?1% or a.apellido like %?1%" )
	public List<Estudiante> findByNombreOrApellido(String term);

}
