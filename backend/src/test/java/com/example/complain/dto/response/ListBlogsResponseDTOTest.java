package com.example.blog.dto.response;

import com.example.blog.entity.Blog;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

public class ListBlogsResponseDTOTest {
    List<Blog> blogPosts1 = new ArrayList<>();
    List<Blog> blogPosts2 = new ArrayList<>();

    @BeforeEach
    void setup() {
        blogPosts1.add(new Blog(1, "Title 1", "Content 1", "Author 1"));
        blogPosts2.add(new Blog(1, "Title 1", "Content 1", "Author 1"));
    }

    @Test
    public void testEqualsAndHashCode_when_two_object_have_the_same_value() {
        ListBlogsResponseDTO response1 = new ListBlogsResponseDTO(blogPosts1, 10, 100, 1);
        ListBlogsResponseDTO response2 = new ListBlogsResponseDTO(blogPosts2, 10, 100, 1);

        assertEquals(response1, response2);
        assertEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    public void testEqualsAndHashCode_when_two_object_have_the_different_value() {
        ListBlogsResponseDTO response1 = new ListBlogsResponseDTO(blogPosts1, 10, 100, 1);
        ListBlogsResponseDTO response2 = new ListBlogsResponseDTO(blogPosts2, 10, 100, 1);
        response2.setTotalItem(200);

        assertNotEquals(response1, response2);
        assertNotEquals(response1.hashCode(), response2.hashCode());
    }

    @Test
    public void testToString() {
        ListBlogsResponseDTO response = new ListBlogsResponseDTO(blogPosts1, 10, 100, 1);

        assertEquals(
                "{ blogPosts='[" + blogPosts1.get(0) + "]', totalPage='10', totalItem='100', currentPage='1'}",
                response.toString());
    }
}