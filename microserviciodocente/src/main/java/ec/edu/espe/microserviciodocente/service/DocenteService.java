package ec.edu.espe.microserviciodocente.service;

import java.util.List;

import ec.edu.espe.microserviciodocente.domain.Docente;

public interface DocenteService {

    public Docente save(Docente docente);

    public List<Docente> listAll();

    public Docente findById(String id);
}
