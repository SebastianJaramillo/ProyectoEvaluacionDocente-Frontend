package ec.edu.espe.microservicioformulario.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microservicioformulario.model.Pregunta;
import ec.edu.espe.microservicioformulario.repository.PreguntaRepository;

@Service
public class PreguntaService {
    private final PreguntaRepository preguntaRepository;

    public PreguntaService(PreguntaRepository preguntaRepository) {
        this.preguntaRepository = preguntaRepository;        
    }  
    
    public Pregunta save(Pregunta pregunta) {
        return this.preguntaRepository.save(pregunta);
    }
    
    public Iterable<Pregunta> listAll() {
        return this.preguntaRepository.findAll();
    }
    
    public Pregunta findById(long id) {
        Optional<Pregunta> optionalpregunta = this.preguntaRepository.findById(id);

        if (optionalpregunta.isPresent()) {
            return optionalpregunta.get();
        }

        throw new RuntimeException("pregunta con ID: " + id + " no se encuentra.");
    }
    
    public List<Pregunta> findByFormId(long id) {
        return this.preguntaRepository.findByFormId(id);
    }

}
