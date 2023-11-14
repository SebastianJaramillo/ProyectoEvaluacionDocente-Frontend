package com.microservicios.app.estudiante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class MicroservicioEstudianteApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicioEstudianteApplication.class, args);
	}

}
