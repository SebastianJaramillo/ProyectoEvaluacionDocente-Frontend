package com.microservicios.app.estudiante.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.microservicio.commons.service.CommonServiceImpl;
import com.microservicios.app.estudiante.models.entity.Estudiante;
import com.microservicios.app.estudiante.models.repository.EstudianteRepository;


@Service
public class EstudianteServiceImpl extends CommonServiceImpl<Estudiante,EstudianteRepository> implements EstudianteService {
	@Override
	public List<Estudiante> findByNombreOrApellido(String term){
		return repository.findByNombreOrApellido(term);
	
}
}
