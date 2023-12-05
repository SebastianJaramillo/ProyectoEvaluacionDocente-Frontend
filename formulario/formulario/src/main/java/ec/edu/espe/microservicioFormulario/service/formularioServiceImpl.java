package ec.edu.espe.microservicioFormulario.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import org.springframework.beans.factory.annotation.Autowired;
import ec.edu.espe.microservicioFormulario.repository.formularioRepository;
import ec.edu.espe.microservicioFormulario.model.formulario;

@Service
public class formularioServiceImpl implements formularioService {

    @Autowired
    private formularioRepository formularioRepository;

    @Override
    public formulario save(formulario formulario) {
        return formularioRepository.save(formulario);
    }

    @Override
    public List<formulario> listAll() {
        return formularioRepository.findAll();
    }

    @Override
    public formulario findById(long id) {
        Optional<formulario> optionalformulario = formularioRepository.findById(id);

        if(optionalformulario.isPresent()) {
            return optionalformulario.get();
        }

        throw new RuntimeException("formulario con ID: " + id + " no se encuentra.");
    }
}
