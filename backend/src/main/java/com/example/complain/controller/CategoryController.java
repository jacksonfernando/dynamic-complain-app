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

import com.example.complain.dto.response.ListBlogsResponseDTO;
import com.example.complain.entity.Blog;
import com.example.complain.service.BlogService;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    BlogService blogService;

    @Autowired
    public void setService(BlogService service) {
        this.blogService = service;
    }

    @GetMapping
    ResponseEntity<?> fetchAllBlogPosts(
            @RequestParam(defaultValue = "5", required = false) Integer limit,
            @RequestParam(defaultValue = "0", required = false) Integer offset) {
        try {
            ListBlogsResponseDTO books = blogService.findAll(limit, offset);
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to fetch all blog posts");
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<Blog> fetchBlogPostById(@PathVariable long id) throws Exception {
        Blog blog = blogService.getById(id);
        return ResponseEntity.ok(blog);
    }

    @PostMapping
    ResponseEntity<?> saveBlogPost(@RequestBody Blog request) {
        try {
            Blog savedBlogPost = blogService.save(request);
            return ResponseEntity.created(null).body(savedBlogPost);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save blog post");
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> deleteBlogPost(@PathVariable long id) {
        try {
            blogService.delete(id);
            return ResponseEntity.ok("Deleted blog post id: " + id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to delete blog post");
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<?> updateBlogPost(@PathVariable long id, @RequestBody Blog blog) {
        try {
            Blog updatedBlogPost = blogService.updateById(id, blog);
            return ResponseEntity.ok(updatedBlogPost);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to update blog post");
        }
    }
}
