package com.example.complain.dto.response;

import java.util.Objects;

public class AuthenticationResponseDTO {
   private String token;

   public AuthenticationResponseDTO() {
   }

   public AuthenticationResponseDTO(String token) {
      this.token = token;
   }

   public String getToken() {
      return this.token;
   }

   public void setToken(String token) {
      this.token = token;
   }

   public AuthenticationResponseDTO token(String token) {
      setToken(token);
      return this;
   }

   @Override
   public boolean equals(Object o) {
      if (o == this)
         return true;
      if (!(o instanceof AuthenticationResponseDTO)) {
         return false;
      }
      AuthenticationResponseDTO authenticationRequest = (AuthenticationResponseDTO) o;
      return Objects.equals(token, authenticationRequest.token);
   }
}