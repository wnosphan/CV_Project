package com.example.demo.services;

import com.example.demo.dtos.CvDTO;
import com.example.demo.models.Cv;
import com.example.demo.models.CvStatus;
import com.example.demo.models.User;
import com.example.demo.repositories.CvRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CVService {
    private final CvRepository cvRepository;
    private final UserRepository userRepository;
    public List<Cv> getAllProducts(){
        List<Cv> cvPage = cvRepository.findAll();
        return cvPage;
    }

    public Cv creatCv(CvDTO cvDTO){
        User user = userRepository.getById(cvDTO.getCreateBy());
        Cv newCv =Cv.builder()
                .fullName(cvDTO.getFullName())
                .dateOfBirth(cvDTO.getDateOfBirth())
                .skill(cvDTO.getSkill())
                .university(cvDTO.getUniversity())
                .applyPosition(cvDTO.getApplyPosition())
                .createBy(user)
                .status(CvStatus.INPROGRESS)
                .linkCV(cvDTO.getLinkCV())
                .build();
        return cvRepository.save(newCv);
    }

}
