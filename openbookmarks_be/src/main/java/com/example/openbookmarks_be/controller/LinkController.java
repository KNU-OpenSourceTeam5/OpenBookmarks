package com.example.openbookmarks_be.controller;

import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.service.LinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/links")
public class LinkController {

    private final LinkService postService;

    private final LinkService linkService;

    @PostMapping
    public ResponseEntity<Void> createLink(@RequestBody LinkRequestDto dto) {
        linkService.createLink(dto);
        return ResponseEntity.status(201).build(); // 201 Created
    }

}
