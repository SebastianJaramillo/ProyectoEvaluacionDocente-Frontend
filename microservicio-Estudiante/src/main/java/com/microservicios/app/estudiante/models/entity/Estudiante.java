package com.microservicios.app.estudiante.models.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;





@Entity
@Table (name="estudiante")
public class Estudiante {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    private String nombres;
    private String apellidos;
    private String idestudiante;
    private String usuario;
    private String password;


	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getNombres() {
		return nombres;
	}


	public void setNombres(String nombres) {
		this.nombres = nombres;
	}


	public String getApellidos() {
		return apellidos;
	}


	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}


	public String getIdestudiante() {
		return idestudiante;
	}


	public void setIdestudiante(String idestudiante) {
		this.idestudiante = idestudiante;
	}


	public String getUsuario() {
		return usuario;
	}


	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if(this == obj) {
			return true;
		}
		
		if(!(obj instanceof Estudiante)) {
			return false;
		}
		Estudiante a = (Estudiante)obj;
		return this.id != 0L && this.id == a.getId();
	}
	
}
