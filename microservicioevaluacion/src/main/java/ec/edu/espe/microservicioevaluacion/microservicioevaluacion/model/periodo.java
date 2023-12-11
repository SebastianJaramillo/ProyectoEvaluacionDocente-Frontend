package ec.edu.espe.microservicioevaluacion.microservicioevaluacion.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Table(name = "periodo")
public class periodo {
    @Id		
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "per_id")
	private long id;
	@Column(name = "descripcion")
	private String descripcion;	

	@Column(name = "estado")
	private String estado;	

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
		periodo other = (periodo) obj;
		if (id != other.id)
			return false;
		return true;
	}

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

}
