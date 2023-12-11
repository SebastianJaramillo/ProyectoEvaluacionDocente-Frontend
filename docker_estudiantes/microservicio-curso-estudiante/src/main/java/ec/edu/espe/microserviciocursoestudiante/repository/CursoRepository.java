package ec.edu.espe.microserviciocursoestudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microserviciocursoestudiante.domain.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {
    
}
