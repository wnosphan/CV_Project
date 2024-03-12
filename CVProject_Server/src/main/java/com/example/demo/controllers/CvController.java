package com.example.demo.controllers;

import com.example.demo.dtos.CvDTO;
import com.example.demo.models.Cv;
import com.example.demo.repositories.CvRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.CVService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/cv")
@RequiredArgsConstructor
public class CvController {
    private final CvRepository cvRepository;

    private final CVService cvService;

    @PostMapping("")
    private ResponseEntity<?> postCV(
            @Valid @RequestBody CvDTO cvDTO,
            BindingResult result) throws Exception {
        if (result.hasErrors()){
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessages);
        }
        Cv cv = cvService.creatCv(cvDTO);
            return ResponseEntity.ok(cv);
    }

    @GetMapping("")
    private ResponseEntity<?> getListCV(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ) {
        return ResponseEntity.ok(cvService.getAllCv(page, limit));
    }
}
