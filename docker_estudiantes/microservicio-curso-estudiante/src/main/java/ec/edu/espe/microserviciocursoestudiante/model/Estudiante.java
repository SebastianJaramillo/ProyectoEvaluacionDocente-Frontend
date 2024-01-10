package ec.edu.espe.microserviciocursoestudiante.model;

import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "estudiante")
public class Estudiante {
	@Id
	@Column(name = "est_id", nullable = false, length = 15)
	private String id;

	@Column(name = "est_nombres", nullable = false, length = 50)
	private String nombres;

	@Column(name = "est_apellidos", nullable = false, length = 50)
	private String apellidos;

	@ManyToMany
	@JoinTable(
		name = "curso_estudiante", joinColumns = @JoinColumn(name = "est_id", referencedColumnName = "est_id"), 
		inverseJoinColumns = @JoinColumn(name = "cur_nrc", referencedColumnName = "cur_nrc") )
	private List<Curso> cursos;

	public Estudiante() {
	}

	public Estudiante(String id, String nombres, String apellidos) {
		this.id = id;
		this.nombres = nombres;
		this.apellidos = apellidos;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
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

	public List<Curso> getCursos() {
		return cursos;
	}

	public void setCursos(List<Curso> cursos) {
		this.cursos = cursos;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
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
		Estudiante other = (Estudiante) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
