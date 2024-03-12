package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;
//@Entity
@Entity
@Table(name = "skill")
@Getter
@Setter
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skill;

    @ManyToOne
    @JoinColumn(name = "cv_id") // Tên cột ánh xạ
    private Cv cv;
}
