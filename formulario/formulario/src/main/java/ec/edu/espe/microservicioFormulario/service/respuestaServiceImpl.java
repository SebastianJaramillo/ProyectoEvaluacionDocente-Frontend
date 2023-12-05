package ec.edu.espe.microservicioFormulario.service;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ec.edu.espe.microservicioFormulario.model.respuesta;
import ec.edu.espe.microservicioFormulario.repository.respuestaRepository;

@Service
public class respuestaServiceImpl implements respuestaService{
 @Autowired
    private respuestaRepository respuestaRepository;

    @Override
    public respuesta save(respuesta respuesta) {
        return respuestaRepository.save(respuesta);
    }

    @Override
    public List<respuesta> listAll() {
        return respuestaRepository.findAll();
    }

    @Override
    public respuesta findById(long id) {
        Optional<respuesta> optionalrespuesta = respuestaRepository.findById(id);

        if(optionalrespuesta.isPresent()) {
            return optionalrespuesta.get();
        }

        throw new RuntimeException("respuesta con ID: " + id + " no se encuentra.");
    }
}
