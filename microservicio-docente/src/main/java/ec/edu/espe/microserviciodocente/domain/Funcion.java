package ec.edu.espe.microserviciodocente.domain;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "funcion")
public class Funcion {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "func_id")
	private long id;

    @Column(name = "func_descripcion")
	private String descripcion;
    
   @ManyToMany(mappedBy = "docentes")
    private List<Docente> docentes;

    public Funcion() {
    }

    public Funcion(long id, String descripcion, List<Docente> docentes) {
        this.id = id;
        this.descripcion = descripcion;
        this.docentes = docentes;
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
        Funcion other = (Funcion) obj;
        if (id != other.id)
            return false;
        return true;
    }
}
