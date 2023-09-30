package com.example.complain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.complain.entity.Blog;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    Page<Blog> findAll(Pageable pageable);
}
