package com.example.demo.controllers;

import com.example.demo.dtos.CvDTO;
import com.example.demo.models.Cv;
import com.example.demo.repositories.CvRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.responses.CvListResponse;
import com.example.demo.responses.CvResponse;
import com.example.demo.services.CVService;
import com.example.demo.services.ICvService;
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

    private final ICvService cvService;

    @PostMapping("")
    private ResponseEntity<?> postCV(
            @Valid @RequestBody CvDTO cvDTO,
            BindingResult result) throws Exception {
        if (result.hasErrors()) {
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
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "limit", defaultValue = "10") int limit
    ) {
        try {
            Page<CvResponse> cvList = cvService.getAllCv(page, limit);
            int totalPage = cvList.getTotalPages();
            List<CvResponse> cvs = cvList.getContent();
            return ResponseEntity.ok(CvListResponse.builder()
                    .cvResponses(cvs)
                    .totalPage(totalPage)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getCvById(@Valid @PathVariable("id") Long id) {
        try {
            Cv cv = cvService.getCvById(id);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    private ResponseEntity<?> updateCv(
            @PathVariable long id,
            @Valid @RequestBody CvDTO cvDTO
    ) {
        try {
            Cv updateCv = cvService.updateCv(id, cvDTO);
            return ResponseEntity.ok(updateCv);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
