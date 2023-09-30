package com.example.complain.dto.response;

import java.util.List;

import com.example.complain.entity.Category;

public class ListCategoryResponseDTO {
    private List<Category> categories;

    private int currentPage;

    private int totalPage;

    private int totalItem;

    public ListCategoryResponseDTO(List<Category> categories, int totalPage, int totalItem, int currentPage) {
        this.categories = categories;
        this.totalPage = totalPage;
        this.totalItem = totalItem;
        this.currentPage = currentPage;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getTotalItem() {
        return totalItem;
    }

    public void setTotalItem(int totalItem) {
        this.totalItem = totalItem;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((categories == null) ? 0 : categories.hashCode());
        result = prime * result + totalPage;
        result = prime * result + totalItem;
        result = prime * result + currentPage;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ListCategoryResponseDTO other = (ListCategoryResponseDTO) obj;
        if (categories == null) {
            if (other.categories != null)
                return false;
        } else if (!categories.equals(other.categories))
            return false;
        if (totalPage != other.totalPage)
            return false;
        if (totalItem != other.totalItem)
            return false;
        if (currentPage != other.currentPage)
            return false;
        return true;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

}
