package ec.edu.espe.microservicioevaluacion.domain;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {
    @Id		
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eval_id")
	private Long id;
	@Column(name = "eval_fecha_Inicio")
	private Date eval_fecha_Inicio;	

	@Column(name = "eval_fecha_Fin")
	private Date eval_fecha_Fin;	

	@ManyToOne(fetch = FetchType.LAZY)
	private Periodo per_id;

	public Evaluacion() {
	}
	
	public Evaluacion(Long id, Date eval_fecha_Inicio, Date eval_fecha_Fin, Periodo per_id) {
		this.id = id;
		this.eval_fecha_Inicio = eval_fecha_Inicio;
		this.eval_fecha_Fin = eval_fecha_Fin;
		this.per_id = per_id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getEval_fecha_Inicio() {
        return eval_fecha_Inicio;
    }

    public void setEval_fecha_Inicio(Date eval_fecha_Inicio) {
        this.eval_fecha_Inicio = eval_fecha_Inicio;
    }

    public Date getEval_fecha_Fin() {
        return eval_fecha_Fin;
    }

    public void setEval_fecha_Fin(Date eval_fecha_Fin) {
        this.eval_fecha_Fin = eval_fecha_Fin;
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
		Evaluacion other = (Evaluacion) obj;
		if (id != other.id)
			return false;
		return true;
	}

    public Periodo getPer_id() {
        return per_id;
    }

    public void setPer_id(Periodo per_id) {
        this.per_id = per_id;
    }
}
