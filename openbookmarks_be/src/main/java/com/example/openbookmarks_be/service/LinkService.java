package com.example.openbookmarks_be.service;

import com.example.openbookmarks_be.domain.Link;
import com.example.openbookmarks_be.domain.User;
import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.dto.response.LinkResponseDto;
import com.example.openbookmarks_be.repository.LinkRepository;
import com.example.openbookmarks_be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LinkService {

    private final LinkRepository linkRepository;
    private final UserRepository userRepository;



//    public void createLink(LinkRequestDto dto, Long userId) {
//        Link link = new Link(dto);
//        linkRepository.save(link);
//    }

    public void createLink(LinkRequestDto dto, Long userId) {
        String username = userRepository.findById(userId)
                .map(User::getUsername)
                .orElse("익명");

        // uploadedBy를 덮어쓰기
        dto.setUploadedBy(username);

        Link link = new Link(dto);
        linkRepository.save(link);
    }

    public Page<LinkResponseDto> getLinks(String category, String search, String likedBy, Pageable pageable) {

        Page<Link> linksPage = category != null && !category.equals("좋아요")
                ? linkRepository.findByCategory(category, pageable)
                : linkRepository.findAll(pageable);

        System.out.println("Links count: " + linksPage.getTotalElements()); // 디버깅

        // Link -> LinkResponseDto 변환
        List<LinkResponseDto> dtos = linksPage.getContent().stream().map(link -> {
            LinkResponseDto dto = new LinkResponseDto();
            dto.setId(link.getId());
            dto.setTitle(link.getTitle());
            dto.setDescription(link.getContents());
            dto.setUrl(link.getUrl());
            dto.setViews(link.getView());
            dto.setLikes(link.getLikes());
            dto.setCategory(link.getCategory());
            dto.setCreatedAt(link.getCreatedAt());
            dto.setLikedBy(link.getLikedBy());
            dto.setUploadedBy(link.getUploadedBy());
            return dto;
        }).collect(Collectors.toList());

        return new PageImpl<>(dtos, pageable, linksPage.getTotalElements());
    }


    // LinkService.java
    public List<LinkResponseDto> findLinksByPartialTitle(String title) {
        List<Link> links = linkRepository.findAllByTitleContainingIgnoreCase(title);

        return links.stream().map(link -> {
            LinkResponseDto dto = new LinkResponseDto();
            dto.setId(link.getId());
            dto.setTitle(link.getTitle());
            dto.setDescription(link.getContents());
            dto.setUrl(link.getUrl());
            dto.setViews(link.getView());
            dto.setLikes(link.getLikes());
            dto.setCategory(link.getCategory());
            dto.setCreatedAt(link.getCreatedAt());
            dto.setLikedBy(link.getLikedBy());
            dto.setUploadedBy(link.getUploadedBy());
            return dto;
        }).collect(Collectors.toList());
    }









}
