package com.example.blog.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.example.blog.dto.response.ListBlogsResponseDTO;
import com.example.blog.entity.Blog;
import com.example.blog.repository.BlogRepository;

@SpringBootTest
public class BlogServiceTest {
    Blog blog = new Blog();

    @Mock
    private BlogRepository blogRepository;

    @InjectMocks
    private BlogService blogService;

    @BeforeEach
    public void setup() {
        blog.setId(1);
        blog.setAuthor("JK Rowling");
        blog.setTitle("Harry Potter fans blog");
        blog.setBody("This is a harry potter fans blog");
    }

    @Test
    public void testFindAll_should_return_list_of_user_dto_when_invoked() throws Exception {
        int limit = 10, offset = 0;
        List<Blog> blogPosts = new ArrayList<Blog>();
        blogPosts.add(blog);
        ListBlogsResponseDTO expectedResult = new ListBlogsResponseDTO(
                blogPosts,
                1,
                1,
                0);

        Pageable sortedById = PageRequest.of(offset, limit, Sort.by("id").ascending());
        Page<Blog> pageBlogPost = new PageImpl<>(List.of(blog), sortedById, 1);
        when(blogRepository.findAll(sortedById)).thenReturn(pageBlogPost);
        ListBlogsResponseDTO blogsResult = blogService.findAll(limit, offset);

        assertEquals(expectedResult, blogsResult);
    }

    @Test
    public void testSave_should_return_saved_blog_post_when_invoked() throws Exception {
        when(blogService.save(blog)).thenReturn(blog);

        Blog savedBlogPost  = blogService.save(blog);

        assertEquals(savedBlogPost, blog);
    }

    @Test
    public void testSave_should_return_exception_when_failed_to_save_blog_post() throws Exception {
        doThrow(new IllegalArgumentException("Failed to save blog")).when(blogRepository).save(blog);

        assertThrows(Exception.class, () -> {
            blogService.save(blog);
        });
    }

    @Test
    public void testUpdateById_should_return_updated_blog_post_when_invoked() throws Exception {
        Blog updatedBlog = new Blog(1, "updated blog", "test", "fernando");
        Optional<Blog> optionalBlogPost = Optional.of(blog);
        when(blogRepository.findById(blog.getId())).thenReturn(optionalBlogPost);
        when(blogRepository.save(updatedBlog)).thenReturn(updatedBlog);

        Blog actualResult = blogService.updateById(blog.getId(), updatedBlog);

        assertEquals(updatedBlog, actualResult);
    }

    @Test
    public void testUpdateById_should_throw_exception_when_blog_post_not_found() throws Exception {
        assertThrows(Exception.class, () -> {
            blogService.updateById(blog.getId(), blog);
        });
    }

    @Test
    public void testGetById_should_return_blog_post_when_invoked() throws Exception {
        Optional<Blog> optionalBook = Optional.of(blog);
        when(blogRepository.findById(blog.getId())).thenReturn(optionalBook);

        Blog foundedBlog = blogService.getById(blog.getId());

        assertEquals(foundedBlog, blog);
    }

    @Test
    public void testGetById_should_throw_exception_when_blog_not_found() throws Exception {
        assertThrows(Exception.class, () -> {
            blogService.getById(blog.getId());
        });
    }

    @Test
    public void testDelete_should_invoke_delete() throws Exception {
        doNothing().when(blogRepository).deleteById(blog.getId());

        blogService.delete(blog.getId());

        verify(blogRepository, times(1)).deleteById(blog.getId());
    }

    @Test
    public void testDelete_should_return_exception_when_failed_to_delete_blog() throws Exception {
        doThrow(new IllegalArgumentException("Failed to delete by id")).when(blogRepository).deleteById(blog.getId());

        assertThrows(Exception.class, () -> {
            blogService.delete(blog.getId());
        });
    }
}
