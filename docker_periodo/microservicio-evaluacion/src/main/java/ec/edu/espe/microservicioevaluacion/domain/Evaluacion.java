package ec.edu.espe.microservicioevaluacion.domain;

import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eval_id")
	private Long id;

	@Column(name = "per_id", nullable = false)
	private Long perId;

	@Column(name = "eval_fecha_Inicio", nullable = false)
	private Date evalFechaInicio;

	@Column(name = "eval_fecha_Fin")
	private Date evalFechaFin;

	@Column(name = "eval_estado")
	private String estado;

	@ManyToOne
	@JoinColumn(name = "per_id", insertable = false, updatable = false)
	private Periodo periodo;

	public Evaluacion() {
	}

	public Evaluacion(Long id, Long perId, Date evalFechaInicio, Date evalFechaFin, String estado,
			Periodo periodo) {
		this.id = id;
		this.perId = perId;
		this.evalFechaInicio = evalFechaInicio;
		this.evalFechaFin = evalFechaFin;
		this.estado = estado;
		this.periodo = periodo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPerId() {
		return perId;
	}

	public void setPerId(Long perId) {
		this.perId = perId;
	}

	public Date getEvalFechaInicio() {
		return evalFechaInicio;
	}

	public void setEvalFechaInicio(Date evalFechaInicio) {
		this.evalFechaInicio = evalFechaInicio;
	}

	public Date getEvalFechaFin() {
		return evalFechaFin;
	}

	public void setEval_fecha_Fin(Date evalFechaFin) {
		this.evalFechaFin = evalFechaFin;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Periodo getPeriodo() {
		return periodo;
	}

	public void setPeriodo(Periodo periodo) {
		this.periodo = periodo;
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
}
