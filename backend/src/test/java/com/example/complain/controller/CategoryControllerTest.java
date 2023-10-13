package com.example.complain.controller;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.complain.entity.Category;
import com.example.complain.service.CategoryService;

@SpringBootTest
public class CategoryControllerTest {
    private Category category = new Category(1, "title", "label", "text");

    private MockMvc mockMvc;

    @InjectMocks
    private CategoryController categoryController;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private CategoryService categoryService;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(this.categoryController).build();
    }

    // @Test
    // public void fetchAllCategory_should_return_status_200_when_success_find_all()
    // throws Exception {
    // int limit = 5;
    // int offset = 0;
    // when(categoryService.findAll(limit, offset));
    // }

    // @Test
    // public void
    // fetchAllCategory_should_return_status_500_when_failed_to_find_all() throws
    // Exception {

    // }

    @Test
    public void fetchAllCategoryWithoutPagination_should_return_status_200_when_failed_to_find_all_without_pagination()
            throws Exception {

    }

    @Test
    public void fetchAllCategoryWithoutPagination_should_return_status_500_when_failed_to_find_all_without_pagination()
            throws Exception {

    }

    // @Test
    // public void
    // fetchCategoryById_should_return_status_200_when_success_fetch_by_id() throws
    // Exception {

    // }

    @Test
    public void saveCategory_should_return_status_201_when_success_saving_requets() throws Exception{
        when(this.categoryService.save(category)).thenReturn(category);

        mockMvc.perform(MockMvcRequestBuilders
        .post("/api/v1/categories")
        .content(objectMapper.writeValueAsBytes(category))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(status().isCreated());
    }

    @Test
    public void saveCategory_should_return_status_500_when_success_saving_requets() throws Exception {
        doThrow(new IllegalArgumentException("Failed to save category")).when(categoryService).save(category);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/categories")
                .content(objectMapper.writeValueAsBytes(category))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)).andExpect(status().isCreated());
    }

    @Test
    public void deleteCategory_should_return_status_200_when_success_delete()
            throws Exception {
        doNothing().when(categoryService).delete(Long.parseLong("1"));

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/v1/categories/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteCategory_should_return_status_500_when_failing_delete()
            throws Exception {
        doThrow(new IllegalArgumentException("Failed to delete by id"))
                .when(categoryService)
                .delete(category.getId());

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/v1/categories/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());

    }
}
