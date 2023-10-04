package com.example.complain.controller;

import java.util.List;

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

import com.example.complain.dto.response.ListCategoryResponseDTO;
import com.example.complain.entity.Category;
import com.example.complain.service.CategoryService;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    CategoryService categoryService;

    @Autowired
    public void setService(CategoryService service) {
        this.categoryService = service;
    }

    @GetMapping
    ResponseEntity<?> fetchAllCategory(
            @RequestParam(defaultValue = "5", required = false) Integer limit,
            @RequestParam(defaultValue = "0", required = false) Integer offset) {
        try {
            ListCategoryResponseDTO categories = categoryService.findAll(limit, offset);
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch all Category posts");
        }
    }

    @GetMapping("/all")
    ResponseEntity<?> fetchCategoriesWithoutPagination() {
        try {
            List<Category> categories = categoryService.findAllWithoutPagination();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch all Category posts");
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<Category> fetchCategoryById(@PathVariable long id) throws Exception {
        Category category = categoryService.getById(id);
        return ResponseEntity.ok(category);
    }

    @PostMapping
    ResponseEntity<?> saveCategory(@RequestBody Category request) {
        try {
            Category savedCategory = categoryService.save(request);
            return ResponseEntity.created(null).body(savedCategory);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save Category");
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteCategory(@PathVariable long id) {
        try {
            categoryService.delete(id);
            return ResponseEntity.ok("Deleted Category post id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete Category");
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateCategory(@PathVariable long id, @RequestBody Category Category) {
        try {
            Category updatedCategory = categoryService.updateById(id, Category);
            return ResponseEntity.ok(updatedCategory);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update Category");
        }
    }
}
