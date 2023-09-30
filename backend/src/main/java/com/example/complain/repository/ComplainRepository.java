package com.example.complain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.complain.entity.Complain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ComplainRepository extends JpaRepository<Complain, Long> {
    Page<Complain> findAll(Pageable pageable);
}
