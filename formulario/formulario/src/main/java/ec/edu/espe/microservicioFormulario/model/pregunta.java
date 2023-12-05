package ec.edu.espe.microservicioFormulario.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pregunta")
public class pregunta {
 @Id		
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pre_id")
	private long id;
	@Column(name = "text_preg")
	private String text_preg;	

	@ManyToOne(fetch = FetchType.LAZY)
	private formulario form_id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTextPreg() {
		return text_preg;
	}

	public void setTextPreg(String text_preg) {
		this.text_preg = text_preg;
	}

	
	public formulario getForm_id() {
		return form_id;
	}

	public void setForm_id(formulario form_id) {
		this.form_id = form_id;
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
		pregunta other = (pregunta) obj;
		if (id != other.id)
			return false;
		return true;
	}
}
