package com.example.demo.controllers;

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
<<<<<<< Updated upstream
     @PostMapping("/save-user")
    public void saveUser( @RequestHeader String username, @RequestHeader String email){
        userService.saveUser(username, email);
=======

    @PostMapping("/save-user")
    public void saveUser(@RequestBody UserDTO userDTO) {
        log.info("Request data: " + userDTO);
        userService.saveUser(userDTO);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    }

}

