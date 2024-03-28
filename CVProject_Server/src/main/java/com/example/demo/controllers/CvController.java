package com.example.demo.controllers;

import com.example.demo.dtos.CvDTO;
import com.example.demo.dtos.CvStatusDTO;
import com.example.demo.dtos.ListCvIdDTO;
import com.example.demo.models.Cv;
import com.example.demo.responses.CvListResponse;
import com.example.demo.responses.CvResponse;
import com.example.demo.services.ICvService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

@Slf4j
@RestController
@RequestMapping("${api.prefix}/cv")
@CrossOrigin(origins = "${fe.base-url}",
        allowedHeaders = "*",
        allowCredentials = "true",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH}
)
@RequiredArgsConstructor
public class CvController {

    private final ICvService cvService;

    @Operation(summary = "Create new CV", description = "Require cvDTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create new Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PostMapping("")
    private ResponseEntity<?> postCV(@Valid @RequestBody CvDTO cvDTO, BindingResult result) {
        try {
            log.info("Request data: "+cvDTO);
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                log.error(errorMessages.toString());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Cv cv = cvService.creatCv(cvDTO);
            log.info("Response data: " +cv);
            return ResponseEntity.ok(cv);
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get all Cv by User", description = "Require userName, page, limit")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get all Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @GetMapping("/user/{created_by}")
    private ResponseEntity<?> getAll(
            @PathVariable("created_by") Long createdBy,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "limit", defaultValue = "5") int limit
    ) {
        try {
            log.info("Request data: createdBy: "+createdBy+"; Page: "+page+"; Limit: "+limit);
            Page<CvResponse> cv = cvService.getListCv(createdBy,page,limit);
            int totalPage = cv.getTotalPages();
            List<CvResponse> cvs = cv.getContent();
            log.info("Response data: "+cv);
            return ResponseEntity.ok(CvListResponse.builder()
                    .cvResponses(cvs)
                    .totalPages(totalPage)
                    .build());
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get Cv by ID", description = "Cv ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create new Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @GetMapping("/{id}")
    private ResponseEntity<?> getCvById(@Valid @PathVariable("id") Long id) {
        try {
            log.info("Request data: Cv ID: " +id);
            Cv cv = cvService.getCvById(id);
            log.info("Response data: "+cv);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @Operation(summary = "Update CV", description = "Require Cv ID, cvDTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PutMapping("/{id}")
    private ResponseEntity<?> updateCv(@PathVariable long id, @Valid @RequestBody CvDTO cvDTO) {
        try {
            log.info("Request data: Cv ID: "+id+";\nCvDTO: "+cvDTO);
            Cv updateCv = cvService.updateCv(id, cvDTO);
            log.info("Response data: "+updateCv);
            return ResponseEntity.ok(updateCv);
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update CV status", description = "Require Cv ID, status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update status successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PatchMapping("/{id}")
    private ResponseEntity<?> updateCvStatus(@PathVariable long id, @Valid @RequestParam("status") String status) {
        try {
            log.info("Request data: Cv ID: "+id+"; status: "+status);
            Cv cv = cvService.updateCvStatus(id, status);
            log.info("Response data: "+cv);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update list CV status", description = "Require list of Cv ID - status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update status successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PatchMapping("")
    private ResponseEntity<?> updateListCvStatus(@Valid @RequestBody List<CvStatusDTO> ids) {
        try {
            log.info("Request data: ");
            cvService.updateListCvStatus(ids);
            return ResponseEntity.ok("CV status list has been updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Delete Cv", description = "Require Cv ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cv deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteCv(@PathVariable long id) {
        try {
            log.info("Request data: Id: "+id);
            cvService.deleteCv(id);
            log.info("CV with id: " + id + " deleted successfully!");
            return ResponseEntity.ok("CV with id: " + id + " deleted successfully!");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Delete list Cv", description = "Require list of Cv ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List CV deleted successfully!"),
            @ApiResponse(responseCode = "400", description = "Invalid body"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @DeleteMapping("")
    private ResponseEntity<?> deleteCvs(@Valid @RequestBody ListCvIdDTO ids) {
        try {
            log.info("Request data: Cv ID list"+ids);
            cvService.deleteCvs(ids);
            return ResponseEntity.ok("List CV deleted successfully!");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/upload")
    private ResponseEntity<?> uploadCv(@RequestParam("file") MultipartFile file,
                                      @RequestHeader("username") String username) throws IllegalAccessException {
        cvService.saveCv(file, username);
        return ResponseEntity.ok().build();
    }
}
