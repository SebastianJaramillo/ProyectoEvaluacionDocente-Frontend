package ec.edu.espe.microservicioFormulario.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "respuesta")
public class respuesta {
  @Id		
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "res_id")
	private long id;
	@Column(name = "res_texto")
	private String res_texto;	

	@OneToOne(fetch = FetchType.LAZY)
	private pregunta pregunta;


	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
		respuesta other = (respuesta) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public String getRes_texto() {
		return res_texto;
	}

	public void setRes_texto(String res_texto) {
		this.res_texto = res_texto;
	}

	public pregunta getPregunta() {
		return pregunta;
	}

	public void setPregunta(pregunta pregunta) {
		this.pregunta = pregunta;
	}
}
