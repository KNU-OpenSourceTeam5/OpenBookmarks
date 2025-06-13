package com.example.openbookmarks_be.controller;

import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.dto.response.LinkResponseDto;
import com.example.openbookmarks_be.service.LinkService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/links")
public class LinkController {

    private final LinkService linkService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getLinks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "id,desc") String sort,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String likedBy) {
        String[] sortParams = sort.split(",");
        String sortBy = sortParams[0];
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("asc") ?
                Sort.Direction.ASC : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<LinkResponseDto> linksPage = linkService.getLinks(category, search, likedBy, pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", linksPage.getContent());
        response.put("totalPages", linksPage.getTotalPages());

        return ResponseEntity.ok(response);
    }



    @PostMapping
    public ResponseEntity<Void> createLink(
            @RequestBody LinkRequestDto linkRequestDto,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        linkService.createLink(linkRequestDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // 201만 응답
    }


    // LinkController.java
    @GetMapping("/{title}")
    public ResponseEntity<List<LinkResponseDto>> getLinksByTitle(@PathVariable String title) {
        List<LinkResponseDto> dtos = linkService.findLinksByPartialTitle(title);
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/my/{username}")
    public ResponseEntity<List<LinkResponseDto>> getLinksByUsername(@PathVariable("username") String username) {
        List<LinkResponseDto> links = linkService.findLinksByUsername(username);
        return ResponseEntity.ok(links);
    }


    @DeleteMapping("{linkId}")
    public ResponseEntity<String> deleteLink(@PathVariable Long linkId, HttpSession session) {
        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        boolean deleted = linkService.deleteLink(linkId, username);
        if (deleted) {
            return ResponseEntity.ok("링크가 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("삭제 권한이 없습니다.");
        }
    }


    @PutMapping("/{linkId}")
    public ResponseEntity<String> updateLink(
            @PathVariable Long linkId,
            @RequestBody LinkRequestDto dto,
            HttpSession session) {

        String username = (String) session.getAttribute("username");
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        boolean updated = linkService.updateLink(linkId, dto, username);
        if (updated) {
            return ResponseEntity.ok("링크가 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("수정 권한이 없습니다.");
        }
    }

}
