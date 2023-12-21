package ec.edu.espe.microservicioevaluacion.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microservicioevaluacion.domain.Evaluacion;

public interface EvaluacionRepository extends JpaRepository<Evaluacion, Long>{

}
