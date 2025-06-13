package com.example.openbookmarks_be.service;

import com.example.openbookmarks_be.domain.Link;
import com.example.openbookmarks_be.domain.User;
import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.dto.response.LinkResponseDto;
import com.example.openbookmarks_be.repository.LinkRepository;
import com.example.openbookmarks_be.repository.UserRepository;
import java.util.List;
import java.util.Optional;
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
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Link link = new Link(dto, user);
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


    public List<LinkResponseDto> findLinksByUsername(String username) {
        List<Link> links = linkRepository.findByUser_Username(username);
        return links.stream()
                .map(LinkResponseDto::of)
                .toList();
    }


    public boolean deleteLink(Long linkId, String username) {
        Optional<Link> optionalLink = linkRepository.findById(linkId);
        if (optionalLink.isEmpty()) {
            return false;
        }

        Link link = optionalLink.get();
        if (!link.getUser().getUsername().equals(username)) {
            return false;
        }

        linkRepository.delete(link);
        return true;
    }


}
