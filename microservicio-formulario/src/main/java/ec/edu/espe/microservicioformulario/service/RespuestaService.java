package ec.edu.espe.microservicioformulario.service;
import java.util.Optional;
import org.springframework.stereotype.Service;
import ec.edu.espe.microservicioformulario.model.Respuesta;
import ec.edu.espe.microservicioformulario.repository.RespuestaRepository;

@Service
public class RespuestaService {

    private final RespuestaRepository respuestaRepository;

    public RespuestaService(RespuestaRepository respuestaRepository) {
        this.respuestaRepository = respuestaRepository;
    }

    public Respuesta save(Respuesta respuesta) {
        return this.respuestaRepository.save(respuesta);
    }

    public Iterable<Respuesta> listAll() {
        return this.respuestaRepository.findAll();
    }

    public Respuesta findById(long id) {
        Optional<Respuesta> optionalrespuesta = this.respuestaRepository.findById(id);

        if(optionalrespuesta.isPresent()) {
            return optionalrespuesta.get();
        }

        throw new RuntimeException("respuesta con ID: " + id + " no se encuentra.");
    }
}
