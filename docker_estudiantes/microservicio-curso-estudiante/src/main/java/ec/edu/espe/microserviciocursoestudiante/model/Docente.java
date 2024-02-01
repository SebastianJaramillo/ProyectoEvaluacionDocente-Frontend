package ec.edu.espe.microserviciocursoestudiante.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "docente")
public class Docente {
    @Id
    @Column(name = "doc_id", nullable = false, length = 15)
    private String id;

    @Column(name = "doc_cedula", nullable = false, length = 10)
    private String cedula;

    @Column(name = "doc_nombres", nullable = false, length = 50)
    private String nombres;

    @Column(name = "doc_apellidos", nullable = false, length = 50)
    private String apellidos;

    @Column(name = "doc_campus", length = 50)
    private String campus;

    @Column(name = "doc_departamento", length = 50)
    private String departamento;

    @Column(name = "doc_escalafon", length = 50)
    private String escalafon;

    public Docente() {
    }

    public Docente(String id, String cedula, String nombres, String apellidos, String campus, String departamento,
            String escalafon) {
        this.id = id;
        this.cedula = cedula;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.campus = campus;
        this.departamento = departamento;
        this.escalafon = escalafon;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCampus() {
        return campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getEscalafon() {
        return escalafon;
    }

    public void setEscalafon(String escalafon) {
        this.escalafon = escalafon;
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
        Docente other = (Docente) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
