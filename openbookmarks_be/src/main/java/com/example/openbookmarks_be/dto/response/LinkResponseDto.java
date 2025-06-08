package com.example.openbookmarks_be.dto.response;

import com.example.openbookmarks_be.domain.Link;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LinkResponseDto {

    private Long id;
    private String title;
    private String description;
    private String url;
    private Long views;
    private Long likes;
    private String category;
    private LocalDateTime createdAt;
    private List<String> likedBy;
    private String uploadedBy;

    public static LinkResponseDto of(Link link) {
        return LinkResponseDto.builder()
                .id(link.getId())
                .title(link.getTitle())
                .description(link.getContents())
                .url(link.getUrl())
                .views(link.getView())
                .likes(link.getLikes())
                .category(link.getCategory())
                .createdAt(link.getCreatedAt())
                .likedBy(link.getLikedBy())
                .uploadedBy(link.getUploadedBy())
                .build();
    }
}
