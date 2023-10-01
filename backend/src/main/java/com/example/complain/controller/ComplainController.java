package com.example.complain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.complain.dto.response.ListComplainResponseDTO;
import com.example.complain.entity.Complain;
import com.example.complain.service.ComplainService;

@RestController
@RequestMapping("/api/v1/complains")
public class ComplainController {
    ComplainService complainService;

    @Autowired
    public void setService(ComplainService service) {
        this.complainService = service;
    }

    @GetMapping
    ResponseEntity<?> fetchAllComplain(
            @RequestParam(defaultValue = "5", required = false) Integer limit,
            @RequestParam(defaultValue = "0", required = false) Integer offset) {
        try {
            ListComplainResponseDTO complains = complainService.findAll(limit, offset);
            return ResponseEntity.ok(complains);
        } catch (Exception e) {
            System.out.println("EXCEPTION_MESSAGE" + e.getMessage());
            return ResponseEntity.status(500).body("Failed to fetch all Complain posts");
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<Complain> fetchComplainById(@PathVariable long id) throws Exception {
        Complain category = complainService.getById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping
    ResponseEntity<?> saveComplain(@RequestBody Complain request) {
        try {
            Complain savedComplain = complainService.save(request);
            return ResponseEntity.created(null).body(savedComplain);
        } catch (Exception e) {
            System.out.println("COMPLAINS_ERROR" + e.getMessage());
            return ResponseEntity.status(500).body("Failed to save complain");
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteComplain(@PathVariable long id) {
        try {
            complainService.delete(id);
            return ResponseEntity.ok("Deleted Complain post id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete complain");
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateComplain(@PathVariable long id, @RequestBody Complain Complain) {
        try {
            Complain updatedComplain = complainService.updateById(id, Complain);
            return ResponseEntity.ok(updatedComplain);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update complain");
        }
    }
}
