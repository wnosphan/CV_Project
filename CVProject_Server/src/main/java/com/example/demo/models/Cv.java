package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "cv")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", length = 45)
    private String fullName;

    @Column(name = "date_of_birth", length = 45)
    private Date dateOfBirth;

    @Column(name = "skill", length = 45)
    private String skill;

    @Column(name = "university", length = 45)
    private String university;

    @Column(name = "training_system", length = 45)
    private String trainingSystem;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createBy;

    @Column(name = "gpa", length = 45)
    private String GPA;

    @Column(name = "apply_position", length = 45)
    private String applyPosition;

    @Column(name = "link_cv", length = 45)
    private String linkCV;

    @Column(name = "status", length = 45)
    private String status;
}
