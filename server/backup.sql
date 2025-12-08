-- MySQL dump 10.13  Distrib 9.5.0, for macos26.1 (arm64)
--
-- Host: localhost    Database: flashlearn
-- ------------------------------------------------------
-- Server version	9.3.0-commercial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('3a6695bd-db98-4189-bcc4-c5f353747012','a7ff869c07662993bfe8c23663652a1ad200e5a85b4ccae863532f868c8f9ec8','2025-12-08 16:22:58.585','20251208162219_add_username_avatar',NULL,NULL,'2025-12-08 16:22:58.578',1),('85fd0eb6-ecf4-4b91-ab21-b3f69f05d88c','02400619359caa2c7d426a17fdb67b5e098182ae1add6406e6c1c9f60a39e217','2025-12-08 14:51:29.462','20251208145129_init',NULL,NULL,'2025-12-08 14:51:29.435',1),('fc92d0c8-7d96-4c40-ac78-3e946d5664eb','2fd83868ae8d49a5471065646ba795f8b6f305c44489f075926a8c3d9ec75a28','2025-12-08 16:23:19.793','20251208162319_',NULL,NULL,'2025-12-08 16:23:19.788',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flashcard`
--

DROP TABLE IF EXISTS `Flashcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flashcard` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `box` int NOT NULL DEFAULT '1',
  `nextReviewDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Flashcard_userId_fkey` (`userId`),
  CONSTRAINT `Flashcard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flashcard`
--

LOCK TABLES `Flashcard` WRITE;
/*!40000 ALTER TABLE `Flashcard` DISABLE KEYS */;
INSERT INTO `Flashcard` VALUES ('0c808b03-3a8d-4fc9-9ade-8bcdb4631220','fdksjfhksdhjfdskjf','fsdjflijdsif','',2,'2025-12-10 17:17:27.244','2025-12-08 16:14:28.015','927f26df-99a3-479e-9cea-0e166f254f32'),('2bc643cb-794e-45db-acf9-7421325dc5c8','fsdkjfidshfhdskhf','adknfkjdsofjiodsjf','',2,'2025-12-10 17:17:31.544','2025-12-08 16:14:39.180','927f26df-99a3-479e-9cea-0e166f254f32'),('2cba1915-e103-41c4-bc17-6b6b8aa0b383','fsdhjfjkhsdjfdshfhdhfdsjklf','fkjahf djfidshfiuhdifhduish fid hfidhs f','',1,'2025-12-09 17:17:25.860','2025-12-08 16:14:22.097','927f26df-99a3-479e-9cea-0e166f254f32'),('4f1662a1-feb4-4c3d-be09-1c81411dfb08','dshfjkhdsf','fbdsbfhvjds fksdkjfopdsfm','',2,'2025-12-10 17:17:18.861','2025-12-08 16:13:45.811','927f26df-99a3-479e-9cea-0e166f254f32'),('55f68fdd-35e6-497b-addf-bfeaf6b903ac','fsdkjhfuidhufihdhfuhdf','fkjdsjfkhsdbfhbsdhfbdhsbfhdb','',2,'2025-12-10 17:17:23.028','2025-12-08 16:14:06.165','927f26df-99a3-479e-9cea-0e166f254f32'),('a42a19aa-8ed8-4fc9-bff2-c1914ccaf805','crud','hi','',2,'2025-12-10 17:17:42.603','2025-12-08 17:17:10.537','927f26df-99a3-479e-9cea-0e166f254f32'),('b9b78b98-fdaf-46be-9249-ca15fd30769d','fdslfsdofkosdjfihdsuifh','kfnkldhfuihahuhfdabfkdshuf','',2,'2025-12-10 17:17:24.269','2025-12-08 16:14:13.773','927f26df-99a3-479e-9cea-0e166f254f32'),('be2c69d7-66c8-4eea-9740-be11edd1e37a','tg7','bt79b','',2,'2025-12-10 17:17:33.136','2025-12-08 17:09:27.173','927f26df-99a3-479e-9cea-0e166f254f32'),('d246c104-109f-4504-953a-d3c7ce38eed9','nnuhbhbu','hgsdfjtfkjdsilfycyldg nkl;fsuhlif/jdv ;ydgvbds','',2,'2025-12-10 17:17:17.138','2025-12-08 16:13:21.209','927f26df-99a3-479e-9cea-0e166f254f32'),('d89a32a4-1cd0-43d9-a4c5-6272a94c3971','asdkfjkdsnfjisdf','faksjfiasfjao;ij','',2,'2025-12-10 17:17:29.587','2025-12-08 16:14:33.426','927f26df-99a3-479e-9cea-0e166f254f32'),('e4be2237-6c6f-42fa-9427-fbb3ee1e360c',' 4','s','',1,'2025-12-08 17:18:38.045','2025-12-08 17:18:38.045','2f90d090-cacd-4018-b565-f0144d30d1e4'),('ec9e7e12-d1dd-4ebe-a709-b3d79f93489b','fsdkfnkjdsbfbudsnf','ds fbjkdsnfjhdskhfidsjifj dojfjidojf','',1,'2025-12-09 17:17:21.169','2025-12-08 16:13:53.581','927f26df-99a3-479e-9cea-0e166f254f32');
/*!40000 ALTER TABLE `Flashcard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuizResult`
--

DROP TABLE IF EXISTS `QuizResult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `QuizResult` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL,
  `total` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `QuizResult_userId_fkey` (`userId`),
  CONSTRAINT `QuizResult_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuizResult`
--

LOCK TABLES `QuizResult` WRITE;
/*!40000 ALTER TABLE `QuizResult` DISABLE KEYS */;
INSERT INTO `QuizResult` VALUES ('6d200c7a-0d1e-4568-9ca3-f2afb3bd6dee',1,1,'2025-12-08 17:17:42.614','927f26df-99a3-479e-9cea-0e166f254f32'),('92734a10-bab8-4bcc-bcc3-6c8343decd13',8,10,'2025-12-08 17:17:33.144','927f26df-99a3-479e-9cea-0e166f254f32');
/*!40000 ALTER TABLE `QuizResult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('03002d7c-d007-4a34-aa99-3442bf1a4e8a','emdskfhdjkfail@gmail.com','$2b$10$vVItk971DrA0Y4.Ged871extjD6xUrPW1kSIHXfWSNf5thtFZgYQy','2025-12-08 17:01:10.494','egdfjd','EG'),('2f90d090-cacd-4018-b565-f0144d30d1e4','krish@gmail.com','$2b$10$7Vl8VPQW.krF7u0b9g1KauWVdiWWvNMYNi2w0cdH.zlgWQRFbLNOq','2025-12-08 17:18:29.667','krish','KR'),('38cf5e19-b3a6-4307-b7a2-8f4bfcbf3679','emdfkdjfkail@gmail.com','$2b$10$KpqjXqiIsyO/i5FNwKNLV.5/UsoxDUrW.pV2W1j6x9fiKYXTXvRku','2025-12-08 17:02:22.269','hello','HE'),('7c17998b-d80f-497a-be45-ad26eeabf38e','autotest@test.com','$2b$10$L/OzBUvQJ4pxwWb6Od2o9eJ92J5uRmXaMfNX7SkRKEGq2oEEvt3YS','2025-12-08 17:07:28.876','autotest','AU'),('927f26df-99a3-479e-9cea-0e166f254f32','email@gmail.com','$2b$10$A930KQ90t5kUlV66JoEMLeESSmzNkE/WT5Fkc8Yb0zf5i/DqJ3A1a','2025-12-08 16:12:57.874','email',NULL),('9ea83edb-6ca2-46a7-a345-e34075551595','newuser@test.com','$2b$10$exLN67Q4kDgtIJVPjftzHukLMddCxHc8x9X7sLjdkk79EZGBCVQVu','2025-12-08 16:59:19.607','newuser','NE'),('ab91a873-6a89-4fe8-bf98-29bd30624da9','emailsdfd@gmail.com','$2b$10$RrzWNkmHL.749Ejj5rVL5Oxt5eoAJziPCoUU23Niy6JqpL5UXHb6y','2025-12-08 17:00:54.950','john','JO'),('db3fffff-aadb-4f0a-87a2-b1618c91a7a6','emaildfdfds@gmail.com','$2b$10$JSSVloAiL8GOKVLeL08Kk.d2mjlkHxdTXrUPeHbzI6eN4Ug2zROc.','2025-12-08 17:02:46.264','dhfduf','DH'),('de832bea-1012-479f-aa33-b9f5aa11ce76','asmr@gmail.com','$2b$10$AClY2Nl5yRx4r293ePKcQu6cL8vESfW.MQNGvGGcONjUlwHwKEsra','2025-12-08 17:12:57.283','asmr','AS');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-09  1:25:38
