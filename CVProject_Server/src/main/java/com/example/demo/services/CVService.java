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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CVService implements ICvService {
    private final CvRepository cvRepository;
    private final UserRepository userRepository;

    public Page<CvResponse> getAllCv(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        Page<Cv> cvPage = cvRepository.findAll(pageable);
        log.info("Lấy thành công danh sách Cv");
        return cvPage.map(CvResponse::fromCv);

    }

    @Override
    public Page<CvResponse> getListCv(int page, int size, String userName) throws Exception {
        User existingUser = userRepository.findByUserName(userName);
        if(existingUser != null){
            Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
            Page<Cv> cvPage = cvRepository.searchCv(pageable, existingUser.getUserName());
            log.info("Lấy thành công danh sách Cv");
            return cvPage.map(CvResponse::fromCv);
        }
        log.error("User "+userName+" not found!!!");
        return null;
    }

    public Cv getCvById(Long id) throws Exception {
        Cv cv = cvRepository.findById(id).orElseThrow(() -> new Exception("Cannot find CV with id =" + id));
        log.info("Lấy thành công thông tin Cv: "+cv.toString());
        return cv;
    }

    public Cv creatCv(CvDTO cvDTO) throws Exception {
        User user = userRepository.findById(cvDTO.getCreateBy()).orElseThrow(() -> new Exception("User with ID: " + cvDTO.getCreateBy() + " not found!!!"));
        Cv newCv = Cv.builder()
                .fullName(cvDTO.getFullName())
                .dateOfBirth(cvDTO.getDateOfBirth())
                .skill(cvDTO.getSkill())
                .university(cvDTO.getUniversity())
                .applyPosition(cvDTO.getApplyPosition())
                .trainingSystem(cvDTO.getTrainingSystem())
                .createdBy(user)
                .gpa(cvDTO.getGPA())
                .status(CvStatus.INPROGRESS)
                .linkCV(cvDTO.getLinkCV())
                .build();
        cvRepository.save(newCv);
        log.info("Tạo mới thành công Cv: "+newCv.toString());
        return newCv;
    }

    public Cv updateCv(Long id, CvDTO cvDTO) throws Exception {
        Cv existingCv = getCvById(id);
        if (existingCv != null) {
            log.info("Tìm thấy Cv có nội dung: " +existingCv.toString());
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
            Cv newCv = cvRepository.save(existingCv);
            log.info("Cập nhật thành công Cv thành: " +existingCv.toString());
            return newCv;
        }
        log.info("Cập nhật Cv thất bại(không tìm thấy Cv)");
        return null;
    }

    @Override
    public Cv updateCvStatus(Long id, String status) throws Exception {
        Cv existingCv = getCvById(id);
        if (existingCv != null) {
            if (status.equals("pass")) {
                existingCv.setStatus(CvStatus.PASS);
                log.info("Đã cập nhật trạng thái Cv có ID: " + id + " thành PASS");
            } else if (status.equals("not_pass")) {
                existingCv.setStatus(CvStatus.NOTPASS);
                log.info("Đã cập nhật trạng thái Cv có ID: " + id + " thành NOTPASS");
            } else {
                log.info("Đã cập nhật trạng thái Cv có ID: " + id + " không thành công, trạng thái không hợp lệ");
                throw new Exception("Invalid status");
            }
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
                if (newStatus.equals("pass")) {
                    cv.setStatus(CvStatus.PASS);
                    cvRepository.save(cv);
                    log.info("Đã cập nhật trạng thái Cv có ID: " + cvId + " thành PASS");
                } else if (newStatus.equals("not_pass")) {
                    cv.setStatus(CvStatus.NOTPASS);
                    cvRepository.save(cv);
                    log.info("Đã cập nhật trạng thái Cv có ID: " + cvId + " thành NOTPASS");
                } else {
                    System.err.println("Invalid status: " + newStatus + " for CV ID: " + cvId);
                    log.info("Đã cập nhật trạng thái Cv có ID: " + cvId + " không thành công, trạng thái không hợp lệ");
                }
            } else {
                System.err.println("CV not found with ID: " + cvId);
            }
        }
    }

    @Override
    public void deleteCv(Long id) throws Exception {
        Cv cv = getCvById(id);
        if (cv != null) {
            cvRepository.delete(cv);
            log.info("Xoá thành công Cv với ID:" + id);
        } else log.info("Xoá Cv không thành công");

    }

    @Override
    public void deleteCvs(ListCvIdDTO ids) {
        List<Long> idList = ids.ids;
        cvRepository.deleteAllById(idList);
        log.info("Xoá thành công "+idList.size()+" Cv");
    }

    @Override
    public void saveCv(MultipartFile file, String username) throws IllegalAccessException {
        if (ExcelUploadService.isValidExcelFile(file)) {
            List<Cv> cvList = null;
            try {
                cvList = ExcelUploadService.getCvsFromExcel(file.getInputStream());

                // Get the user by username
                User user = userRepository.findByUserName(username);

                if (user == null) {
                    throw new IllegalAccessException("User with username " + username + " not found!");
                }

                long id = user.getId();

                // Set createdBy field for each Cv
                for (Cv cv : cvList) {
                    cv.setCreatedBy(user);
                }

                cvRepository.saveAll(cvList);
                log.info("Import CV successfully!");
            } catch (IOException e) {
                throw new IllegalAccessException("The file is not valid!");
            }

        }
    }

}
