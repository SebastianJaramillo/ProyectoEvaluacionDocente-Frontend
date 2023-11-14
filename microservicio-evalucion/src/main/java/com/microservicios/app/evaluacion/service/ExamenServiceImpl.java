package com.microservicios.app.evaluacion.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservicio.commons.service.CommonServiceImpl;
import com.microservicios.app.evaluacion.models.entity.Examen;
import com.microservicios.app.evaluacion.models.repository.ExamenRepository;

@Service
public class ExamenServiceImpl extends CommonServiceImpl<Examen,ExamenRepository> implements ExamenService {
	@Override
	@Transactional(readOnly=true)
	public List<Examen> findByNombre(String term){
		return repository.findByNombre(term);
	}
}