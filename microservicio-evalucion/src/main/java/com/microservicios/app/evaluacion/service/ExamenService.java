package com.microservicios.app.evaluacion.service;

import java.util.List;

import com.microservicio.commons.service.CommonService;
import com.microservicios.app.evaluacion.models.entity.Examen;

public interface ExamenService  extends CommonService<Examen> {
	public List<Examen> findByNombre(String term);
	
}