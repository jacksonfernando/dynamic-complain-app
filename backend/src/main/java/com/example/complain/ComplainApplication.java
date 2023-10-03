package com.example.complain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.example.complain.dto.request.RegisterRequestDTO;
import com.example.complain.entity.StorageProperties;
import com.example.complain.service.AuthenticationService;
import com.example.complain.service.StorageService;
import com.example.complain.service.UserService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ComplainApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComplainApplication.class, args);
	}

	@Bean
	CommandLineRunner init(StorageService storageService, AuthenticationService authService) {
		return (args) -> {
			// storageService.deleteAll();
			authService.register(new RegisterRequestDTO("admin", "admin"));
			storageService.init();
		};
	}
}
