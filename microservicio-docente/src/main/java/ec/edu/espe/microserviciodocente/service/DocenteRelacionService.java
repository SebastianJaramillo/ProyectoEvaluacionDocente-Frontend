package ec.edu.espe.microserviciodocente.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.model.Docente;
import ec.edu.espe.microserviciodocente.model.DocenteRelacion;
import ec.edu.espe.microserviciodocente.repository.DocenteRelacionRepository;
import ec.edu.espe.microserviciodocente.repository.DocenteRepository;

@Service
public class DocenteRelacionService {
    private final DocenteRelacionRepository docenteRelacionRepository;
    private final DocenteRepository docenteRepository;

    public DocenteRelacionService(DocenteRelacionRepository docenteRelacionRepository,
            DocenteRepository docenteRepository) {
        this.docenteRelacionRepository = docenteRelacionRepository;
        this.docenteRepository = docenteRepository;
    }

    public List<DocenteRelacion> findByJefe(String docIdJefe) {
        return docenteRelacionRepository.findByDocIdJefeAndEstado(docIdJefe, "ACTIVO");
    }

    public List<DocenteRelacion> findByDocente(String docIdDocente) {
        return docenteRelacionRepository.findByDocIdDocenteAndEstado(docIdDocente, "ACTIVO");
    }

    public DocenteRelacion addDocenteRelacion(DocenteRelacion docenteRelacion) {
        if (!docenteRelacion.getDocIdJefe().equals(docenteRelacion.getDocIdDocente())) {
            Optional<Docente> optionalJefe = this.docenteRepository.findById(docenteRelacion.getDocIdJefe());
            if (optionalJefe.isPresent()) {
                Optional<Docente> optionalDocente = this.docenteRepository.findById(docenteRelacion.getDocIdDocente());

                if (optionalDocente.isPresent()) {
                    Optional<DocenteRelacion> optionalDocenteRelacion = this.docenteRelacionRepository
                            .findByDocIdJefeAndDocIdDocente(docenteRelacion.getDocIdJefe(),
                                    docenteRelacion.getDocIdDocente());
                    if (!optionalDocenteRelacion.isPresent()) {
                        docenteRelacion.setEstado("ACTIVO");
                        return this.docenteRelacionRepository.save(docenteRelacion);
                    } else {
                        throw new RuntimeException("Docente con ID: " + docenteRelacion.getDocIdDocente()
                                + " ya se encuentra asociado con Docente: " + docenteRelacion.getDocIdJefe());
                    }
                } else {
                    throw new RuntimeException("Docente con ID: " + docenteRelacion.getDocIdDocente() + " no existe.");
                }
            } else {
                throw new RuntimeException(
                        "Docente Superior con ID: " + docenteRelacion.getDocIdJefe() + " no existe.");
            }
        } else {
            throw new RuntimeException(
                    "No se puede agregar el mismo docente como Jefe superior y docente");
        }
    }
}
