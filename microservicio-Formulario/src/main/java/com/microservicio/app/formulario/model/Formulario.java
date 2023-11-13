package com.microservicio.app.formulario.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="Formulario")
public class Formulario {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long formId;
	
	private String formTipo;	
	private String formDescripcion;				
	
	public Long getFormId() {
		return formId;
	}
	
	public void setFormId(Long formId) {
		this.formId = formId;
	}
	
	public String getFormTipo() {
		return formTipo;
	}
	
	public void setFormTipo(String formTipo) {
		this.formTipo = formTipo;
	}
	
	public String getFormDescripcion() {
		return formDescripcion;
	}
	
	public void setFormDescripcion(String formDescripcion) {
		this.formDescripcion = formDescripcion;
	}	
}
