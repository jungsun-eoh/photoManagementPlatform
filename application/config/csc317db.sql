-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'test title','test jhkjhkjhf df d s f dsd. f e w r ','images/test.png','images/thumbnails/test.png',0,'2020-04-30 00:02:33',6),(2,'test title1','test jhkjhkjhf df d s f dsd. f e w r ','images/test1.png','images/thumbnails/test1.png',0,'2020-04-30 00:03:34',5),(3,'test title2','test jhkjhkjhf df d s f dsd. f e w r ','images/test2.png','images/thumbnails/test2.png',0,'2020-04-30 00:03:53',3),(4,'test title21','test jhkjhkjhf df d s f dsd. f e w r ','images/test21.png','images/thumbnails/test21.png',0,'2020-04-30 00:04:24',1),(5,'test title221','test jhkjhkjhf df d s f dsd. f e w r ','images/test221.png','images/thumbnails/test221.png',0,'2020-04-30 00:04:37',1),(6,'jjkjk','1111','public/images/uploads/5da15e278d1df3b3f09a34cd65d5c3640cbd38226c91.jpeg','public/images/uploads/thumbnail-5da15e278d1df3b3f09a34cd65d5c3640cbd38226c91.jpeg',0,'2020-05-21 03:06:34',15),(7,'qwe123456','1111','public/images/uploads/ef2911151bbde307509396b92eb2fc974f5aa969cbaf.jpeg','public/images/uploads/thumbnail-ef2911151bbde307509396b92eb2fc974f5aa969cbaf.jpeg',0,'2020-05-21 03:06:55',15),(8,'qwe123456','1111','public/images/uploads/5c0efc1302fa63c217be2904ba1575a9bf6357cea14d.jpeg','public/images/uploads/thumbnail-5c0efc1302fa63c217be2904ba1575a9bf6357cea14d.jpeg',0,'2020-05-21 03:08:00',15),(9,'qwekjh','1111','public/images/uploads/0c0effcaf9725a6f3684aa57cf63555f18bd3b13f49b.jpeg','public/images/uploads/thumbnail-0c0effcaf9725a6f3684aa57cf63555f18bd3b13f49b.jpeg',0,'2020-05-21 03:13:09',15),(10,'erewer1234qwe','1111qwe','public/images/uploads/17dd02852ef1e400d8f3100c768ebc50f26afe95882a.jpeg','public/images/uploads/thumbnail-17dd02852ef1e400d8f3100c768ebc50f26afe95882a.jpeg',0,'2020-05-21 04:25:56',15),(11,'tes12','qweasd','public/images/uploads/42fe290196eb9eb6c3dc77ef3a2bb71dc19b49aacf62.png','public/images/uploads/thumbnail-42fe290196eb9eb6c3dc77ef3a2bb71dc19b49aacf62.png',0,'2020-05-21 21:53:05',15);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser01','test@mail.com','jksjhdkfjh88',0,0,'2020-04-29 23:44:10'),(3,'testuser02','test2@mail.com','jksjhdk22fjh88',0,0,'2020-04-29 23:45:26'),(5,'testuser03','test3@mail.com','jksjhdk22fjh88',0,0,'2020-04-29 23:45:41'),(6,'testuser04','test4@mail.com','22fjh88',0,0,'2020-04-29 23:45:57'),(7,'tonytest1','fakemail@mail.com','123456hjh',0,0,'2020-04-30 02:55:32'),(9,'tonytest2','fakemail2@mail.com','123456hjh',0,0,'2020-04-30 03:12:04'),(11,'tonytest3','fakemail3@mail.com','123456hjh',0,0,'2020-04-30 03:21:04'),(12,'gind1','gin1@gin.com','1234',0,0,'2020-05-19 22:52:31'),(13,'tony0717','tony@ggg.com','1234',0,0,'2020-05-19 22:56:50'),(14,'hashedT','hashedT@ddd.com','$2b$10$RyKxQq5S8AOkzcNRTDq3iuH7B/a6Ncig8TWf0e7pf5brzKY82gxV.',0,0,'2020-05-20 00:50:13'),(15,'hashedT2','hashedT2@ddd.com','$2b$10$bFH12FGMwkj40wYYlDI34O2l27ZjIWThXwJX7AjxUS1E4vApCSkcK',0,0,'2020-05-20 00:56:50'),(16,'hashedT3','hashedT3@ddd.com','$2b$10$1XsULlPiqEJVSAa03jWzSuCTtkPWcCVSvV4CjHjuA008EuxOMOdXK',0,0,'2020-05-20 01:00:23'),(17,'hashedT5','hashedT5@ddd.com','$2b$10$QRmh27mf94GE4aE8JjOyi.IuWhGIWWhk2I4/iAMPq96A51Mpxe5k.',0,0,'2020-05-20 01:05:52'),(18,'hashedT7','hashedT7@ddd.com','$2b$10$G6PKsM.Ams//ew1Hyph4WuZkU7M96.9cVX7y4wbQsi3SvwulLbWzu',0,0,'2020-05-20 01:28:23'),(19,'hashedT10','hashed10@ddd.com','$2b$10$xN2RTG06xyNFIGNk/.5ee.tqfH6S9zau68QBEv939OYrnNxKhipLW',0,0,'2020-05-20 12:58:29'),(20,'hashedT20','hashedT20@ddd.com','$2b$10$XwxtMhBtq.NLFzoUEEuT6.QiCreWg48ILJ.4P4SAaAZPuy8HTISAG',0,0,'2020-05-20 13:03:57'),(21,'ttt1','ttt1@ttt.com','$2b$10$g2d/ZImTuQ1vV2Id03xj5OafW.HsxXb.J0yPUeZ4gV7H1YVGLo2O2',0,0,'2020-05-20 13:05:01'),(22,'qwe123','qwe@qwe.com','$2b$10$347v2bhGXfk8ZVMRIa69mOj9txgMIEnB/J21QVvcx9WDmo1M6bh/q',0,0,'2020-05-20 13:08:09'),(23,'aaa','aaa@AAA.com','$2b$10$E/hYvLOBqUl3C/7MjfRJLOlk8S.CZbznCa/7WzJWCZbmun1S7pw1q',0,0,'2020-05-20 13:13:16'),(24,'aaa1','aaa1@aaa.com','$2b$10$DTwvKweBQF.q7T4c6lrCjuR8Vy91or4xa0/rTWB68pRKHzGJ4Dada',0,0,'2020-05-20 13:14:24'),(25,'qqq1','qqq1@111.com','$2b$10$ZpdoNlwl0bnBdL4nMOnXSOQJeLJrWBo2ZeAoVtPcdS8W7cJYeoVqm',0,0,'2020-05-20 13:28:30'),(26,'tt12','ttt@ds.com','$2b$10$8YWq99PCeEYlOtG9r.wlV.k6lVd6ZPe2.xmJJiOw.9rSeCGbnbzSO',0,0,'2020-05-21 22:34:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-21 22:40:11
