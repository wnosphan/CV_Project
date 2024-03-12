package com.example.demo.services;

import com.example.demo.dtos.CvDTO;
import com.example.demo.models.Cv;
import com.example.demo.models.CvStatus;
import com.example.demo.models.User;
import com.example.demo.repositories.CvRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CVService {
    private final CvRepository cvRepository;
    private final UserRepository userRepository;
    public Page<Cv> getAllCv(){
        Page<Cv> cvPage = (Page<Cv>) cvRepository.findAll();
        return cvPage;
    }

    public Page<Cv> getAllCv(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return cvRepository.findAll(pageable);
    }

    public Cv creatCv(CvDTO cvDTO) throws Exception {
        User user = userRepository.findById(cvDTO.getCreateBy()).orElseThrow(()-> new Exception("User not found"));
        Cv newCv =Cv.builder()
                .fullName(cvDTO.getFullName())
                .dateOfBirth(cvDTO.getDateOfBirth())
                .skill(cvDTO.getSkill())
                .university(cvDTO.getUniversity())
                .applyPosition(cvDTO.getApplyPosition())
                .createBy(user)
                .status("INPROGRESS")
                .linkCV(cvDTO.getLinkCV())
                .build();
        return cvRepository.save(newCv);
    }

}
