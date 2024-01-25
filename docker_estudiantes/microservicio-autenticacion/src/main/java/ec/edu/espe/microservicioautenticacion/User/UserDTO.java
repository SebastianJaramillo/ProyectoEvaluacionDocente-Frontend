package ec.edu.espe.microservicioautenticacion.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    String id;
    String username;
    String firstname;
    String lastname;
    Role role;
}
