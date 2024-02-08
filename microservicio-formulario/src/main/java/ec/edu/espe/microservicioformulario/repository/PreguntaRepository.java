package ec.edu.espe.microservicioformulario.repository;

import org.springframework.data.repository.CrudRepository;

import ec.edu.espe.microservicioformulario.model.Pregunta;
import java.util.List;


public interface PreguntaRepository extends CrudRepository<Pregunta, String> {
    List<Pregunta> findByFormId(long formId);
}
