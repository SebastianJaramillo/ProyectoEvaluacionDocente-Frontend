package ec.edu.espe.microservicioautenticacion.User;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
private final UserRepository userRepository; 

    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {
       
        User user = User.builder()
        .id(userRequest.id)
        .firstname(userRequest.getFirstname())
        .lastname(userRequest.lastname)
        .role(userRequest.getRole())
        .build();
        
        userRepository.updateUser(user.id, user.firstname, user.lastname);

        return new UserResponse("El usuario se registró satisfactoriamente");
    }

    public UserDTO getUser(String id) {
        User user= userRepository.findById(id).orElse(null);
       
        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .firstname(user.firstname)
            .lastname(user.lastname)
            .role(user.role)
            .build();
            return userDTO;
        }
        return null;
    }

    public UserDTO findByUserName(String usr) {
        User user= userRepository.findByUsername(usr).orElse(null);
       
        if (user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .firstname(user.firstname)
            .lastname(user.lastname)
            .role(user.role)
            .build();
            return userDTO;
        }
        return null;
    }
}
