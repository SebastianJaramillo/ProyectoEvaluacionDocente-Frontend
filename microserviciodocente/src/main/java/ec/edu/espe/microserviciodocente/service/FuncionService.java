package ec.edu.espe.microserviciodocente.service;

import java.util.List;

import ec.edu.espe.microserviciodocente.domain.Funcion;

public interface FuncionService {

    public Funcion save(Funcion funcion);

    public List<Funcion> listAll();

    public Funcion findById(long id);
}
