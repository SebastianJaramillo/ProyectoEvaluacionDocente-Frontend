package com.microservicios.app.evaluacion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@EnableEurekaClient
@SpringBootApplication
public class MicroservicioEvalucionApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroservicioEvalucionApplication.class, args);
	}

}
