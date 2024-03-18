package com.example.demo.controllers;

import com.example.demo.services.KeycloakService;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class KeycloakController {
    private final KeycloakService keycloakService;

    @PostMapping("/hello")
    private ResponseEntity<?> abc(
//            @RequestParam("client_id") String clientId,
//            @RequestParam("token") String token,
//            @RequestParam("client_secret") String clientSecret
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) throws Exception {
        if (token.isEmpty()){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token missing");
        }else if (!token.startsWith("Bearer "))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Format error");

        String realToken = token.substring(7);
        if (keycloakService.introspectToken(realToken))
            return ResponseEntity.status(HttpStatus.OK).body("True");
        else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("False");
    }
}
