package com.example.demo.repositories;

import com.example.demo.models.Cv;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CvRepository extends JpaRepository<Cv, Long> {
    Page<Cv> findAll(Pageable pageable);

    @Query("SELECT c FROM Cv c WHERE c.createdBy.userName = :username" +
            " AND (:fullname IS NULL OR c.fullName LIKE %:fullname%)" +
            " AND (:skill IS NULL OR c.skill IN :skill)" +
            " AND (:status IS NULL OR c.status IN :status)" +
            " AND (:dateOfBirth IS NULL OR c.dateOfBirth = :dateOfBirth)" +
            " AND (:university IS NULL OR c.university IN :university)" +
            " AND (:trainingSystem IS NULL OR c.trainingSystem = :trainingSystem)" +
            " AND (:gpa IS NULL OR c.gpa = :gpa)" +
            " AND (:applyPosition IS NULL OR c.applyPosition IN :applyPosition)")
    Page<Cv> searchCv(Pageable pageable, @Param("username") String userName, @Param("fullname") String fullName, @Param("skill") List<String> skill, @Param("status") List<String> status, @Param("dateOfBirth") LocalDate dateOfBirth, @Param("university") List<String> university, @Param("trainingSystem") String trainingSystem, @Param("gpa") String gpa, @Param("applyPosition") List<String> applyPosition);
}
