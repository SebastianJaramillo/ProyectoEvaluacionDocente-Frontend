package com.microservicio.app.formulario.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.microservicio.app.formulario.model.Formulario;
import com.microservicio.app.formulario.servicio.FormularioServicio;

@RestController
public class FormularioController {

	@Autowired
    private FormularioServicio formularioServicio;

	@GetMapping("/formulario")
    public List<Formulario> listAll() {
        return formularioServicio.listAll();
    }
	
    @GetMapping("/formulario/{tipo}")
    public List<Formulario> findByTipo(@PathVariable String tipo) {
        return formularioServicio.findByTipo(tipo);
    }
}
