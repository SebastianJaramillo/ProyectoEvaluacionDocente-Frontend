package ec.edu.espe.microservicioautenticacion.Auth;

import ec.edu.espe.microservicioautenticacion.User.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    String username;
    String password;
    String firstname;
    String lastname;
    String id;
    Role role;
}
