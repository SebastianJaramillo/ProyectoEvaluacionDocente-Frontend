package ec.edu.espe.microservicioFormulario.service;

import java.util.List;

import ec.edu.espe.microservicioFormulario.model.pregunta;

public interface preguntaService {
 public pregunta save(pregunta pregunta);

    public List<pregunta> listAll();

    public pregunta findById(long id);
}
