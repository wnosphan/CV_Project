-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tetsdb
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
-- Table structure for table `apply_position`
--

DROP TABLE IF EXISTS `apply_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_position`
--

LOCK TABLES `apply_position` WRITE;
/*!40000 ALTER TABLE `apply_position` DISABLE KEYS */;
INSERT INTO `apply_position` VALUES (5,'.loc'),(6,'Frontend Developer'),(7,'Tester'),(8,'Backend Developer'),(9,'Project Manager'),(10,'s'),(11,'q'),(12,'aa'),(13,'aaaa'),(14,'aaaaa');
/*!40000 ALTER TABLE `apply_position` ENABLE KEYS */;
UNLOCK TABLES;

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
  `status` varchar(45) DEFAULT 'INPROGRESS',
  PRIMARY KEY (`id`),
  KEY `idUser_idx` (`create_by`),
  CONSTRAINT `createby` FOREIGN KEY (`create_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cv`
--

LOCK TABLES `cv` WRITE;
/*!40000 ALTER TABLE `cv` DISABLE KEYS */;
INSERT INTO `cv` VALUES (2,'Đỗ Quốc Trụ','1993-04-27','reactjs, angular','fpt','college',1,'2.3','Tester ','https://www.google.com','PASS'),(4,'Lý Trung Ðức','1999-07-27','typescript','ĐH Khoa học','univerity',1,'2.5','Frontend Developer ','https://www.youtube.com','PASS'),(5,'Thạch Anh Sơn','1999-09-21','reactjs, angular,typescript','bách khoa HCM','college',1,'2.6','Backend Developer ','https://www.google.com','INPROGRESS'),(6,'Phan Quang Sáng','2001-12-21','typescript, reactjs','bách khoa hà nội','high school',1,'2.7','Project Manager ','….','INPROGRESS'),(7,'Vũ Phi Ðiệp','1993-09-25','reactjs, angular','fpt','univerity',1,'2.8','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(8,'Sái Quốc Vũ','2004-04-03','reactjs','ĐH quy nhơn','college',1,'2.9','Frontend Developer ','https://www.google.com','INPROGRESS'),(9,'Ân Thiện Nhân','2000-06-23','typescript','ĐH Khoa học','high school',1,'2.10','Tester ','….','INPROGRESS'),(10,'Đặng Thảo Ly','2003-01-28','reactjs, angular,typescript','bách khoa HCM','univerity',1,'2.11','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(11,'Trịnh Như Mai','1996-05-16','typescript, reactjs','bách khoa hà nội','college',1,'2.12','Frontend Developer ','https://www.google.com','INPROGRESS'),(12,'Lê Vy Lan','1997-08-19','reactjs, angular','fpt','high school',1,'2.13','Backend Developer ','….','INPROGRESS'),(13,'Hồ Phương Thùy','1997-04-29','reactjs','ĐH quy nhơn','univerity',1,'2.14','Project Manager ','https://www.youtube.com','INPROGRESS'),(14,'Bùi Diệu Loan','1998-02-12','typescript','ĐH Khoa học','college',1,'2.15','Frontend Developer ','https://www.google.com','INPROGRESS'),(15,'Bùi Huệ An','1991-07-01','reactjs, angular,typescript','bách khoa HCM','high school',1,'2.16','Frontend Developer ','….','INPROGRESS'),(16,'Lạc Hải Vân','1994-02-07','typescript, reactjs','bách khoa hà nội','univerity',1,'2.17','Tester ','https://www.youtube.com','INPROGRESS'),(17,'Nguyễn Mỹ Nhi','1993-04-25','reactjs, angular','fpt','college',1,'2.18','Frontend Developer ','https://www.google.com','INPROGRESS'),(18,'Nguyễn Diễm Thư','1993-10-23','reactjs','ĐH quy nhơn','high school',1,'2.19','Frontend Developer ','….','INPROGRESS'),(19,'Nguyễn Hảo Nhi','1990-06-27','typescript','ĐH Khoa học','univerity',1,'2.20','Backend Developer ','https://www.youtube.com','INPROGRESS'),(20,'Chu Trí Thắng','2001-12-22','reactjs, angular,typescript','bách khoa HCM','college',1,'2.21','Project Manager ','https://www.google.com','INPROGRESS'),(21,'Quang Hoàng Lân','2001-04-05','typescript, reactjs','bách khoa hà nội','high school',1,'2.22','Frontend Developer ','….','INPROGRESS'),(22,'Mai Phước Thiện','1990-11-07','reactjs, angular','fpt','univerity',1,'2.23','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(23,'Bạch Vinh Diệu','2004-08-07','reactjs','ĐH quy nhơn','college',1,'2.24','Tester ','https://www.google.com','INPROGRESS'),(24,'Trầm Tài Ðức','2000-02-16','typescript','ĐH Khoa học','high school',1,'2.25','Frontend Developer ','….','INPROGRESS'),(25,'Lục Văn Minh','1990-04-25','reactjs, angular,typescript','bách khoa HCM','univerity',1,'2.26','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(26,'Lê Hồng Quý','1992-05-26','typescript, reactjs','bách khoa hà nội','college',1,'2.27','Backend Developer ','https://www.google.com','INPROGRESS'),(27,'Phạm Gia Hiệp','1991-12-24','reactjs, angular','fpt','high school',1,'2.28','Project Manager ','….','INPROGRESS'),(28,'Vũ Gia Thiện','1994-12-05','reactjs','ĐH quy nhơn','univerity',1,'2.29','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(29,'Tôn Quốc Văn','1994-09-19','typescript','ĐH Khoa học','college',1,'2.30','Frontend Developer ','https://www.google.com','INPROGRESS'),(30,'Lạc Khánh An','1995-08-22','reactjs, angular,typescript','bách khoa HCM','high school',1,'2.31','Tester ','….','INPROGRESS'),(31,'Phó Tấn Khang','1998-06-02','typescript, reactjs','bách khoa hà nội','univerity',1,'2.32','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(32,'Nguyễn Minh Thông','2004-01-03','reactjs, angular','fpt','college',1,'2.33','Frontend Developer ','https://www.google.com','INPROGRESS'),(33,'Nguyễn Nam Dương','1995-10-26','reactjs','ĐH quy nhơn','high school',1,'2.34','Backend Developer ','….','INPROGRESS'),(34,'Nguyễn Tấn Tài','1999-05-13','typescript','ĐH Khoa học','univerity',1,'2.35','Project Manager ','https://www.youtube.com','INPROGRESS'),(35,'Sái Huy Quang','1990-07-29','reactjs, angular,typescript','bách khoa HCM','college',1,'2.36','Frontend Developer ','https://www.google.com','INPROGRESS'),(36,'Nguyễn Nam Hải','1999-09-28','typescript, reactjs','bách khoa hà nội','high school',1,'2.37','Frontend Developer ','….','INPROGRESS'),(37,'Nguyễn Thành Sang','2000-01-16','reactjs, angular','fpt','univerity',1,'2.38','Tester ','https://www.youtube.com','INPROGRESS'),(38,'Mạc Phước Nhân','1991-04-18','reactjs','ĐH quy nhơn','college',1,'2.39','Frontend Developer ','https://www.google.com','INPROGRESS'),(39,'Ngô Tuấn Long','2004-03-14','typescript','ĐH Khoa học','high school',1,'2.40','Frontend Developer ','….','INPROGRESS'),(40,'Phan Diễm Phương','1995-03-11','reactjs, angular,typescript','bách khoa HCM','univerity',1,'2.41','Backend Developer ','https://www.youtube.com','INPROGRESS'),(41,'Văn Tú Trinh','1997-04-03','typescript, reactjs','bách khoa hà nội','college',1,'2.42','Project Manager ','https://www.google.com','INPROGRESS'),(42,'Lương Mộng Tuyền','1994-04-14','reactjs, angular','fpt','high school',1,'2.43','Frontend Developer ','….','INPROGRESS'),(43,'Thân Thúy Anh','2004-04-30','reactjs','ĐH quy nhơn','univerity',1,'2.44','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(44,'Thái Phương Quyên','1990-11-04','typescript','ĐH Khoa học','college',1,'2.45','Tester ','https://www.google.com','INPROGRESS'),(45,'Quang Ngọc Uyên','1996-10-29','reactjs, angular,typescript','bách khoa HCM','high school',1,'2.46','Frontend Developer ','….','INPROGRESS'),(46,'Đặng Bích Huệ','1997-08-13','typescript, reactjs','bách khoa hà nội','univerity',1,'2.47','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(47,'Cao Ánh Trang','1996-10-31','reactjs, angular','fpt','college',1,'2.48','Backend Developer ','https://www.google.com','INPROGRESS'),(48,'Phó Kim Thu','2001-01-07','reactjs','ĐH quy nhơn','high school',1,'2.49','Project Manager ','….','INPROGRESS'),(49,'Bùi Mai Hạ','2003-08-20','typescript','ĐH Khoa học','univerity',1,'2.50','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(50,'Đỗ Minh Hiền','1992-10-31','reactjs, angular,typescript','bách khoa HCM','college',1,'2.51','Frontend Developer ','https://www.google.com','INPROGRESS'),(51,'An An Di','2004-04-15','typescript, reactjs','bách khoa hà nội','high school',1,'2.52','Tester ','….','INPROGRESS'),(52,'Hồ Diễm Khuê','2004-05-30','reactjs, angular','fpt','univerity',1,'2.53','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(53,'Huỳnh Thúy Quỳnh','2002-11-07','reactjs','ĐH quy nhơn','college',1,'2.54','Frontend Developer ','https://www.google.com','INPROGRESS'),(54,'Dương Mỹ Huệ','2003-08-24','typescript','ĐH Khoa học','high school',1,'2.55','Backend Developer ','….','INPROGRESS'),(55,'Đỗ Hải Uyên','1990-04-11','reactjs, angular,typescript','bách khoa HCM','univerity',1,'2.56','Project Manager ','https://www.youtube.com','INPROGRESS'),(56,'Quách Bạch Trà','1999-03-26','typescript, reactjs','bách khoa hà nội','college',1,'2.57','Frontend Developer ','https://www.google.com','INPROGRESS'),(57,'Tô Gia Quỳnh','2003-07-06','reactjs, angular','fpt','high school',1,'2.58','Frontend Developer ','….','INPROGRESS'),(58,'Vũ Thanh Huyền','2003-04-05','reactjs','ĐH quy nhơn','univerity',1,'2.59','Tester ','https://www.youtube.com','INPROGRESS'),(59,'Hồ Mỹ Vân','1990-03-15','typescript','ĐH Khoa học','college',1,'2.60','Frontend Developer ','https://www.google.com','INPROGRESS'),(60,'Dương Bá Cường','1996-10-17','reactjs, angular,typescript','bách khoa HCM','high school',1,'2.61','Frontend Developer ','….','INPROGRESS'),(61,'Nguyễn Xuân Thuyết','1994-06-11','typescript, reactjs','bách khoa hà nội','univerity',1,'2.62','Backend Developer ','https://www.youtube.com','INPROGRESS'),(62,'Uất Vĩnh Ân','1994-11-14','reactjs, angular','fpt','college',1,'2.63','Project Manager ','https://www.google.com','INPROGRESS'),(63,'Vũ Thế Dân','1990-08-01','reactjs','ĐH quy nhơn','high school',1,'2.64','Frontend Developer ','….','INPROGRESS'),(64,'Nguyễn Ðức Quyền','1991-08-31','typescript','ĐH Khoa học','univerity',1,'2.65','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(65,'Mã Trường Chinh','1992-05-31','reactjs, angular,typescript','bách khoa HCM','college',1,'2.66','Tester ','https://www.google.com','INPROGRESS'),(66,'Lâm Ðức Mạnh','1995-12-05','typescript, reactjs','bách khoa hà nội','high school',1,'2.67','Frontend Developer ','….','INPROGRESS'),(67,'Quách Long Vịnh','2002-06-21','reactjs, angular','fpt','univerity',1,'2.68','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(68,'Diệp Chí Bảo','1993-09-05','reactjs','ĐH quy nhơn','college',1,'2.69','Backend Developer ','https://www.google.com','INPROGRESS'),(69,'Nguyễn Phú Bình','1992-05-09','typescript','ĐH Khoa học','high school',1,'2.70','Project Manager ','….','INPROGRESS'),(70,'Võ Ðông Phương','1997-03-06','reactjs, angular,typescript','bách khoa HCM','univerity',1,'2.71','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(71,'Đinh Thiện Phước','2000-07-20','typescript, reactjs','bách khoa hà nội','college',1,'2.72','Frontend Developer ','https://www.google.com','INPROGRESS'),(72,'Trầm Ðại Thống','2002-05-05','reactjs, angular','fpt','high school',1,'2.73','Tester ','….','INPROGRESS'),(73,'Nguyễn Thiện Minh','2002-01-31','reactjs','ĐH quy nhơn','univerity',1,'2.74','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(74,'Hoàng Đăng Quang','1994-08-05','typescript','ĐH Khoa học','college',1,'2.75','Frontend Developer ','https://www.google.com','INPROGRESS'),(75,'Bành Minh Triết','2000-07-03','reactjs, angular,typescript','bách khoa HCM','high school',1,'2.76','Backend Developer ','….','INPROGRESS'),(76,'Đào Minh Lý','1993-01-12','typescript, reactjs','bách khoa hà nội','univerity',1,'2.77','Project Manager ','https://www.youtube.com','INPROGRESS'),(77,'Lý An Nguyên','2003-02-19','reactjs, angular','fpt','college',1,'2.78','Frontend Developer ','https://www.google.com','INPROGRESS'),(78,'Hồ Ðình Luận','1993-06-05','reactjs','ĐH quy nhơn','high school',1,'2.79','Frontend Developer ','….','INPROGRESS'),(79,'Lê Minh Kỳ','2004-01-18','typescript','ĐH Khoa học','univerity',1,'2.80','Tester ','https://www.youtube.com','INPROGRESS'),(80,'Tống Xuân Nghi','2001-09-30','reactjs, angular,typescript','bách khoa HCM','college',1,'2.81','Frontend Developer ','https://www.google.com','INPROGRESS'),(81,'Thủy Thu Nguyệt','1994-10-10','typescript, reactjs','bách khoa hà nội','high school',1,'2.82','Frontend Developer ','….','INPROGRESS'),(82,'Văn Hồng Quế','2003-06-27','reactjs, angular','fpt','univerity',1,'2.83','Backend Developer ','https://www.youtube.com','INPROGRESS'),(83,'Huỳnh Yến Trinh','1990-05-29','reactjs','ĐH quy nhơn','college',1,'2.84','Project Manager ','https://www.google.com','INPROGRESS'),(84,'Vũ An Nhàn','1997-08-15','typescript','ĐH Khoa học','high school',1,'2.85','Frontend Developer ','….','INPROGRESS'),(85,'Lê Khuê Trúc','2000-10-18','reactjs, angular,typescript','bách khoa HCM','univerity',1,'2.86','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(86,'Giang Quỳnh Liên','1990-02-12','typescript, reactjs','bách khoa hà nội','college',1,'2.87','Tester ','https://www.google.com','INPROGRESS'),(87,'Nguyễn Thụy Vân','1994-01-13','reactjs, angular','fpt','high school',1,'2.88','Frontend Developer ','….','INPROGRESS'),(88,'Đặng Xuân Thảo','1990-03-22','reactjs','ĐH quy nhơn','univerity',1,'2.89','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(89,'Nguyễn Nguyệt Hà','1999-02-12','typescript','ĐH Khoa học','college',1,'2.90','Backend Developer ','https://www.google.com','INPROGRESS'),(90,'Bạch Gia Ân','1991-05-17','reactjs, angular,typescript','bách khoa HCM','high school',1,'2.91','Project Manager ','….','INPROGRESS'),(91,'Thạch Tiểu Bảo','2000-06-29','typescript, reactjs','bách khoa hà nội','univerity',1,'2.92','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(92,'Lục Chính Thuận','1994-01-01','reactjs, angular','fpt','college',1,'2.93','Frontend Developer ','https://www.google.com','INPROGRESS'),(93,'Nguyễn Duy Khiêm','2003-01-11','reactjs','ĐH quy nhơn','high school',1,'2.94','Tester ','….','INPROGRESS'),(94,'Dương Thế Minh','1997-12-15','typescript','ĐH Khoa học','univerity',1,'2.95','Frontend Developer ','https://www.youtube.com','INPROGRESS'),(95,'Chung Bình Nguyên','1992-10-09','reactjs, angular,typescript','bách khoa HCM','college',1,'2.96','Frontend Developer ','https://www.google.com','INPROGRESS'),(96,'Chung Quang Trung','1993-07-04','typescript, reactjs','bách khoa hà nội','high school',1,'2.97','Backend Developer ','….','INPROGRESS'),(97,'Lê Quốc Tuấn','2003-01-16','reactjs, angular','fpt','univerity',1,'2.98','Project Manager ','https://www.youtube.com','INPROGRESS'),(98,'Huỳnh Ngọc Trụ','1990-05-07','reactjs','ĐH quy nhơn','college',1,'2.99','Frontend Developer ','https://www.google.com','INPROGRESS'),(99,'Đỗ Thế Duyệt','1998-04-20','typescript','ĐH Khoa học','high school',1,'2.100','Frontend Developer ','….','INPROGRESS'),(100,'aa11','2024-04-03','a','a','1',1,'1.2','aa','1111','INPROGRESS'),(101,'aaaa','2024-04-02','aaaaa','aaaa','qqq',1,'1.4','aaaa','111','INPROGRESS'),(102,'son phan','2024-04-04','aaaa','ssss','ffff',1,'1.5','aaaaa','......','INPROGRESS'),(103,'phan son','2024-04-01','aaaaaa','aaaaaa','aaaaa',1,'2.5','aaaaa','..........','INPROGRESS');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `after_insert_skill` AFTER INSERT ON `cv` FOR EACH ROW BEGIN
  -- Biến để lưu từng skill sau khi cắt chuỗi
  DECLARE skill_name VARCHAR(255);
  -- Biến để lưu vị trí của dấu phẩy
  DECLARE comma_index INT;
  -- Biến để lưu chuỗi skill chưa được xử lý
  DECLARE remaining_string VARCHAR(255) DEFAULT NEW.skill;
 -- Lưu tên của trường đại học từ cột university của bảng cv
  DECLARE uni_name VARCHAR(255);
  -- Biến để kiểm tra xem tên trường đã tồn tại trong bảng university chưa
  DECLARE uni_exists INT;
   -- Biến để lưu tên vị trí ứng tuyển từ cột position của bảng cv
  DECLARE position_name VARCHAR(255);
  -- Biến để kiểm tra xem tên vị trí ứng tuyển đã tồn tại trong bảng apply_position chưa
  DECLARE position_exists INT;
  -- Vòng lặp để xử lý chuỗi skill
  WHILE LOCATE(',', remaining_string) > 0 DO
    -- Tìm vị trí của dấu phẩy đầu tiên
    SET comma_index = LOCATE(',', remaining_string);
    -- Cắt lấy skill từ đầu chuỗi đến dấu phẩy
    SET skill_name = TRIM(SUBSTRING(remaining_string, 1, comma_index - 1));
    -- Cập nhật lại chuỗi còn lại sau khi cắt
    SET remaining_string = SUBSTRING(remaining_string, comma_index + 1);
    
    -- Kiểm tra skill có tồn tại trong bảng skill hay không
    IF NOT EXISTS (SELECT * FROM skill WHERE skill_item = skill_name) THEN
      -- Nếu không tồn tại, thêm skill mới vào bảng
      INSERT INTO skill (skill_item) VALUES (skill_name);
    END IF;
  END WHILE;
  
  -- Xử lý cho skill cuối cùng (không có dấu phẩy)
  IF TRIM(remaining_string) != '' THEN
    SET skill_name = TRIM(remaining_string);
    IF NOT EXISTS (SELECT * FROM skill WHERE skill_item = skill_name) THEN
      INSERT INTO skill (skill_item) VALUES (skill_name);
    END IF;
  END IF;
  -- uni
 
  
  -- Lấy tên trường từ cột university của bảng cv
  SET uni_name = TRIM(NEW.university);
  
  -- Kiểm tra xem tên trường đã tồn tại trong bảng university hay chưa
  SELECT COUNT(*) INTO uni_exists FROM university WHERE name = uni_name;
  
  -- Nếu tên trường chưa tồn tại, thêm nó vào bảng university
  IF uni_exists = 0 THEN
    INSERT INTO university (name) VALUES (uni_name);
  END IF;
  -- Lấy tên vị trí ứng tuyển từ cột position của bảng cv
  SET position_name = TRIM(NEW.apply_position);
  
  -- Kiểm tra xem tên vị trí ứng tuyển đã tồn tại trong bảng apply_position hay chưa
  SELECT COUNT(*) INTO position_exists FROM apply_position WHERE name = position_name;
  
  -- Nếu tên vị trí ứng tuyển chưa tồn tại, thêm nó vào bảng apply_position
  IF position_exists = 0 THEN
    INSERT INTO apply_position (name) VALUES (position_name);
  END IF;
  
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `cv_AFTER_UPDATE` AFTER UPDATE ON `cv` FOR EACH ROW BEGIN
-- Biến để lưu từng skill sau khi cắt chuỗi
  DECLARE skill_name VARCHAR(255);
  -- Biến để lưu vị trí của dấu phẩy
  DECLARE comma_index INT;
  -- Biến để lưu chuỗi skill chưa được xử lý
  DECLARE remaining_string VARCHAR(255) DEFAULT NEW.skill;
 -- Lưu tên của trường đại học từ cột university của bảng cv
  DECLARE uni_name VARCHAR(255);
  -- Biến để kiểm tra xem tên trường đã tồn tại trong bảng university chưa
  DECLARE uni_exists INT;
   -- Biến để lưu tên vị trí ứng tuyển từ cột position của bảng cv
  DECLARE position_name VARCHAR(255);
  -- Biến để kiểm tra xem tên vị trí ứng tuyển đã tồn tại trong bảng apply_position chưa
  DECLARE position_exists INT;
  -- Vòng lặp để xử lý chuỗi skill
  WHILE LOCATE(',', remaining_string) > 0 DO
    -- Tìm vị trí của dấu phẩy đầu tiên
    SET comma_index = LOCATE(',', remaining_string);
    -- Cắt lấy skill từ đầu chuỗi đến dấu phẩy
    SET skill_name = TRIM(SUBSTRING(remaining_string, 1, comma_index - 1));
    -- Cập nhật lại chuỗi còn lại sau khi cắt
    SET remaining_string = SUBSTRING(remaining_string, comma_index + 1);
    
    -- Kiểm tra skill có tồn tại trong bảng skill hay không
    IF NOT EXISTS (SELECT * FROM skill WHERE skill_item = skill_name) THEN
      -- Nếu không tồn tại, thêm skill mới vào bảng
      INSERT INTO skill (skill_item) VALUES (skill_name);
    END IF;
  END WHILE;
  
  -- Xử lý cho skill cuối cùng (không có dấu phẩy)
  IF TRIM(remaining_string) != '' THEN
    SET skill_name = TRIM(remaining_string);
    IF NOT EXISTS (SELECT * FROM skill WHERE skill_item = skill_name) THEN
      INSERT INTO skill (skill_item) VALUES (skill_name);
    END IF;
  END IF;
  -- uni
 
  
  -- Lấy tên trường từ cột university của bảng cv
  SET uni_name = TRIM(NEW.university);
  
  -- Kiểm tra xem tên trường đã tồn tại trong bảng university hay chưa
  SELECT COUNT(*) INTO uni_exists FROM university WHERE name = uni_name;
  
  -- Nếu tên trường chưa tồn tại, thêm nó vào bảng university
  IF uni_exists = 0 THEN
    INSERT INTO university (name) VALUES (uni_name);
  END IF;
  -- Lấy tên vị trí ứng tuyển từ cột position của bảng cv
  SET position_name = TRIM(NEW.apply_position);
  
  -- Kiểm tra xem tên vị trí ứng tuyển đã tồn tại trong bảng apply_position hay chưa
  SELECT COUNT(*) INTO position_exists FROM apply_position WHERE name = position_name;
  
  -- Nếu tên vị trí ứng tuyển chưa tồn tại, thêm nó vào bảng apply_position
  IF position_exists = 0 THEN
    INSERT INTO apply_position (name) VALUES (position_name);
  END IF;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `skill_item` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=381 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (371,'loc'),(372,'typescript'),(373,'reactjs'),(374,'angular'),(375,'s'),(376,'q'),(377,'a'),(378,'aaaaa'),(379,'aaaa'),(380,'aaaaaa');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (11,'loc'),(12,'bách khoa hà nội'),(13,'fpt'),(14,'ĐH quy nhơn'),(15,'ĐH Khoa học'),(16,'bách khoa HCM'),(17,'s'),(18,'q'),(19,'a'),(20,'aaaa'),(21,'ssss'),(22,'aaaaaa');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sson09090909@gmail.com','son'),(13,'sonpmqe170092@fpt.edu.vn','son1'),(14,'aaaa','sss'),(15,NULL,NULL);
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

-- Dump completed on 2024-04-09 20:26:55
