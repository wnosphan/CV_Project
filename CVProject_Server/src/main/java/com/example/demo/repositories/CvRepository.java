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
    Page<Cv> findAllByCreatedById(Pageable pageable ,Long id);
    @Query("SELECT cv FROM Cv cv " +
            "WHERE (cv.fullName LIKE %:searchContent% OR cv.trainingSystem LIKE %:searchContent% OR " +
            "cv.university LIKE %:searchContent% OR cv.gpa LIKE %:searchContent% OR cv.skill LIKE %:searchContent% OR " +
            "cv.applyPosition LIKE %:searchContent%) " +
            "AND cv.createdBy.id = :userId")
    Page<Cv> searchCv(@Param("searchContent") String searchContent, Pageable pageable, @Param("userId") Long userId);
}
