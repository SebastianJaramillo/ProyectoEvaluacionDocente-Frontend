


package com.microservicios.app.cursos.models.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.microservicios.app.estudiante.models.entity.Estudiante;

@Entity
@Table(name = "Curso")
public class Curso {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nombre;
	private String codigo;
	
	
	@ManyToMany(fetch = FetchType.LAZY)
	private List<Estudiante> estudiante;
	
	public List<Estudiante> getEstudiante() {
		return estudiante;
	}

	public void setEstudiante(List<Estudiante> estudiante) {
		this.estudiante = estudiante;
	}

	public Curso() {
		this.estudiante=new ArrayList<>();
	}
	public void addEstudiante(Estudiante estudiante) {
		this.estudiante.add(estudiante);
	}
	public void removeEstudiante(Estudiante estudiante) {
		this.estudiante.remove(estudiante);
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	
}