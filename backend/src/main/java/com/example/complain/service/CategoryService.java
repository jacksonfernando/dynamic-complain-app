package com.example.complain.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.complain.dto.response.ListCategoryResponseDTO;
import com.example.complain.entity.Category;
import com.example.complain.repository.CategoryRepository;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public void setRepository(CategoryRepository repository) {
        this.categoryRepository = repository;
    }

    public ListCategoryResponseDTO findAll(int limit, int offset) throws Exception {
        List<Category> Categories = new ArrayList<Category>();
        Pageable sortedById = PageRequest.of(offset, limit, Sort.by("id").ascending());
        Page<Category> pageCategoryPosts = categoryRepository.findAll(sortedById);
        Categories = pageCategoryPosts.getContent();
        ListCategoryResponseDTO response = new ListCategoryResponseDTO(
                Categories,
                pageCategoryPosts.getTotalPages(),
                pageCategoryPosts.getNumberOfElements(),
                pageCategoryPosts.getNumber());
        return response;
    }

    public List<Category> findAllWithoutPagination() throws Exception {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    public Category getById(Long id) throws Exception {
        return categoryRepository.findById(id).orElseThrow(Exception::new);
    }

    public Category save(Category category) throws Exception {
        try {
            Category savedCategory = categoryRepository.save(category);
            return savedCategory;
        } catch (Exception e) {
            throw new Exception("Failed to save category");
        }
    }

    public Category updateById(Long id, Category Category) throws Exception {
        Category foundedCategory = categoryRepository.findById(id).orElseThrow(Exception::new);
        Category.setId(foundedCategory.getId());
        return categoryRepository.save(Category);
    }

    public void delete(Long id) throws Exception {
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            throw new Exception("Failed to delete category");
        }
    }
}
