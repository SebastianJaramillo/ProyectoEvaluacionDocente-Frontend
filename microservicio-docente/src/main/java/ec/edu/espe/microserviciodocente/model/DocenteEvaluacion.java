package ec.edu.espe.microserviciodocente.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "docente_evaluacion")
public class DocenteEvaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_eval_codigo", nullable = false)
    private Long id;

    @Column(name = "doc_evaluador", nullable = false)
    private String docEvaluador;

    @Column(name = "doc_evaluado", nullable = false)
    private String docEvaluado;

    @Column(name = "eval_id")
    private Long evalId;

    @Column(name = "eval_estado", nullable = false, length = 20)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "doc_evaluador", insertable = false, updatable = false)
    private Docente evaluador;

    @ManyToOne
    @JoinColumn(name = "doc_evaluado", insertable = false, updatable = false)
    private Docente evaluado;

    public DocenteEvaluacion() {
    }

    public DocenteEvaluacion(Long id, String docEvaluador, String docEvaluado, Long evalId, String estado,
            Docente evaluador, Docente evaluado) {
        this.id = id;
        this.docEvaluador = docEvaluador;
        this.docEvaluado = docEvaluado;
        this.evalId = evalId;
        this.estado = estado;
        this.evaluador = evaluador;
        this.evaluado = evaluado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocEvaluador() {
        return docEvaluador;
    }

    public void setDocEvaluador(String docEvaluador) {
        this.docEvaluador = docEvaluador;
    }

    public String getDocEvaluado() {
        return docEvaluado;
    }

    public void setDocEvaluado(String docEvaluado) {
        this.docEvaluado = docEvaluado;
    }

    public Long getEvalId() {
        return evalId;
    }

    public void setEvalId(Long evalId) {
        this.evalId = evalId;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Docente getEvaluador() {
        return evaluador;
    }

    public void setEvaluador(Docente evaluador) {
        this.evaluador = evaluador;
    }

    public Docente getEvaluado() {
        return evaluado;
    }

    public void setEvaluado(Docente evaluado) {
        this.evaluado = evaluado;
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
        DocenteEvaluacion other = (DocenteEvaluacion) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
