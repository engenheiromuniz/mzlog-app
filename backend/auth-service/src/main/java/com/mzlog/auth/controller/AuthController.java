package com.mzlog.auth.controller;

import com.mzlog.auth.dto.LoginRequest;
import com.mzlog.auth.dto.LoginResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String FIXED_USERNAME = "muniz";
    private static final String FIXED_PASSWORD = "muniz";

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        if (!FIXED_USERNAME.equals(request.getUsername()) || !FIXED_PASSWORD.equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuario ou senha invalidos");
        }
        String token = UUID.randomUUID().toString();
        return ResponseEntity.ok(new LoginResponse(token, request.getUsername()));
    }
}
