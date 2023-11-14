package com.microservicios.app.respuesta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservicio.commons.service.CommonServiceImpl;
import com.microservicios.app.respuesta.models.entity.Respuesta;
import com.microservicios.app.respuesta.models.repository.RespuestaRepository;

@Service
public class RespuestaServiceImpl extends CommonServiceImpl<Respuesta,RespuestaRepository> implements RespuestaService{
	@Autowired
	private RespuestaRepository repository;
	
	@Override
	@Transactional
	public Iterable<Respuesta> saveAll(Iterable<Respuesta> respuestas) {
		
		return repository.saveAll(respuestas);
	}


	
}
