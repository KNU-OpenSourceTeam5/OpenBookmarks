package com.example.openbookmarks_be.controller;

import com.example.openbookmarks_be.dto.request.UserRequestDto;
import com.example.openbookmarks_be.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequestDto dto) {
        try {
            userService.register(dto);
            logger.info("회원가입 성공: username={}", dto.getUsername());
            return ResponseEntity.ok("회원가입 성공");
        } catch (IllegalArgumentException e) {
            logger.error("회원가입 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequestDto dto, HttpSession session) {
        try {
            userService.login(dto, session);
            logger.info("로그인 성공: username={}, sessionId={}", dto.getUsername(), session.getId());
            return ResponseEntity.ok("로그인 성공");
        } catch (IllegalArgumentException e) {
            logger.error("로그인 실패: {}", e.getMessage());
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/session")
    public ResponseEntity<String> checkSession(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        logger.info("세션 확인: sessionId={}, userId={}", session.getId(), userId);
        if (userId == null) {
            logger.warn("세션 없음: sessionId={}", session.getId());
            return ResponseEntity.status(401).body("세션 없음");
        }
        return ResponseEntity.ok("세션 활성");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        logger.info("로그아웃: sessionId={}", session.getId());
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공");
    }
}