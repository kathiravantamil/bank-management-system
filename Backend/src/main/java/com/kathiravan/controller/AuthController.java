package com.kathiravan.controller;

import com.kathiravan.dto.AuthResponse;
import com.kathiravan.dto.LoginRequest;
import com.kathiravan.dto.RegisterRequest;
import com.kathiravan.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        String token = authService.login(request);

        return new AuthResponse(token);
    }
}