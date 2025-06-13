package com.example.openbookmarks_be.service;

import com.example.openbookmarks_be.domain.Link;
import com.example.openbookmarks_be.domain.User;
import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.dto.response.LinkResponseDto;
import com.example.openbookmarks_be.repository.LinkRepository;
import com.example.openbookmarks_be.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
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

        log.info("Links count: {}", linksPage.getTotalElements());
        
        List<LinkResponseDto> dtos = linksPage.getContent().stream()
                .map(LinkResponseDto::of)
                .collect(Collectors.toList());
        return new PageImpl<>(dtos, pageable, linksPage.getTotalElements());
    }


    // LinkService.java
    public List<LinkResponseDto> findLinksByPartialTitle(String title) {
        return linkRepository.findAllByTitleContainingIgnoreCase(title)
                .stream()
                .map(LinkResponseDto::of)
                .collect(Collectors.toList());
    }


    public List<LinkResponseDto> findLinksByUploadedBy(String uploadedBy) {
        List<Link> links = linkRepository.findByUploadedBy(uploadedBy);
        return links.stream()
                .map(LinkResponseDto::of)
                .toList();
    }


}
