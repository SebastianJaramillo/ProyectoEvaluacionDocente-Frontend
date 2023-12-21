package ec.edu.espe.microservicioevaluacion.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microservicioevaluacion.domain.Periodo;

public interface PeriodoRepository extends JpaRepository<Periodo, Long>{

}
