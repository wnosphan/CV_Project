package com.example.demo.controllers;

import com.example.demo.dtos.CvDTO;
import com.example.demo.dtos.CvStatusDTO;
import com.example.demo.dtos.ListCvIdDTO;
import com.example.demo.models.Cv;
import com.example.demo.responses.CvListResponse;
import com.example.demo.responses.CvResponse;
import com.example.demo.services.GetListService;
import com.example.demo.services.ICvService;
import com.fasterxml.jackson.annotation.JsonProperty;
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


import java.time.LocalDate;
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
    private final GetListService getListService;
    @Operation(summary = "Create new CV", description = "Require cvDTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Create new Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PostMapping("")
    private ResponseEntity<?> postCV(@PathVariable("username") String username,@Valid @RequestBody CvDTO cvDTO, BindingResult result) {
        try {
//            log.info("Request data: " + cvDTO);
            log.info("POST method data: {}", cvDTO);
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors().stream().map(FieldError::getDefaultMessage).toList();
                log.error(errorMessages.toString());
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Cv cv = cvService.createCv(username,cvDTO);
            log.info("Response data: {}", cv);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            log.error("Processing: "+e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



//    private ResponseEntity<?> getAll(
//            @PathVariable("user_name") String createdBy,
//            @RequestParam(name = "page", defaultValue = "0") int page,
//            @RequestParam(name = "limit", defaultValue = "5") int limit
//    ) {
//        try {
//            log.info("Request data: createdBy: " + createdBy + "; Page: " + page + "; Limit: " + limit);
//            Page<CvResponse> cv = cvService.getListCv(page, limit, createdBy);
//            int totalPage = cv.getTotalPages();
//            List<CvResponse> cvs = cv.getContent();
//            log.info("Response data: " + cv);
//            return ResponseEntity.ok(CvListResponse.builder()
//                    .cvResponses(cvs)
//                    .totalPages(totalPage)
//                    .build());
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
    @Operation(summary = "Get all Cv by User", description = "Require userName, page, limit")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Get all Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @GetMapping("user/{username}")
    private ResponseEntity<?> getAll(@PathVariable(name = "username") String username,
                                     @RequestParam(name = "page", defaultValue = "0") int page,
                                     @RequestParam(name = "limit", defaultValue = "5") int limit,
                                     @RequestParam(name = "sortby", defaultValue = "id") String sortby,
                                     @RequestParam(name = "sorttype", defaultValue = "ASC") String sorttype,
                                     @RequestParam(name = "full_name", required = false) String fullname,
                                     @RequestParam(name = "skill", required = false) List<String> skill,
                                     @RequestParam(name = "status", required = false) List<String> status,
                                     @RequestParam(name = "dateOfBirth", required = false) LocalDate dateOfBirth,
                                     @RequestParam(name = "university", required = false) List<String> university,
                                     @RequestParam(name = "training_system", required = false) String trainingSystem,
                                     @RequestParam(name = "gpa", required = false) String gpa,
                                     @RequestParam(name = "apply_position", required = false) List<String> applyPosition) {
        try {
            log.info("GET method data: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}", username, page, limit, sortby, sorttype, fullname, skill, status, dateOfBirth, university, trainingSystem, gpa, applyPosition);
            Page<CvResponse> cvList = cvService.searchCv(page, limit, username, sortby, sorttype, fullname, skill, status, dateOfBirth, university, trainingSystem, gpa, applyPosition);
            int totalPage = cvList.getTotalPages();
            List<CvResponse> cvs = cvList.getContent();
            log.info("Response data: {} CVs", cvs.size());
            return ResponseEntity.ok(CvListResponse.builder().cvResponses(cvs).totalPages(totalPage).build());
        } catch (Exception e) {
            log.error("Processing: "+e.getMessage());
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
            log.info("GET method data: {}", id);
            Cv cv = cvService.getCvById(id);
            log.info("Response data: {}", cv);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            log.error("Processing: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update CV", description = "Require Cv ID, cvDTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update Cv successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PutMapping("{username}/{id}")
    private ResponseEntity<?> updateCv(@PathVariable("username") String username,@PathVariable("id") long id, @Valid @RequestBody CvDTO cvDTO) {
        try {
            log.info("PUT method data: ID: {}, {}", id, cvDTO);
            Cv updateCv = cvService.updateCv(username,id, cvDTO);
            log.info("Response data: {}", updateCv);
            return ResponseEntity.ok(updateCv);
        } catch (Exception e) {
            log.info("Processing: "+e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Update CV status", description = "Require Cv ID, status")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Update status successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @PatchMapping("/status")
    private ResponseEntity<?> updateCvStatus(@RequestBody ListCvIdDTO ids) {
        try {
            log.info("Request data: {}", ids);
            cvService.updateCvStatus(ids);
            return ResponseEntity.ok("CV status has been updated successfully");
        } catch (Exception e) {
            log.error("Processing: "+e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
//
//    @Operation(summary = "Update list CV status", description = "Require list of Cv ID - status")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Update status successfully"),
//            @ApiResponse(responseCode = "400", description = "Invalid request"),
//            @ApiResponse(responseCode = "401", description = "User not found")
//    })
//    @PatchMapping("")
//    private ResponseEntity<?> updateListCvStatus(@Valid @RequestBody List<CvStatusDTO> ids) {
//        try {
//            log.info("Request data: ");
//            cvService.updateListCvStatus(ids);
//            return ResponseEntity.ok("CV status list has been updated successfully");
//        } catch (Exception e) {
//            log.error(e.getMessage());
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @Operation(summary = "Delete Cv", description = "Require Cv ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cv deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "User not found")
    })
    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteCv(@PathVariable long id) {
        try {
            log.info("Request data: Id: {}", id);
            cvService.deleteCv(id);
            log.info("CV with id: {} deleted successfully!", id);
            return ResponseEntity.ok("CV with id: " + id + " deleted successfully!");
        } catch (Exception e) {
            log.error("Processing: "+e.getMessage());
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
            log.info("Request data: {}", ids);
            cvService.deleteCvs(ids);
            log.info("List CV deleted successfully! {}", ids);
            return ResponseEntity.ok("List CV deleted successfully!");
        } catch (Exception e) {
            log.error("Processing: "+e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/upload")
    private ResponseEntity<?> uploadCv(@RequestParam("file") MultipartFile file,
                                       @RequestHeader("username") String username) throws IllegalAccessException {
        try {
            log.info("Request data: {}, {}", file, username);
            cvService.saveCv(file, username);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            log.error("Processing");
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/list/skill")
    public ResponseEntity<?> getListSkill(){
        return ResponseEntity.ok(getListService.getListSkill());
    }
    @GetMapping("/list/apply-position")
    public ResponseEntity<?> getListApplyPosition(){
        return ResponseEntity.ok(getListService.getListApplyPosition());
    }
    @GetMapping("/list/university")
    public ResponseEntity<?> getListUniversity(){
        return ResponseEntity.ok(getListService.getListUniversity());
    }
}
