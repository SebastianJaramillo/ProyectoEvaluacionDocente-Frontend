package ec.edu.espe.microserviciocursoestudiante.model;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "curso")
public class Curso {
    @Id
    @Column(name = "cur_nrc", nullable = false, length = 8)
    private Long nrc;

    @Column(name = "asig_id", nullable = false, length = 5)
    private Long asigId;

    @OneToOne
    @JoinColumn(name = "asig_id", referencedColumnName = "asig_id", insertable = false, updatable = false)
    private Asignatura asignatura;

    @Column(name = "cur_dias")
    private String dias;

    @Temporal(TemporalType.TIME)
    @Column(name = "cur_hora")
    private LocalTime hora;

    @Column(name = "doc_id", nullable = false, length = 15)
    private String docId;

    @OneToOne
    @JoinColumn(name = "doc_id", insertable = false, updatable = false)
    private Docente docente;

    public Curso() {
    }

    public Curso(Long nrc, Long asigId, Asignatura asignatura, String dias, LocalTime hora, String docId) {
        this.nrc = nrc;
        this.asigId = asigId;
        this.asignatura = asignatura;
        this.dias = dias;
        this.hora = hora;
        this.docId = docId;
    }

    public Long getNrc() {
        return nrc;
    }

    public void setNrc(Long nrc) {
        this.nrc = nrc;
    }

    public Long getAsigId() {
        return asigId;
    }

    public void setAsigId(Long asigId) {
        this.asigId = asigId;
    }

    public Asignatura getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(Asignatura asignatura) {
        this.asignatura = asignatura;
    }

    public String getDias() {
        return dias;
    }

    public void setDias(String dias) {
        this.dias = dias;
    }

    public LocalTime getHora() {
        return hora;
    }

    public void setHora(LocalTime hora) {
        this.hora = hora;
    }

    public String getDocId() {
        return docId;
    }

    public void setDocId(String docId) {
        this.docId = docId;
    }

    public Docente getDocente() {
        return docente;
    }

    public void setDocente(Docente docente) {
        this.docente = docente;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((nrc == null) ? 0 : nrc.hashCode());
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
        Curso other = (Curso) obj;
        if (nrc == null) {
            if (other.nrc != null)
                return false;
        } else if (!nrc.equals(other.nrc))
            return false;
        return true;
    }
}
