package com.example.blog.dto.response;

import java.util.List;

import com.example.blog.entity.Blog;
import java.util.Objects;

public class ListBlogsResponseDTO {
    private List<Blog> blogPosts;

    private int totalPage;

    private int totalItem;

    private int currentPage;

    public ListBlogsResponseDTO() {
    }

    public ListBlogsResponseDTO(List<Blog> blogPosts, int totalPage, int totalItem, int currentPage) {
        this.blogPosts = blogPosts;
        this.totalPage = totalPage;
        this.totalItem = totalItem;
        this.currentPage = currentPage;
    }

    public List<Blog> getBlogPosts() {
        return this.blogPosts;
    }

    public void setBlogPosts(List<Blog> blogPosts) {
        this.blogPosts = blogPosts;
    }

    public int getTotalPage() {
        return this.totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getTotalItem() {
        return this.totalItem;
    }

    public void setTotalItem(int totalItem) {
        this.totalItem = totalItem;
    }

    public int getCurrentPage() {
        return this.currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ListBlogsResponseDTO)) {
            return false;
        }
        ListBlogsResponseDTO listBlogsResponseDTO = (ListBlogsResponseDTO) o;
        return Objects.equals(blogPosts, listBlogsResponseDTO.blogPosts) && totalPage == listBlogsResponseDTO.totalPage
                && totalItem == listBlogsResponseDTO.totalItem && currentPage == listBlogsResponseDTO.currentPage;
    }

    @Override
    public int hashCode() {
        return Objects.hash(blogPosts, totalPage, totalItem, currentPage);
    }

    @Override
    public String toString() {
        return "{" +
                " blogPosts='" + getBlogPosts() + "'" +
                ", totalPage='" + getTotalPage() + "'" +
                ", totalItem='" + getTotalItem() + "'" +
                ", currentPage='" + getCurrentPage() + "'" +
                "}";
    }
}
