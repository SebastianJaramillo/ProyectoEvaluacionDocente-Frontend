package com.microservicios.app.cursos.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservicio.commons.service.CommonServiceImpl;
import com.microservicios.app.cursos.models.entity.Curso;
import com.microservicios.app.cursos.models.repository.CursosRepository;

@Service
public class CursoServiceImpl extends CommonServiceImpl<Curso, CursosRepository> implements CursoService {

	@Override
	@Transactional(readOnly = true)
	public Curso findCursoByEstudiante(Long id) {
		// TODO Auto-generated method stub
		return repository.findCursoByEstudiante(id);
	}
	
}