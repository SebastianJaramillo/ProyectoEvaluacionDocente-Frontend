package ec.edu.espe.microserviciodocente.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import ec.edu.espe.microserviciodocente.model.Docente;
import ec.edu.espe.microserviciodocente.model.DocenteFuncion;
import ec.edu.espe.microserviciodocente.model.Funcion;
import ec.edu.espe.microserviciodocente.repository.DocenteFuncionRepository;
import ec.edu.espe.microserviciodocente.repository.DocenteRepository;
import ec.edu.espe.microserviciodocente.repository.FuncionRepository;

@Service
public class DocenteFuncionService {
    private final DocenteFuncionRepository docenteFuncionRepository;
    private final DocenteRepository docenteRepository;
    private final FuncionRepository funcionRepository;

    public DocenteFuncionService(DocenteFuncionRepository docenteFuncionRepository,
            DocenteRepository docenteRepository, FuncionRepository funcionRepository) {
        this.docenteFuncionRepository = docenteFuncionRepository;
        this.docenteRepository = docenteRepository;
        this.funcionRepository = funcionRepository;
    }

    public List<DocenteFuncion> findByDocente(String docId) {
        return docenteFuncionRepository.findByDocIdAndEstado(docId, "ACTIVO");
    }

    public List<DocenteFuncion> findByFuncion(String funcId) {
        return docenteFuncionRepository.findByFuncIdAndEstado(funcId, "ACTIVO");
    }

    public DocenteFuncion addDocenteFuncion(DocenteFuncion docenteFuncion) {
        Optional<Funcion> optionalFuncion = this.funcionRepository.findById(docenteFuncion.getFuncId());

        if (optionalFuncion.isPresent()) {
            Optional<Docente> optionalDocente = this.docenteRepository.findById(docenteFuncion.getDocId());

            if (optionalDocente.isPresent()) {
                Optional<DocenteFuncion> optionalDocenteFuncion = this.docenteFuncionRepository
                        .findByDocIdAndFuncId(docenteFuncion.getDocId(), docenteFuncion.getFuncId());
                if (!optionalDocenteFuncion.isPresent()) {
                    docenteFuncion.setEstado("ACTIVO");
                    return this.docenteFuncionRepository.save(docenteFuncion);
                } else {
                    throw new RuntimeException("Docente con ID: " + docenteFuncion.getDocId()
                            + " ya ha sido asignado a la funcion: " + docenteFuncion.getFuncId());
                }
            } else {
                throw new RuntimeException("Docente con ID: " + docenteFuncion.getDocId() + " no existe.");
            }
        } else {
            throw new RuntimeException("Funcion con ID: " + docenteFuncion.getFuncId() + " no existe.");
        }
    }

    public DocenteFuncion updateEstado(Long id) {
        Optional<DocenteFuncion> optionalDocenteFuncion = this.docenteFuncionRepository.findById(id);

        if (optionalDocenteFuncion.isPresent()) {
            optionalDocenteFuncion.get().setEstado("INACTIVO");
            return this.docenteFuncionRepository.save(optionalDocenteFuncion.get());
        } else {
            throw new RuntimeException("No se pudo encontrar docente con esa funcion.");
        }
    }
}
