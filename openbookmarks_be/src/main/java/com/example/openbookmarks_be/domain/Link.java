package com.example.openbookmarks_be.domain;

import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "link")
@AllArgsConstructor
@NoArgsConstructor
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false,columnDefinition = "BIGINT DEFAULT 0")
    private Long likes;

    @Column(nullable = false,columnDefinition = "BIGINT DEFAULT 0")
    private Long view;


    public Link(LinkRequestDto dto) {
        this.title = dto.getTitle();
        this.contents = dto.getContents();
        this.url = dto.getUrl();
        this.likes = 0L;
        this.view = 0L;
    }

}
