package com.microservicio.app.formulario.servicio;

import java.util.List;

import org.springframework.stereotype.Service;
import com.microservicio.app.formulario.model.Formulario;

@Service
public interface FormularioServicio {
	
	public List<Formulario> listAll();
	
	public List<Formulario> findByTipo(String tipo);	
}