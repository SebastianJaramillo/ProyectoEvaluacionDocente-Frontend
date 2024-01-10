package ec.edu.espe.microservicioevaluacion.repository;
import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;

public interface EvaluacionRepository extends CrudRepository<Evaluacion, Long>{

}
