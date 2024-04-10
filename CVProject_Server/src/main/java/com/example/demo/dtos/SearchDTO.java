package com.example.demo.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchDTO {
    @JsonProperty("full_name")
    private String fullName;
    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    private List<String> skill;

    private List<String> university;

    @JsonProperty("training_system")
    private List<String> trainingSystem;


    private String gpa;

    @JsonProperty("apply_position")
    private List<String> applyPosition;

    private String status;
    @JsonProperty("sort_by")

    private String sortBy;
    @JsonProperty("sort_type")
    private String softType;

}
