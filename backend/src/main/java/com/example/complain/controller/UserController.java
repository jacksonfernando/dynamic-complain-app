package com.example.complain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.complain.dto.request.RegisterRequestDTO;
import com.example.complain.entity.User;
import com.example.complain.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    UserService userService;

    @Autowired
    public void setService(UserService service) {
        this.userService = service;
    }

    @GetMapping
    ResponseEntity<?> fetchAllUsers() {
        try {
            List<User> users = userService.findAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.out.println("EXCEPTION_MESSAGE" + e.getMessage());
            return ResponseEntity.status(500).body("Failed to fetch all users");
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteUser(@PathVariable long id) {
        try {
            userService.delete(id);
            return ResponseEntity.ok("Deleted user id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete user");
        }

    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateUser(@PathVariable long id, @RequestBody RegisterRequestDTO user) {
        try {
            User updatedUser = userService.updateById(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update user");
        }
    }
}
