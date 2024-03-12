package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;
//@Entity
@Table(name = "skill")
@Data
@AllArgsConstructor
@NoArgsConstructor
//@Builder
public class Skill {
//    @ManyToOne
    @Column(name = "idCv")
    private Long idCv;

    @Column(name = "skill")
    private String skill;
}
