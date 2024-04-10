package com.example.demo.services;

import com.example.demo.dtos.CvDTO;
import com.example.demo.dtos.CvStatusDTO;
import com.example.demo.dtos.ListCvIdDTO;
import com.example.demo.dtos.SearchDTO;
import com.example.demo.models.Cv;
import com.example.demo.responses.CvResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

public interface ICvService {
//    public Page<CvResponse> getAllCv(int page, int size);
//    public Page<CvResponse> getListCv(int page, int size, String username) throws Exception;

//    Page<CvResponse> searchCv(int page, int size, String username, String sortby, String sorttype, String fullname, List<String> skill, List<String> status, LocalDate dateOfBirth, List<String> university, String trainingSystem, String gpa, List<String> applyPosition) throws Exception;

    //    @Override
//    public Page<CvResponse> getListCv(int page, int size, String userName) throws Exception {
//        User existingUser = userRepository.findByUserName(userName);
//        if(existingUser != null){
//            Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
//            Page<Cv> cvPage = cvRepository.searchCv(pageable, existingUser.getUserName());
//            log.info("Lấy thành công danh sách Cv");
//            return cvPage.map(CvResponse::fromCv);
//        }
//        log.error("User "+userName+" not found!!!");
//        return null;
//    }
    Page<CvResponse> searchCv(int page, int size, String username, SearchDTO SeacrhDTO) throws Exception;

    public Cv getCvById(Long id) throws Exception;
    public Cv createCv(String username,CvDTO cvDTO) throws Exception;
    public Cv updateCv(String username,Long id, CvDTO cvDTO) throws Exception;




   public void updateCvStatus(ListCvIdDTO id) throws Exception;

//    public void updateListCvStatus(List<CvStatusDTO> list) throws Exception;
    public void deleteCv(Long id) throws Exception;
    public void deleteCvs(ListCvIdDTO id) throws Exception;
    void saveCv(MultipartFile file, String username) throws IllegalAccessException;


}
