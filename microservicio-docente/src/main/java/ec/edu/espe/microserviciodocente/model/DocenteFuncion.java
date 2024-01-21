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
@Table(name = "docente_funcion")
public class DocenteFuncion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_func_codigo", nullable = false)
    private Long id;

    @Column(name = "doc_id", nullable = false)
    private String docId;

    @Column(name = "func_id", nullable = false)
    private String funcId;

    @Column(name = "doc_func_horas")
    private Integer horas;

    @Column(name = "doc_func_estado", length = 10)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "doc_id", insertable = false, updatable = false)
    private Docente docente;

    @ManyToOne
    @JoinColumn(name = "func_id", insertable = false, updatable = false)
    private Funcion funcion;

    public DocenteFuncion() {
    }

    public DocenteFuncion(Long id, String docId, String funcId, Integer horas, String estado, Docente docente,
            Funcion funcion) {
        this.id = id;
        this.docId = docId;
        this.funcId = funcId;
        this.horas = horas;
        this.estado = estado;
        this.docente = docente;
        this.funcion = funcion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocId() {
        return docId;
    }

    public void setDocId(String docId) {
        this.docId = docId;
    }

    public String getFuncId() {
        return funcId;
    }

    public void setFuncId(String funcId) {
        this.funcId = funcId;
    }

    public Integer getHoras() {
        return horas;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Docente getDocente() {
        return docente;
    }

    public void setDocente(Docente docente) {
        this.docente = docente;
    }

    public Funcion getFuncion() {
        return funcion;
    }

    public void setFuncion(Funcion funcion) {
        this.funcion = funcion;
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
        DocenteFuncion other = (DocenteFuncion) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
