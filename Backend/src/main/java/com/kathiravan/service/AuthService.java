package com.kathiravan.service;

import com.kathiravan.dto.LoginRequest;
import com.kathiravan.dto.RegisterRequest;
import com.kathiravan.entity.Role;
import com.kathiravan.entity.User;
import com.kathiravan.repository.UserRepository;
import com.kathiravan.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public String register(RegisterRequest request) {

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public String login(LoginRequest request) {

        User user = userRepository.findByUsername(
                request.getUsername()
        ).orElseThrow(() -> new RuntimeException("User Not Found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid Password");
        }

        return jwtService.generateToken(user.getUsername());
    }
}