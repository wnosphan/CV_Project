package com.example.demo.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

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

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;

    private String skill;

    private String university;

    @Column(name = "training_system")
    private String trainingSystem;

    @ManyToOne
    @JoinColumn(name = "create_by")
    private User createdBy;

    private String gpa;

    @Column(name = "apply_position")
    private String applyPosition;

    @Column(name = "link_cv")
    private String linkCV;

    private String status;


}
