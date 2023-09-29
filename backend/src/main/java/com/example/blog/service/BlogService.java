package com.example.blog.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.blog.dto.response.ListBlogsResponseDTO;
import com.example.blog.entity.Blog;
import com.example.blog.repository.BlogRepository;

@Service
public class BlogService {
    private BlogRepository blogRepository;

    @Autowired
    public void setRepository(BlogRepository repository) {
        this.blogRepository = repository;
    }

    public ListBlogsResponseDTO findAll(int limit, int offset) throws Exception {
        List<Blog> blogs = new ArrayList<Blog>();
        Pageable sortedById = PageRequest.of(offset, limit, Sort.by("id").ascending());
        Page<Blog> pageBlogPosts = blogRepository.findAll(sortedById);
        blogs = pageBlogPosts.getContent();
        ListBlogsResponseDTO response = new ListBlogsResponseDTO(
                blogs,
                pageBlogPosts.getTotalPages(),
                pageBlogPosts.getNumberOfElements(),
                pageBlogPosts.getNumber());
        return response;
    }

    public Blog getById(Long id) throws Exception {
        return blogRepository.findById(id).orElseThrow(Exception::new);
    }

    public Blog save(Blog blog) throws Exception {
        try {
            Blog savedBlog = blogRepository.save(blog);
            return savedBlog;
        } catch (Exception e) {
            throw new Exception("Failed to save blog");
        }
    }

    public Blog updateById(Long id, Blog blog) throws Exception {
        Blog foundedBlog = blogRepository.findById(id).orElseThrow(Exception::new);
        blog.setId(foundedBlog.getId());
        return blogRepository.save(blog);
    }

    public void delete(Long id) throws Exception {
        try {
            blogRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("Failed to delete blog");
        }
    }
}
