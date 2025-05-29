package com.example.openbookmarks_be.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class LinkResponseDto {
    private Long id;
    private String title;
    private String description; // contents 매핑
    private String url;
    private Long views; // view 매핑
    private Long likes;
    private String category;
    private LocalDateTime createdAt;
    private List<String> likedBy;
    private String uploadedBy;
}