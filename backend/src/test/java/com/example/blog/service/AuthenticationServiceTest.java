package com.example.blog.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.blog.config.JwtService;
import com.example.blog.dto.request.RegisterRequestDTO;
import com.example.blog.dto.response.AuthenticationResponseDTO;
import com.example.blog.entity.User;
import com.example.blog.repository.UserRepository;

@SpringBootTest
public class AuthenticationServiceTest {
    private String token = "eyJhbGciOiJIUzI1NiJ9."
            + "eyJzdWIiOiJqYWNrc29uIiwiaWF0IjoxNjg2NTQzODA2LCJleHAiOjE2ODY1NDUyNDZ9.og6sxo-"
            + "BpyOxKiwVTSKMMYDVTieJvRK9lt8oQgRcQbg";

    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Test
    public void testRegister_should_return_token_when_invoked() throws Exception {
        User user = new User("jackson", "jackson123");
        RegisterRequestDTO request = new RegisterRequestDTO("jackson", "jackson123");
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded jackson123");
        when(userRepository.save(user)).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn(token);

        AuthenticationResponseDTO result = authenticationService.register(request);

        assertEquals(result.getToken(), null);
    }

    @Test
    public void testRegister_should_throw_error_when_user_already_registered() throws Exception {
        User user = new User("jackson", "jackson123");
        RegisterRequestDTO request = new RegisterRequestDTO("jackson", "jackson123");
        Optional<User> optionalUser = Optional.of(user);
        when(userRepository.findByUsername(request.getUsername())).thenReturn(optionalUser);
        doThrow(new IllegalArgumentException("Failed to find user by username"))
                .when(userRepository)
                .findByUsername(request.getUsername());

        assertThrows(Exception.class, () -> {
            authenticationService.register(request);
        });
    }

    @Test
    public void authenticate_should_return_token_when_invoked() throws Exception {
        User user = new User("jackson", "jackson123");
        Optional<User> optionalUser = Optional.of(user);
        RegisterRequestDTO request = new RegisterRequestDTO("jackson", "jackson123");
        when(authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())))
                .thenReturn(null);
        when(userRepository.findByUsername(user.getUsername())).thenReturn(optionalUser);
        when(jwtService.generateToken(user)).thenReturn(token);

        AuthenticationResponseDTO result = authenticationService.authenticate(request);

        assertEquals(result.getToken(), token);
    }

    @Test
    public void authenticate_should_throw_error_when_user_not_found() throws Exception {
        RegisterRequestDTO request = new RegisterRequestDTO("jackson", "jackson123");
        when(authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())))
                .thenReturn(null);
        doThrow(new IllegalArgumentException("Failed to find user by username"))
                .when(userRepository)
                .findByUsername(request.getUsername());

        assertThrows(Exception.class, () -> {
            authenticationService.authenticate(request);
        });
    }
}
