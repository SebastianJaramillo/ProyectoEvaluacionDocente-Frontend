package ec.edu.espe.microservicioFormulario.service;
import java.util.List;
import ec.edu.espe.microservicioFormulario.model.formulario;

public interface formularioService {
    public formulario save(formulario formulario);

    public List<formulario> listAll();

    public formulario findById(long id);
}
