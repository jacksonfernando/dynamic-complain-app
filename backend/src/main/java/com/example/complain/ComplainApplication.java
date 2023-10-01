package com.example.complain;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import com.example.complain.entity.StorageProperties;
import com.example.complain.service.StorageService;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class ComplainApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComplainApplication.class, args);
	}

	@Bean
	CommandLineRunner init(StorageService storageService) {
		return (args) -> {
			storageService.deleteAll();
			storageService.init();
		};
	}
}
