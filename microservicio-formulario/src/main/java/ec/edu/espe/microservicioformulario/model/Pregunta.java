package ec.edu.espe.microservicioformulario.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pregunta")
public class Pregunta {
	@Id
	@Column(name = "pre_id", nullable = false, length = 15)
	private String id;

	@Column(name = "pre_text")
	private String texto;

	@Column(name = "form_id")
	private long formId;

	@ManyToOne
    @JoinColumn(name = "form_id", referencedColumnName = "form_id", insertable = false, updatable = false)
    private Formulario formulario;

	public Pregunta() {
	}

	public Pregunta(String id, String texto, long formId, Formulario formulario) {
		this.id = id;
		this.texto = texto;
		this.formId = formId;
		this.formulario = formulario;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public long getFormId() {
		return formId;
	}

	public void setFormId(long formId) {
		this.formId = formId;
	}

	public Formulario getFormulario() {
		return formulario;
	}

	public void setFormulario(Formulario formulario) {
		this.formulario = formulario;
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
		Pregunta other = (Pregunta) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
}
