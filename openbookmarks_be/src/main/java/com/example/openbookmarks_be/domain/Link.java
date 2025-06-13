package com.example.openbookmarks_be.domain;

import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "link")
@AllArgsConstructor
@NoArgsConstructor
@Getter
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

    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long likes;

    @Column(nullable = false, columnDefinition = "BIGINT DEFAULT 0")
    private Long view;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '기타'")
    private String category;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ElementCollection
    @CollectionTable(name = "link_liked_by", joinColumns = @JoinColumn(name = "link_id"))
    @Column(name = "liked_by")
    private List<String> likedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uploaded_by", referencedColumnName = "username", nullable = false)
    private User user;

    public Link(LinkRequestDto dto, User user) {
        this.title = dto.getTitle();
        this.contents = dto.getContents();
        this.url = dto.getUrl();
        this.likes = 0L;
        this.view = 0L;
        this.category = dto.getCategory() != null ? dto.getCategory() : "기타";
        this.user = user;
        this.createdAt = LocalDateTime.now();
        this.likedBy = new ArrayList<>();
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        if (this.category == null) {
            this.category = "기타";
        }

    }
}
