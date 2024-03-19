package com.example.demo.services;

import com.example.demo.dtos.CvDTO;
import com.example.demo.dtos.CvStatusDTO;
import com.example.demo.dtos.ListCvIdDTO;
import com.example.demo.models.Cv;
import com.example.demo.responses.CvResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICvService {
    public Page<CvResponse> getAllCv(int page, int size);
    public List<CvResponse> getAllCv(Long id);
    public Cv getCvById(Long id) throws Exception;
    public Cv creatCv(CvDTO cvDTO) throws Exception;
    public Cv updateCv(Long id, CvDTO cvDTO) throws Exception;
    public Cv updateCvStatus(Long id, String status) throws Exception;
    public void updateListCvStatus(List<CvStatusDTO> list) throws Exception;
    public void deleteCv(Long id) throws Exception;
    public void deleteCvs(ListCvIdDTO id) throws Exception;
    public void saveCv(MultipartFile file) throws IllegalAccessException;


}
