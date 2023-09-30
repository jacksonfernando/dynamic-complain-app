package com.example.blog.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.type.descriptor.jdbc.NCharJdbcType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.blog.dto.response.ListBlogsResponseDTO;
import com.example.blog.entity.Blog;
import com.example.blog.service.BlogService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
public class BlogControllerTest {
    Blog blog = new Blog();

    private MockMvc mockMvc;

    @InjectMocks
    private BlogController blogController;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private BlogService blogService;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(this.blogController).build();
        blog.setTitle("test title");
        blog.setAuthor("test author");
        blog.setBody("test body");
        blog.setId(1);
    }

    @Test
    public void testSaveBlogPost_should_return_status_201_when_blog_successfully_created() throws Exception {
        when(blogService.save(blog)).thenReturn(blog);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/blog-posts")
                .content(objectMapper.writeValueAsBytes(blog))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void testSaveBlogPost_should_return_status_500_when_failed_to_save_book() throws Exception {
        doThrow(new IllegalArgumentException("Failed to save blog post")).when(blogService).save(blog);

        mockMvc.perform(MockMvcRequestBuilders
                .post("/api/v1/blog-posts")
                .content(objectMapper.writeValueAsBytes(blog))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    };

    @Test
    public void testFetchAllBlogPosts_should_return_status_200_when_all_books_fetched() throws Exception {
        int limit = 5, offset = 0, currentPage = 0;
        List<Blog> blogsPosts = new ArrayList<Blog>();
        blogsPosts.add(blog);
        ListBlogsResponseDTO fetchedBlogs = new ListBlogsResponseDTO(blogsPosts, 1, 1, currentPage);

        when(blogService.findAll(limit, offset)).thenReturn(fetchedBlogs);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/v1/blog-posts")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.blogPosts[0].title").value(blog.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.blogPosts[0].body").value(blog.getBody()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.blogPosts[0].author").value(blog.getAuthor()));
    }

    @Test
    public void testFetchAllBlogPosts_should_return_status_500_when_failed_to_fetch_all_blog_posts() throws Exception {
        int limit = 5, offset = 0;
        when(blogService.findAll(limit, offset)).thenThrow(new Exception("Internal server error"));

        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/v1/blog-posts")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void testFetchBlogPostById_should_return_status_200_when_blog_fetched() throws Exception {
        when(blogService.getById(blog.getId())).thenReturn(blog);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/v1/blog-posts/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(blog.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.body").value(blog.getBody()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.author").value(blog.getAuthor()));
    }

    @Test
    public void testUpdateBlogPost_should_return_status_200_when_blog_updated() throws Exception {
        Blog newBlogPost = new Blog(1, "new title", "new body", "new author");
        when(blogService.updateById(Long.parseLong("1"), newBlogPost)).thenReturn(newBlogPost);

        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/v1/blog-posts/1")
                .content(objectMapper.writeValueAsBytes(newBlogPost))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(newBlogPost.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.body").value(newBlogPost.getBody()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.author").value(newBlogPost.getAuthor()));
    }

    @Test
    public void testUpdateBlogPost_should_return_status_500_when_failed_to_update_blog_post() throws Exception {
        Blog newBlogPost = new Blog(1, "new title", "new body", "new author");
        when(blogService.updateById(Long.parseLong("1"), newBlogPost))
                .thenThrow(new Exception("Failed to update blog posts"));

        mockMvc.perform(MockMvcRequestBuilders
                .put("/api/v1/blog-posts/1")
                .content(objectMapper.writeValueAsBytes(newBlogPost))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void testDeleteBlogPost_should_return_status_200_when_blog_successfully_deleted() throws Exception {
        doNothing().when(blogService).delete(Long.parseLong("1"));

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/v1/blog-posts/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteBlogPost_should_return_status_500_when_failed_to_delete() throws Exception {
        doThrow(new IllegalArgumentException("Failed to delete by id"))
                .when(blogService)
                .delete(blog.getId());

        mockMvc.perform(MockMvcRequestBuilders
                .delete("/api/v1/blog-posts/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is5xxServerError());
    };
}
