package com.example.complain.entity;

import java.util.Map;
import java.util.List;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity(name = "complains")
public class Complain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Nonnull
    @Column(name = "fullname", nullable = false)
    private String fullName;

    @Nonnull
    @Column(name = "email", nullable = false)
    private String email;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<Map<String, String>> extraFields;
}
