package com.example.demo.repositories;

import com.example.demo.models.Cv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CvRepository extends JpaRepository<Cv, Long> {
    Page<Cv> findAll(Pageable pageable);

    @Query("SELECT c FROM Cv c WHERE c.createdBy.userName = :userName")
    Page<Cv> searchCv(Pageable pageable, @Param("userName") String userName);
}
