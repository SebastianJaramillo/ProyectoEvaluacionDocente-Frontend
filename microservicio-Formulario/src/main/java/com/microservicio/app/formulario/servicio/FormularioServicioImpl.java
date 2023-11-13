package com.microservicio.app.formulario.servicio;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.microservicio.app.formulario.model.Formulario;
import com.microservicio.app.formulario.repositorio.FormularioDao;

@Service
public class FormularioServicioImpl implements FormularioServicio {
	
	@Autowired
    private FormularioDao formularioDao;
	
	@Override
	public List<Formulario> listAll() {
		return formularioDao.listAll();
	}
	
	@Override
	public List<Formulario> findByTipo(String tipo) {
		return formularioDao.findByTipo(tipo);
	}
}