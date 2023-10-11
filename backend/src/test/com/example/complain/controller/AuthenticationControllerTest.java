package com.example.blog.controller;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.blog.dto.request.RegisterRequestDTO;
import com.example.blog.dto.response.AuthenticationResponseDTO;
import com.example.blog.service.AuthenticationService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class AuthenticationControllerTest {
    private String token = "eyJhbGciOiJIUzI1NiJ9."
            + "eyJzdWIiOiJqYWNrc29uIiwiaWF0IjoxNjg2NTQzODA2LCJleHAiOjE2ODY1NDUyNDZ9.og6sxo-"
            + "BpyOxKiwVTSKMMYDVTieJvRK9lt8oQgRcQbg";
    private AuthenticationResponseDTO authenticationResponse = new AuthenticationResponseDTO(token);
    private RegisterRequestDTO authenticationRequest = new RegisterRequestDTO("jackson", "jackson123");

    private MockMvc mockMvc;

    @InjectMocks
    private AuthenticationController authenticationController;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private AuthenticationService authenticationService;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(this.authenticationController).build();
    }

    @Test
    public void testRegister_should_return_status_201_when_register_successfully() throws Exception {
        when(authenticationService.register(authenticationRequest)).thenReturn(authenticationResponse);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/register")
                .content(objectMapper.writeValueAsBytes(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void testRegister_should_return_status_500_when_register_failed() throws Exception {
        when(authenticationService.register(authenticationRequest)).thenReturn(authenticationResponse);
        doThrow(new Exception("User already registered"))
                .when(authenticationService)
                .register(authenticationRequest);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/register")
                .content(objectMapper.writeValueAsBytes(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void testAuthenticate_should_return_status_200_when_authenticate_successfully() throws Exception {
        when(authenticationService.authenticate(authenticationRequest)).thenReturn(authenticationResponse);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/authenticate")
                .content(objectMapper.writeValueAsBytes(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testAuthenticate_should_return_status_500_when_failed_to_authenticate() throws Exception {
        doThrow(new IllegalArgumentException("Failed to authenticate"))
                .when(authenticationService)
                .authenticate(authenticationRequest);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/auth/authenticate")
                .content(objectMapper.writeValueAsBytes(authenticationRequest))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    };

}