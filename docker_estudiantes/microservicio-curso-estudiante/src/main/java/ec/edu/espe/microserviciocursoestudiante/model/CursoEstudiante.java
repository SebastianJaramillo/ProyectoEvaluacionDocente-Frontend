package ec.edu.espe.microserviciocursoestudiante.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;

@Entity
@Table(name = "curso_estudiante")
public class CursoEstudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cur_est_codigo", nullable = false)
    private Long id;

    @Column(name = "est_id", nullable = false)
    private String estId;

    @Column(name = "cur_nrc", nullable = false)
    private Long curNrc;

    @Column(name = "eval_id")
    private Long evalId;

    @Column(name = "eval_estado", nullable = false, length = 20)
    private String eval_estado;

    @ManyToOne
    @JoinColumn(name = "est_id", insertable = false, updatable = false)
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "cur_nrc", insertable = false, updatable = false)
    private Curso curso;

    @Version
    private Long version;

    public CursoEstudiante() {
    }

    public CursoEstudiante(Long id, String estId, Long curNrc, Long evalId, String eval_estado, Estudiante estudiante,
            Curso curso, Long version) {
        this.id = id;
        this.estId = estId;
        this.curNrc = curNrc;
        this.evalId = evalId;
        this.eval_estado = eval_estado;
        this.estudiante = estudiante;
        this.curso = curso;
        this.version = version;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEstId() {
        return estId;
    }

    public void setEstId(String estId) {
        this.estId = estId;
    }

    public Long getCurNrc() {
        return curNrc;
    }

    public void setCurNrc(Long curNrc) {
        this.curNrc = curNrc;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Long getEvalId() {
        return evalId;
    }

    public void setEvalId(Long evalId) {
        this.evalId = evalId;
    }

    public String getEval_estado() {
        return eval_estado;
    }

    public void setEval_estado(String eval_estado) {
        this.eval_estado = eval_estado;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
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
        CursoEstudiante other = (CursoEstudiante) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
