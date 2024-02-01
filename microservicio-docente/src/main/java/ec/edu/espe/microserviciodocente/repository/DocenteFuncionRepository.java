package ec.edu.espe.microserviciodocente.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciodocente.model.DocenteFuncion;

public interface DocenteFuncionRepository extends CrudRepository<DocenteFuncion, Long> {
    List<DocenteFuncion> findByDocIdAndEstado(String docId, String estado);

    List<DocenteFuncion> findByFuncIdAndEstado(String funcId, String estado);

    Optional<DocenteFuncion> findByDocIdAndFuncId(String docId, String funcId);
}
