package ec.edu.espe.microserviciodocente.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.domain.Docente;
import ec.edu.espe.microserviciodocente.repository.DocenteRepository;

@Service
public class DocenteServiceImpl implements DocenteService {

    @Autowired
    private DocenteRepository docenteRepository;

    @Override
    public Docente save(Docente docente) {
        return docenteRepository.save(docente);
    }

    @Override
    public List<Docente> listAll() {
        return docenteRepository.findAll();
    }

    @Override
    public Docente findById(String id) {
        Optional<Docente> optionalDocente = docenteRepository.findById(id);

        if (optionalDocente.isPresent()) {
            return optionalDocente.get();
        }

        throw new RuntimeException("Docente con ID: " + id + " no se encuentra.");
    }
}
