package com.example.complain.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.complain.dto.response.ListComplainResponseDTO;
import com.example.complain.repository.ComplainRepository;
import com.example.complain.entity.Complain;

@Service
public class ComplainService {
    private ComplainRepository complainRepository;

    @Autowired
    public void setRepository(ComplainRepository repository) {
        this.complainRepository = repository;
    }

    public ListComplainResponseDTO findAll(int limit, int offset) throws Exception {
        List<Complain> Categories = new ArrayList<Complain>();
        Pageable sortedById = PageRequest.of(offset, limit, Sort.by("id").ascending());
        Page<Complain> pageComplainPosts = complainRepository.findAll(sortedById);
        Categories = pageComplainPosts.getContent();
        ListComplainResponseDTO response = new ListComplainResponseDTO(
                Categories,
                pageComplainPosts.getTotalPages(),
                pageComplainPosts.getNumberOfElements(),
                pageComplainPosts.getNumber());
        return response;
    }

    public Complain getById(Long id) throws Exception {
        return complainRepository.findById(id).orElseThrow(Exception::new);
    }

    public Complain save(Complain Complain) throws Exception {
        try {
            Complain savedComplain = complainRepository.save(Complain);
            return savedComplain;
        } catch (Exception e) {
            throw new Exception("Failed to save Complain");
        }
    }

    public Complain updateById(Long id, Complain Complain) throws Exception {
        Complain foundedComplain = complainRepository.findById(id).orElseThrow(Exception::new);
        Complain.setId(foundedComplain.getId());
        return complainRepository.save(Complain);
    }

    public void delete(Long id) throws Exception {
        try {
            complainRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("Failed to delete Complain");
        }
    }
}
