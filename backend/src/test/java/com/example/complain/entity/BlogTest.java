package com.example.complain.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class BlogTest {
    Blog blog1 = new Blog(1, "Title 1", "Body 1", "Author 1");
    Blog blog2 = new Blog(1, "Title 1", "Body 1", "Author 1");
    Blog blog3 = new Blog(2, "Title 2", "Body 2", "Author 2");

    @Test
    public void testEquals() {
        assertTrue(blog1.equals(blog2));
        assertFalse(blog1.equals(blog3));

        assertNotEquals(blog1, null);
    }

    @Test
    public void testHashCode() {
        assertEquals(blog1.hashCode(), blog2.hashCode());
        assertNotEquals(blog1.hashCode(), blog3.hashCode());
    }

    @Test
    public void testToString() {
        assertEquals("{ id='1', title='Title 1', body='Body 1', author='Author 1'}", blog1.toString());
    }
}
