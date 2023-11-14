package com.microservicios.app.respuesta.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservicio.commons.controller.CommonController;
import com.microservicios.app.respuesta.models.entity.Respuesta;
import com.microservicios.app.respuesta.service.RespuestaService;

@RestController
public class RespuestaController extends CommonController<Respuesta, RespuestaService>{
	/*
	@Autowired
	private RespuestaService service;
	
	@PostMapping
	public ResponseEntity<?> crear(@RequestBody Iterable<Respuesta> respuestas) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.saveAll(respuestas));
	}*/
}
