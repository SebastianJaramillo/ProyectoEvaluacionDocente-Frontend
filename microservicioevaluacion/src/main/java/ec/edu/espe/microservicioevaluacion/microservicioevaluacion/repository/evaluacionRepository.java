package ec.edu.espe.microservicioevaluacion.microservicioevaluacion.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microservicioevaluacion.microservicioevaluacion.model.evaluacion;
public interface evaluacionRepository extends JpaRepository<evaluacion, Long>{

}
