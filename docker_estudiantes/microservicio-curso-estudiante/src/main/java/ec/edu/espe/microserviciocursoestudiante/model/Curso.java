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
    @Column(name = "cur_nrc")
    private long nrc;

    @Column(name = "asig_id")
    private long asigId;

    @OneToOne
    @JoinColumn(name = "asig_id", referencedColumnName = "asig_id", insertable = false, updatable = false)
    private Asignatura asignatura;

    @Column(name = "cur_dias")
    private String dias;
    
    @Temporal(TemporalType.TIME)
    @Column(name = "cur_hora")
    private LocalTime hora;

    public long getNrc() {
        return nrc;
    }

    public void setNrc(long nrc) {
        this.nrc = nrc;
    }

    public long getAsigId() {
        return asigId;
    }

    public void setAsigId(long asigId) {
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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (nrc ^ (nrc >>> 32));
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
        if (nrc != other.nrc)
            return false;
        return true;
    }
}
