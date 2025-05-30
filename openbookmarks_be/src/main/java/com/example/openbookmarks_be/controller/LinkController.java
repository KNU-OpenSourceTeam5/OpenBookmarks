package com.example.openbookmarks_be.controller;

import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.dto.response.LinkResponseDto;
import com.example.openbookmarks_be.service.LinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<Void> createLink(@RequestBody LinkRequestDto requestDto) {
        linkService.createLink(requestDto);
        return ResponseEntity.status(201).build();
    }


    // LinkController.java
    @GetMapping("/{title}")
    public ResponseEntity<List<LinkResponseDto>> getLinksByTitle(@PathVariable String title) {
        List<LinkResponseDto> dtos = linkService.findLinksByPartialTitle(title);
        return ResponseEntity.ok(dtos);
    }

}
