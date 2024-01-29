package ec.edu.espe.microservicioevaluacion.repository;
import java.util.Date;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;

public interface EvaluacionRepository extends CrudRepository<Evaluacion, Long>{

    Optional<Evaluacion> findByEvalFechaInicioLessThanEqualAndEvalFechaFinGreaterThanEqual(Date fechaInicio, Date fechaFin);
}
