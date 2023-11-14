package com.microservicios.app.cursos.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservicio.commons.controller.CommonController;
import com.microservicios.app.cursos.models.entity.Curso;
import com.microservicios.app.cursos.service.CursoService;
import com.microservicios.app.estudiante.models.entity.Estudiante;

@RestController
public class CursoController extends CommonController<Curso, CursoService>{

	@PutMapping("/id")
	public ResponseEntity<?> editar(@RequestBody Curso curso, @PathVariable Long id) {
		Optional<Curso> o = this.service.findById(id);
		if (o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Curso dbcurso = o.get();
		dbcurso.setNombre(curso.getNombre());
		dbcurso.setCodigo(curso.getCodigo());
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dbcurso));

	}
	
	@PutMapping("/{id}/asignar-estudiantes")
	public ResponseEntity<?> asignarEstudiantes(@RequestBody List<Estudiante> estudiantes, @PathVariable Long id){
		Optional<Curso> o = this.service.findById(id);
		if(o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Curso dbCurso = o.get();
		estudiantes.forEach(a ->{
			dbCurso.addEstudiante(a);
				
		});
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(dbCurso));
	}
	
	@PutMapping("/{id}/eliminar-estudiante")
	public ResponseEntity<?> editar(@RequestBody Estudiante estudiante, @PathVariable Long id){
		Optional<Curso> o = this.service.findById(id);
		if(o.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Curso dbCurso = o.get();
		dbCurso.removeEstudiante(estudiante);
		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(dbCurso));
	}
	
	@GetMapping("/estudiantes/{id}")
	public ResponseEntity<?> buscarPorEstudiante(@PathVariable Long id){
		Curso curso = service.findCursoByEstudiante(id);
		return ResponseEntity.ok(curso);
	}
	
}
