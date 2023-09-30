package com.example.complain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.complain.config.JwtService;
import com.example.complain.dto.request.RegisterRequestDTO;
import com.example.complain.dto.response.AuthenticationResponseDTO;
import com.example.complain.entity.User;
import com.example.complain.repository.UserRepository;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthenticationResponseDTO register(RegisterRequestDTO request) throws Exception {
        User foundedUser = repository.findByUsername(request.getUsername()).orElse(null);
        if (foundedUser != null) {
            throw new Exception("User already registered");
        }
        User user = new User(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()));
        User savedUser = repository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
        return new AuthenticationResponseDTO(jwtToken);
    }

    public AuthenticationResponseDTO authenticate(RegisterRequestDTO request) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        User foundedUser = repository.findByUsername(request.getUsername()).orElseThrow(Exception::new);
        String jwtToken = jwtService.generateToken(foundedUser);
        return new AuthenticationResponseDTO(jwtToken);
    }
}
