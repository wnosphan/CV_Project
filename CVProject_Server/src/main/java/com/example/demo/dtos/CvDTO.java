package com.example.demo.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CvDTO {
    @NotBlank(message = "Full_name is required")
    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("date_of_birth")
    private Date dateOfBirth;

    private String skill;

    private String university;

    @JsonProperty("training_system")
    private String trainingSystem;

    @JsonProperty("create_by")
    private Long createBy;

    private String GPA;

    @JsonProperty("apply_position")
    private String applyPosition;

    @JsonProperty("link_cv")
    private String linkCV;
}