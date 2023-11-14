package com.microservicios.app.cursos.service;

import com.microservicio.commons.service.CommonService;
import com.microservicios.app.cursos.models.entity.Curso;

public interface CursoService extends CommonService<Curso> {
	public Curso findCursoByEstudiante(Long id);
}