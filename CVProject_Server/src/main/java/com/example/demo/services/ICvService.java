package com.example.demo.services;

import com.example.demo.dtos.CvDTO;
import com.example.demo.models.Cv;
import com.example.demo.responses.CvResponse;
import org.springframework.data.domain.Page;

public interface ICvService {
    public Page<CvResponse> getAllCv(int page, int size);
    public Cv getCvById(Long id) throws Exception;
    public Cv creatCv(CvDTO cvDTO) throws Exception;
    public Cv updateCv(Long id, CvDTO cvDTO) throws Exception;
}
