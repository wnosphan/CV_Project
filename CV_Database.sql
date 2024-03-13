-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: tetsdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cv`
--

DROP TABLE IF EXISTS `cv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cv` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `skill` varchar(45) DEFAULT NULL,
  `university` varchar(45) DEFAULT NULL,
  `training_system` varchar(45) DEFAULT NULL,
  `create_by` int DEFAULT NULL,
  `gpa` varchar(45) DEFAULT NULL,
  `apply_position` varchar(45) DEFAULT NULL,
  `link_cv` varchar(45) DEFAULT NULL,
  `status` enum('INPROGRESS','PASS','NOTPASS') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser_idx` (`create_by`),
  CONSTRAINT `createby` FOREIGN KEY (`create_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv`
--

LOCK TABLES `cv` WRITE;
/*!40000 ALTER TABLE `cv` DISABLE KEYS */;
INSERT INTO `cv` VALUES (1,'Phan Mai Son','2003-01-15','Java, C#','FPT','Uni',1,'3.0','Intern Java','......','PASS'),(2,'Vo Cong Huy','2003-02-02','Java, Js','FPT','Uni',1,'3.1','Intern Reactjs','.....','PASS'),(3,'Ho Thanh Kien','2003-01-01','Java, Python','FPT','Uni',1,'3.4','Fresher Java','.....','PASS'),(4,'Nguyễn Tấn Lộc','2003-03-04','Java, Js','FPT','Uni',1,'3.2','Intern Java','...','PASS'),(11,'Hồ Thanh Kua','2003-12-05','Software, Development','Đại học FPT','Regular',1,'3.5','Software Engineer','https://example.com/cv/nguyen-van-a','PASS'),(12,'Nguyễn Văn A','1990-05-20','Software Development','Đại học ABC','Regular',1,NULL,'Software Engineer','https://example.com/cv/nguyen-van-a','PASS'),(13,'Nguyễn Văn A','1990-05-20','Software Development','Đại học ABC','Regular',1,NULL,'Software Engineer','https://example.com/cv/nguyen-van-a','PASS'),(14,'Nguyễn Văn A','1990-05-20','Software, Development','Đại học ABC','Regular',1,NULL,'Software Engineer','https://example.com/cv/nguyen-van-a','PASS'),(15,'Nguyễn Văn A','1990-05-20','Software, Development','Đại học ABC','Regular',1,NULL,'Software Engineer','https://example.com/cv/nguyen-van-a','PASS'),(16,'Nguyễn Văn A','1990-05-20','Software, Development','Đại học ABC','Regular',1,'3.5','Software Engineer','https://example.com/cv/nguyen-van-a','PASS');
/*!40000 ALTER TABLE `cv` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `insert_cv_trigger` AFTER INSERT ON `cv` FOR EACH ROW BEGIN
    DECLARE skill_item VARCHAR(255);
    DECLARE comma_position INT;
    DECLARE start_position INT DEFAULT 1;
    DECLARE end_position INT;


    -- Lặp qua các kỹ năng trong chuỗi và thêm vào bảng Skill với idCV tương ứng
    WHILE start_position <= LENGTH(NEW.`skill`) DO
        SET comma_position = LOCATE(',', NEW.`skill`, start_position);
        IF comma_position = 0 THEN
            SET end_position = LENGTH(NEW.`skill`) + 1;
        ELSE
            SET end_position = comma_position;
        END IF;

        SET skill_item = SUBSTRING(NEW.`skill`, start_position, end_position - start_position);

        -- Sao chép kỹ năng từ bảng CV vào bảng Skill
        INSERT INTO `skill` (`id`, `skill`)
        VALUES (NEW.`id`, skill_item);

        SET start_position = end_position + 1;
    END WHILE;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int DEFAULT NULL,
  `skill` varchar(45) DEFAULT NULL,
  KEY `idCV_idx` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `cv` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (1,'Java'),(1,' C#'),(2,'Java'),(2,' Js'),(3,'Java'),(3,' Python'),(4,'Java'),(4,' Js'),(11,'Java'),(11,' Spring'),(11,' Hibernate'),(12,'Software Development'),(13,'Software Development'),(14,'Software'),(14,' Development'),(15,'Software'),(15,' Development'),(16,'Software'),(16,' Development');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'son@gmail.com','ssss');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tetsdb'
--

--
-- Dumping routines for database 'tetsdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-13 16:50:34