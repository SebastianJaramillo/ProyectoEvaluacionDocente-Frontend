package ec.edu.espe.microservicioFormulario.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microservicioFormulario.model.pregunta;
import ec.edu.espe.microservicioFormulario.repository.preguntaRepository;

@Service
public class preguntaServiceImpl implements preguntaService{
  @Autowired
    private preguntaRepository preguntaRepository;

    @Override
    public pregunta save(pregunta pregunta) {
        return preguntaRepository.save(pregunta);
    }

    @Override
    public List<pregunta> listAll() {
        return preguntaRepository.findAll();
    }

    @Override
    public pregunta findById(long id) {
        Optional<pregunta> optionalpregunta = preguntaRepository.findById(id);

        if(optionalpregunta.isPresent()) {
            return optionalpregunta.get();
        }

        throw new RuntimeException("pregunta con ID: " + id + " no se encuentra.");
    }
}
