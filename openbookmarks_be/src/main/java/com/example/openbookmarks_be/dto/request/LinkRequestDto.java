package com.example.openbookmarks_be.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LinkRequestDto {
    private String title;
    private String contents;
    private String url;
    private String category;
}
