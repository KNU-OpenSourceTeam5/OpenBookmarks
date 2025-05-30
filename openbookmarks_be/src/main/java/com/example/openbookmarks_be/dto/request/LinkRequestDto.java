package com.example.openbookmarks_be.dto.request;

import lombok.Getter;

@Getter
public class LinkRequestDto {
    private String title;
    private String contents;
    private String url;
    private String category;
    private String uploadedBy;
}
