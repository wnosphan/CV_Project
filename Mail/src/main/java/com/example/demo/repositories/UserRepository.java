package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u.email FROM User u")
    List<String> getAllEmails();
    @Query("SELECT u.email FROM User u WHERE u.email = :email")
    String findUserByEmail (String email);
}
