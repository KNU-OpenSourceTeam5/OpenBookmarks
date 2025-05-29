package com.example.openbookmarks_be.service;

import com.example.openbookmarks_be.domain.Link;
import com.example.openbookmarks_be.dto.request.LinkRequestDto;
import com.example.openbookmarks_be.repository.LinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LinkService {

    private final LinkRepository linkRepository;

    public Link createLink(LinkRequestDto dto) {
        Link link = new Link(dto);
        return linkRepository.save(link);
    }


}
