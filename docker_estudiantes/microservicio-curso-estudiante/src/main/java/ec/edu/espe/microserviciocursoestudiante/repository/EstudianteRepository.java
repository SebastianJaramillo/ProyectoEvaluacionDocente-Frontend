package ec.edu.espe.microserviciocursoestudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.edu.espe.microserviciocursoestudiante.model.Estudiante;

public interface EstudianteRepository extends JpaRepository<Estudiante, String> {
    
}
