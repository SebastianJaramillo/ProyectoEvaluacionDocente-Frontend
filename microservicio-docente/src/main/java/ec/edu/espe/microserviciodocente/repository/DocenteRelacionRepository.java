package ec.edu.espe.microserviciodocente.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciodocente.model.DocenteRelacion;

public interface DocenteRelacionRepository extends CrudRepository<DocenteRelacion, Long> {
    List<DocenteRelacion> findByDocIdJefe(String docIdJefe);

    List<DocenteRelacion> findByDocIdDocente(String docIdDocente);

    Optional<DocenteRelacion> findByDocIdJefeAndDocIdDocente(String docIdJefe, String docIdDocente);
}
