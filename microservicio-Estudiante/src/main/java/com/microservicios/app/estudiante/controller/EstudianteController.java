package com.microservicios.app.estudiante.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservicio.commons.controller.CommonController;
import com.microservicios.app.estudiante.models.entity.Estudiante;
import com.microservicios.app.estudiante.service.EstudianteService;

@RestController
public class EstudianteController extends CommonController<Estudiante,EstudianteService> {

	@PutMapping("/{id}")
	public ResponseEntity<?> editar(@RequestBody Estudiante estudiante, @PathVariable Long id){
		Optional<Estudiante> o = service.findById(id);
		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Estudiante estudianteDB = o.get();
		estudianteDB.setNombres(estudiante.getNombres());
		estudianteDB.setApellidos(estudiante.getApellidos());
		estudianteDB.setIdestudiante(estudiante.getIdestudiante());
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(estudianteDB));
				}
	
	@GetMapping("/filtrar/{term}")
	public ResponseEntity<?> filtrar(@PathVariable String term){
		return ResponseEntity.ok(service.findByNombreOrApellido(term));
	}
}
