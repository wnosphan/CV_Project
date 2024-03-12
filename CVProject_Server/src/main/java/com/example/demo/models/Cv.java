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

    @Column(name = "fullName", length = 45)
    private String fullName;

    @Column(name = "dateOfBirth", length = 45)
    private Date dateOfBirth;

    @Column(name = "skill", length = 45)
    private String skill;

    @Column(name = "university", length = 45)
    private String university;

    @Column(name = "trainingSystem", length = 45)
    private String trainingSystem;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User createBy;

    @Column(name = "GPA", length = 45)
    private String GPA;

    @Column(name = "applyPosition", length = 45)
    private String applyPosition;

    @Column(name = "linkCV", length = 45)
    private String linkCV;

    @Column(name = "status", length = 45)
    private CvStatus status;
}
