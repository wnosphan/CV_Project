package com.example.demo.controllers;

import com.example.demo.dtos.UserDTO;
import com.example.demo.models.User;
import com.example.demo.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("${api.prefix}/cv")
@CrossOrigin(origins = "${fe.base-url}",
        allowedHeaders = "*",
        allowCredentials = "true",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}
)
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/save-user")
    public void saveUser(@RequestBody UserDTO userDTO) {
        log.info("Request data: " + userDTO);
        userService.saveUser(userDTO);

    public void saveUser(@RequestBody UserDTO userDTO){
        userService.saveUser(userDTO);

    }

}

