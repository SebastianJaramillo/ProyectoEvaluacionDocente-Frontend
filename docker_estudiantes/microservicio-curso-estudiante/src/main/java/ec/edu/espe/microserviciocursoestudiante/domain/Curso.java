package ec.edu.espe.microserviciocursoestudiante.domain;

import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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

    @ManyToMany(mappedBy = "cursos")
    private List<Estudiante> estudiantes;

    public Curso() {
    }

    public Curso(Long nrc, Long asigId, Asignatura asignatura, String dias, LocalTime hora) {
        this.nrc = nrc;
        this.asigId = asigId;
        this.asignatura = asignatura;
        this.dias = dias;
        this.hora = hora;
    }

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

    public List<Estudiante> getEstudiantes() {
        return estudiantes;
    }

    public void setEstudiantes(List<Estudiante> estudiantes) {
        this.estudiantes = estudiantes;
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
