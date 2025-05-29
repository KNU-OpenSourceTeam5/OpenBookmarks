package com.example.openbookmarks_be.repository;

import com.example.openbookmarks_be.domain.Link;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkRepository extends JpaRepository<Link, Long> {
    Page<Link> findByCategory(String category, Pageable pageable);
}
