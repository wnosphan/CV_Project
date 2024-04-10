package com.example.demo.dtos;

import com.example.demo.models.CvStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CvStatusDTO {
    @JsonProperty("id")
    private Long id;
    @JsonProperty("status")
    private String status;
}
