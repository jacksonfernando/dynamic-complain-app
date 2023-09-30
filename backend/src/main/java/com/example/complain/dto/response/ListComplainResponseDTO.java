package com.example.complain.dto.response;

import com.example.complain.entity.Complain;
import java.util.List;

public class ListComplainResponseDTO {
    List<Complain> complains;

    private int totalPage;

    private int totalItem;

    private int currentPage;

    public List<Complain> getComplains() {
        return complains;
    }

    public ListComplainResponseDTO() {
    }

    public ListComplainResponseDTO(List<Complain> complains, int totalPage, int totalItem, int currentPage) {
        this.complains = complains;
        this.totalPage = totalPage;
        this.totalItem = totalItem;
        this.currentPage = currentPage;
    }

    public void setComplains(List<Complain> complains) {
        this.complains = complains;
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

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
