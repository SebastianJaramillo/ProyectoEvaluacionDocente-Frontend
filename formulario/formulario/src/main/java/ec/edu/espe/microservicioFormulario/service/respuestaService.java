package ec.edu.espe.microservicioFormulario.service;
import java.util.List;
import ec.edu.espe.microservicioFormulario.model.respuesta;

public interface respuestaService {
    public respuesta save(respuesta respuesta);

    public List<respuesta> listAll();

    public respuesta findById(long id);
}
