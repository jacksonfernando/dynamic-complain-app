package com.example.blog.dto.request;

import java.util.Objects;

public class RegisterRequestDTO {
    private String username;

    private String password;

    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof RegisterRequestDTO)) {
            return false;
        }
        RegisterRequestDTO registerRequest = (RegisterRequestDTO) o;
        return Objects.equals(username, registerRequest.username) && Objects.equals(password, registerRequest.password);
    }
}
