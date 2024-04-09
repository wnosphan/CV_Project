package com.example.demo.repositories;

import com.example.demo.models.Cv;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CvRepository extends JpaRepository<Cv, Long> {
    Page<Cv> findAll(Pageable pageable);
    Integer countByStatusContaining (String status);
    Integer countByStatusContainingAndCreatedByUserName (String status, String username);
 

}
