package ec.edu.espe.microserviciodocente.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciodocente.model.DocenteRelacion;

public interface DocenteRelacionRepository extends CrudRepository<DocenteRelacion, Long> {
    List<DocenteRelacion> findByDocIdJefeAndEstado(String docIdJefe, String estado);

    List<DocenteRelacion> findByDocIdDocenteAndEstado(String docIdDocente, String estado);

    Optional<DocenteRelacion> findByDocIdJefeAndDocIdDocente(String docIdJefe, String docIdDocente);
}
