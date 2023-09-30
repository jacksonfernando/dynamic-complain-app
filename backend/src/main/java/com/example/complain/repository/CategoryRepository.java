package com.example.complain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.complain.entity.Category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Page<Category> findAll(Pageable pageable);
}
