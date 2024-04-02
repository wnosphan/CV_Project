package com.example.demo.services;

import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Slf4j
@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public void saveUser(String username, String email){
        User user = new User();
<<<<<<< Updated upstream
        user.setUserName(username);
        user.setEmail(email);
=======
        user.setUserName(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        if(userRepository.findByUserName(user.getUserName()) != null){
            log.warn("User already exists");
            throw new RuntimeException("User already exists");
        }
        log.info("User: "+user+" added successfully!");
>>>>>>> Stashed changes
        userRepository.save(user);
    }
}
