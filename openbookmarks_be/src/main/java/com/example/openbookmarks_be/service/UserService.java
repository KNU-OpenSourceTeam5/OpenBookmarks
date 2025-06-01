package com.example.openbookmarks_be.service;

import com.example.openbookmarks_be.dto.request.UserRequestDto;
import com.example.openbookmarks_be.domain.User;
import com.example.openbookmarks_be.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;




@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void register(UserRequestDto dto) {
        if (userRepository.findByUsername(dto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        }


        User user = new User(dto.getUsername(), dto.getPassword());
        userRepository.save(user);
    }

    public void login(UserRequestDto dto, HttpSession session) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));

        if (!dto.getPassword().equals(user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        session.setAttribute("userId", user.getId());
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }
}