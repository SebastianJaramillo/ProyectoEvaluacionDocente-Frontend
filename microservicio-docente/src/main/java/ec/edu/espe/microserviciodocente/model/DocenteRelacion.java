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
@Table(name = "docente_relacion")
public class DocenteRelacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_rel_codigo", nullable = false)
    private Long codigo;

    @Column(name = "doc_id_jefe", nullable = false)
    private String docIdJefe;

    @Column(name = "doc_id_docente", nullable = false)
    private String docIdDocente;

    @Column(name = "doc_area", length = 20)
    private String area;

    @Column(name = "doc_rel_estado", nullable = false, length = 10)
    private String estado;
    
    @ManyToOne
    @JoinColumn(name = "doc_id_jefe", insertable = false, updatable = false)
    private Docente docenteJefe;

    @ManyToOne
    @JoinColumn(name = "doc_id_docente", insertable = false, updatable = false)
    private Docente docente;

    public DocenteRelacion() {
    }

    public DocenteRelacion(Long codigo, String docIdJefe, String docIdDocente, String area, String estado,
            Docente docenteJefe, Docente docente) {
        this.codigo = codigo;
        this.docIdJefe = docIdJefe;
        this.docIdDocente = docIdDocente;
        this.area = area;
        this.estado = estado;
        this.docenteJefe = docenteJefe;
        this.docente = docente;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public String getDocIdJefe() {
        return docIdJefe;
    }

    public void setDocIdJefe(String docIdJefe) {
        this.docIdJefe = docIdJefe;
    }

    public String getDocIdDocente() {
        return docIdDocente;
    }

    public void setDocIdDocente(String docIdDocente) {
        this.docIdDocente = docIdDocente;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Docente getDocenteJefe() {
        return docenteJefe;
    }

    public void setDocenteJefe(Docente docenteJefe) {
        this.docenteJefe = docenteJefe;
    }

    public Docente getDocente() {
        return docente;
    }

    public void setDocente(Docente docente) {
        this.docente = docente;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((codigo == null) ? 0 : codigo.hashCode());
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
        DocenteRelacion other = (DocenteRelacion) obj;
        if (codigo == null) {
            if (other.codigo != null)
                return false;
        } else if (!codigo.equals(other.codigo))
            return false;
        return true;
    }
}
