package com.example.complain.entity;

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

    @Nonnull
    @Column(name = "issue_description", nullable = false)
    private String issueDescription;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<?> extraFields;

    public Complain(long id, String fullName, String email, String issueDescription,
            List<?> extraFields) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.issueDescription = issueDescription;
        this.extraFields = extraFields;
    }

    public Complain() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIssueDescription() {
        return issueDescription;
    }

    public void setIssueDescription(String issueDescription) {
        this.issueDescription = issueDescription;
    }

    public List<?> getExtraFields() {
        return extraFields;
    }

    public void setExtraFields(List<?> extraFields) {
        this.extraFields = extraFields;
    }

}
