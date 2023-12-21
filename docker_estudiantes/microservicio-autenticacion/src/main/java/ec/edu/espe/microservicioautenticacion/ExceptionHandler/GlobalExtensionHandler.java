package ec.edu.espe.microservicioautenticacion.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExtensionHandler {
  
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handlerArgumentException(IllegalArgumentException ex)
    {
        return new ResponseEntity<String>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handlerRuntimeException(RuntimeException ex)
    {
        return new ResponseEntity<String>(ex.getMessage(),HttpStatus.BAD_GATEWAY);
    }
}
