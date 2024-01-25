package ec.edu.espe.microservicioautenticacion.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User,String>{
    Optional<User> findByUsername(String username); 
    
    @Modifying()
    @Query("update User u set u.firstname=:firstname, u.lastname=:lastname where u.id = :id")
    void updateUser(@Param(value = "id") String id,   @Param(value = "firstname") String firstname, @Param(value = "lastname") String lastname);

}
