package ec.edu.espe.microserviciodocente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microserviciodocente.domain.Docente;

public interface DocenteRepository extends JpaRepository<Docente, String> {

}
