package com.example.demo.services;

import com.example.demo.dtos.UserDTO;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public void saveUser(UserDTO userDTO) {
        User user = new User();
        user.setUserName(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        if(userRepository.findByUserName(user.getUserName()) != null){
            throw new RuntimeException("User already exists");
        }
        userRepository.save(user);
    }
}
