package com.microservicio.app.formulario.repositorio;

import java.util.List;

import com.microservicio.app.formulario.model.Formulario;

public interface FormularioDao {
	
	public List<Formulario> listAll();
	
	public List<Formulario> findByTipo(String tipo);
}
