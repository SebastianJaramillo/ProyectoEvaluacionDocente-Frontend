package ec.edu.espe.microserviciodocente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microserviciodocente.domain.Funcion;

public interface FuncionRepository extends JpaRepository<Funcion, Long> {

}
