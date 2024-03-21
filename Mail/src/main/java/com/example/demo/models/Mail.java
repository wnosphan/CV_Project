package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

@Entity
@Table(name = "mail")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "from_address")
    private String fromAddress;
    @Column(name = "to_address")
    private String toAdress;
    @Column(name = "create_at")
    private LocalDateTime createAt;
    private String message;

}
