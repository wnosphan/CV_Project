package com.example.demo.services;

import com.example.demo.repositories.ApplyPositionRepository;
import com.example.demo.repositories.SkillRepository;
import com.example.demo.repositories.UniversityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GetListService {
    private final ApplyPositionRepository applyPositionRepository;
    private final SkillRepository skillRepository;
    private final UniversityRepository universityRepository;
    public List<String> getListApplyPosition(){
        return applyPositionRepository.findAll().stream().map(applyPosition -> applyPosition.getName()).toList();
    }
    public List<String> getListSkill(){
        return skillRepository.findAll().stream().map(skill -> skill.getSkill()).toList();
    }
    public List<String> getListUniversity(){
        return universityRepository.findAll().stream().map(university -> university.getName()).toList();
    }
}
