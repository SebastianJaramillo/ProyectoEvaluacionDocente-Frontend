package ec.edu.espe.microserviciocursoestudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microserviciocursoestudiante.model.Asignatura;

public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {
    
}
