package com.example.openbookmarks_be.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "link")
public class Link {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String contents;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false,columnDefinition = "BIGINT DEFAULT 0")
    private Long like;

    @Column(nullable = false,columnDefinition = "BIGINT DEFAULT 0")
    private Long view;

}
