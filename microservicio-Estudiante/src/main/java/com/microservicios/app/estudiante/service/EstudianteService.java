package com.microservicios.app.estudiante.service;

import java.util.List;

import com.microservicio.commons.service.CommonService;
import com.microservicios.app.estudiante.models.entity.Estudiante;


public interface EstudianteService extends CommonService<Estudiante>  {

	public List<Estudiante> findByNombreOrApellido(String term);
}
