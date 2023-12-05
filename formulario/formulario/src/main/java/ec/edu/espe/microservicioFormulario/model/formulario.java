package ec.edu.espe.microservicioFormulario.model;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
@Table(name = "formulario")
public class formulario {
    @Id		
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "form_id")
	private long id;
	@Column(name = "form_nombre")
	private String nombre;	

	@Column(name = "descripcion")
	private String descripcion;	

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getdescripcion() {
		return descripcion;
	}

	public void setdescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		formulario other = (formulario) obj;
		if (id != other.id)
			return false;
		return true;
	}
}
