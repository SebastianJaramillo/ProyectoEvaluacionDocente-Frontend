package ec.edu.espe.microserviciodocente.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "docente")
public class Docente {
    @Id
    @Column(name = "doc_id")
    private String id;

    @Column(name = "doc_nombres")
	private String nombres;

	@Column(name = "doc_apellidos")
	private String apellidos;

    @Column(name = "func_id")
    private long funcId;
    
    @ManyToMany
    @JoinTable(
        name = "docente_funcion",
        joinColumns = @JoinColumn(name = "doc_id"),
        inverseJoinColumns = @JoinColumn(name = "func_id")
    )
    private List<Funcion> funciones;

    @OneToOne
    @JoinColumn(name = "doc_id", referencedColumnName = "doc_id", insertable = false, updatable = false)
    private Docente jefe;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public long getFuncId() {
        return funcId;
    }

    public void setFuncId(long funcId) {
        this.funcId = funcId;
    }

    public List<Funcion> getFunciones() {
        return funciones;
    }

    public void setFunciones(List<Funcion> funciones) {
        this.funciones = funciones;
    }

    public Docente getJefe() {
        return jefe;
    }

    public void setJefe(Docente jefe) {
        this.jefe = jefe;
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
