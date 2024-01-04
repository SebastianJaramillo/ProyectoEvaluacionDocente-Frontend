package ec.edu.espe.microserviciodocente.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.domain.Funcion;
import ec.edu.espe.microserviciodocente.repository.FuncionRepository;

@Service
public class FuncionServiceImpl implements FuncionService {
@Autowired
    private FuncionRepository funcionRepository;

    @Override
    public Funcion save(Funcion funcion) {
        return funcionRepository.save(funcion);
    }

    @Override
    public List<Funcion> listAll() {
        return funcionRepository.findAll();
    }

    @Override
    public Funcion findById(long id) {
        Optional<Funcion> optionalFuncion = funcionRepository.findById(id);

        if(optionalFuncion.isPresent()) {
            return optionalFuncion.get();
        }

        throw new RuntimeException("Función con id: " + id + " no se encuentra.");
    }
}
