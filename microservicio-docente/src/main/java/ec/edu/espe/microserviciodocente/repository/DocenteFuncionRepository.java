package ec.edu.espe.microserviciodocente.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciodocente.model.DocenteFuncion;

public interface DocenteFuncionRepository extends CrudRepository<DocenteFuncion, Long> {
    List<DocenteFuncion> findByDocId(String docId);

    List<DocenteFuncion> findByFuncId(String funcId);

    Optional<DocenteFuncion> findByDocIdAndFuncId(String docId, String funcId);
}
