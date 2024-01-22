package ec.edu.espe.microserviciocursoestudiante.repository;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microserviciocursoestudiante.model.CursoEstudiante;
import java.util.List;
import java.util.Optional;


public interface CursoEstudianteRepository extends CrudRepository<CursoEstudiante, Long> {
    List<CursoEstudiante> findByEstIdOrderByCurNrc(String estId);

    List<CursoEstudiante> findByCurNrc(Long curNrc);

    Optional<CursoEstudiante> findByCurNrcAndEstId(Long curNrc, String estId);
}
