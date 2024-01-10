package ec.edu.espe.microservicioevaluacion.repository;
import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microservicioevaluacion.domain.Periodo;
import java.util.List;


public interface PeriodoRepository extends CrudRepository<Periodo, Long>{
    List<Periodo> findByEstado(String estado);
}
