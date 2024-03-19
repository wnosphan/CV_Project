package com.example.demo.services;

import com.example.demo.dtos.CvDTO;
import com.example.demo.dtos.CvStatusDTO;
import com.example.demo.dtos.ListCvIdDTO;
import com.example.demo.models.Cv;
import com.example.demo.models.CvStatus;
import com.example.demo.models.User;
import com.example.demo.repositories.CvRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.responses.CvResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CVService implements ICvService {
    private final CvRepository cvRepository;
    private final UserRepository userRepository;

    public Page<CvResponse> getAllCv(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<Cv> cvPage = cvRepository.findAll(pageable);
        return cvPage.map(CvResponse::fromCv);
    }

    @Override
    public List<CvResponse> getAllCv(Long id) {
        if (userRepository.findById(id).isPresent()) {
            List<Cv> cvs = cvRepository.findAllByCreatedById(id);
            return cvs.stream()
                    .map(CvResponse::fromCv)
                    .collect(Collectors.toList());
        }

        return null;
    }

    public Cv getCvById(Long id) throws Exception {
        Cv cv = cvRepository.findById(id).orElseThrow(() -> new Exception("Cannot find CV with id =" + id));
        return cv;
    }

    public Cv creatCv(CvDTO cvDTO) throws Exception {
        User user = userRepository.findById(cvDTO.getCreateBy()).orElseThrow(() -> new Exception("User not found"));
        Cv newCv = Cv.builder()
                .fullName(cvDTO.getFullName())
                .dateOfBirth(cvDTO.getDateOfBirth())
                .skill(cvDTO.getSkill())
                .university(cvDTO.getUniversity())
                .applyPosition(cvDTO.getApplyPosition())
                .trainingSystem(cvDTO.getTrainingSystem())
                .createdBy(user)
                .gpa(cvDTO.getGPA())
                .status(CvStatus.NOTPASS)
                .linkCV(cvDTO.getLinkCV())
                .build();
        return cvRepository.save(newCv);
    }

    public Cv updateCv(Long id, CvDTO cvDTO) throws Exception {
        Cv existingCv = getCvById(id);
        if (existingCv != null) {
            User user = userRepository.findById(cvDTO.getCreateBy()).orElseThrow(() -> new Exception("User not found"));
            existingCv.setFullName(cvDTO.getFullName());
            existingCv.setDateOfBirth(cvDTO.getDateOfBirth());
            existingCv.setSkill(cvDTO.getSkill());
            existingCv.setUniversity(cvDTO.getUniversity());
            existingCv.setTrainingSystem(cvDTO.getTrainingSystem());
            existingCv.setCreatedBy(user);
            existingCv.setGpa(cvDTO.getGPA());
            existingCv.setApplyPosition(cvDTO.getApplyPosition());
            existingCv.setLinkCV(cvDTO.getLinkCV());
            return cvRepository.save(existingCv);
        }
        return null;
    }

    @Override
    public Cv updateCvStatus(Long id, String status) throws Exception {
        Cv existingCv = getCvById(id);
        if (existingCv != null) {
            if (status.equals("pass")) {
                existingCv.setStatus(CvStatus.PASS);
            } else if (status.equals("not_pass")) {
                existingCv.setStatus(CvStatus.NOTPASS);
            } else
                throw new Exception("Status not found");
            return cvRepository.save(existingCv);
        }
        return null;
    }

    @Override
    public void updateListCvStatus(List<CvStatusDTO> list) throws Exception {
        for (CvStatusDTO cvStatusDTO : list) {
            Long cvId = cvStatusDTO.getId();
            String newStatus = cvStatusDTO.getStatus();

            Optional<Cv> cvOptional = cvRepository.findById(cvId);
            if (cvOptional.isPresent()) {
                Cv cv = cvOptional.get();
                if (newStatus.equals("pass") ){
                    cv.setStatus(CvStatus.PASS);
                    cvRepository.save(cv);
                } else if (newStatus.equals("not_pass") ){
                    cv.setStatus(CvStatus.NOTPASS);
                    cvRepository.save(cv);
                } else {
                    System.err.println("Invalid status: " + newStatus + " for CV ID: " + cvId);
                }
            } else {
                System.err.println("CV not found with ID: " + cvId);
            }
        }
    }

    @Override
    public void deleteCv(Long id) throws Exception {
        Cv cv = getCvById(id);
        if (cv != null)
            cvRepository.delete(cv);
    }

    @Override
    public void deleteCvs(ListCvIdDTO ids) {
        List<Long> idList = ids.ids;
        cvRepository.deleteAllById(idList);
    }

    @Override
    public void saveCv(MultipartFile file) throws IllegalAccessException {
        if (ExcelUploadService.isValidExcelFile(file)) {
            List<Cv> cvList = null;
            try {
                cvList = ExcelUploadService.getCvsFromExcel(file.getInputStream());
                cvRepository.saveAll(cvList);
            } catch (IOException e) {
                throw new IllegalAccessException("The file is not valid!");
            }

        }
    }
}
