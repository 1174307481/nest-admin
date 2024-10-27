-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wallpaper
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `app_category`
--

DROP TABLE IF EXISTS `app_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `orderNo` int DEFAULT '0',
  `avatarId` int DEFAULT NULL,
  `isBase` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_a2849b1f83cd67976549ae66a4` (`avatarId`),
  CONSTRAINT `FK_a2849b1f83cd67976549ae66a4b` FOREIGN KEY (`avatarId`) REFERENCES `tool_storage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_category`
--

LOCK TABLES `app_category` WRITE;
/*!40000 ALTER TABLE `app_category` DISABLE KEYS */;
INSERT INTO `app_category` VALUES (1,'2024-10-27 23:03:32.335193','2024-10-27 23:52:20.000000',NULL,NULL,'手机壁纸',NULL,1,144,1),(2,'2024-10-27 23:03:52.840511','2024-10-27 23:03:52.840511',NULL,NULL,'黄霄云','2',1,145,0),(3,'2024-10-27 23:04:09.870092','2024-10-27 23:04:09.870092',NULL,NULL,'电脑壁纸','1',1,146,0),(4,'2024-10-27 23:04:17.518940','2024-10-27 23:04:17.518940',NULL,NULL,'风景',NULL,1,147,0),(5,'2024-10-27 23:04:34.888486','2024-10-27 23:04:34.888486',NULL,NULL,'美女','1',1,148,0),(6,'2024-10-27 23:04:51.441550','2024-10-27 23:04:51.441550',NULL,NULL,'头像','1',1,149,0);
/*!40000 ALTER TABLE `app_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_creator_audit`
--

DROP TABLE IF EXISTS `app_creator_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_creator_audit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `auditStatus` tinyint NOT NULL DEFAULT '0' COMMENT '审核状态: 0-待审核, 1-通过, 2-驳回',
  `remark` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '审核备注',
  `applyReason` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '申请理由',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bea755e416c455660d72916a101` (`user_id`),
  CONSTRAINT `FK_bea755e416c455660d72916a101` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_creator_audit`
--

LOCK TABLES `app_creator_audit` WRITE;
/*!40000 ALTER TABLE `app_creator_audit` DISABLE KEYS */;
INSERT INTO `app_creator_audit` VALUES (1,'2024-10-27 00:42:41.619192','2024-10-27 00:42:55.000000',1,'ss','W',1),(2,'2024-10-27 00:49:31.777384','2024-10-27 00:49:43.000000',1,'通过','W',1),(3,'2024-10-27 00:51:38.687400','2024-10-27 00:52:21.000000',2,'学习','W',1),(4,'2024-10-27 02:31:58.516290','2024-10-27 02:34:22.000000',1,'杀杀杀','W',1),(5,'2024-10-27 02:31:59.611398','2024-10-27 02:34:22.000000',1,'杀杀杀','W',1);
/*!40000 ALTER TABLE `app_creator_audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_creator_auth`
--

DROP TABLE IF EXISTS `app_creator_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_creator_auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `authStatus` tinyint NOT NULL DEFAULT '0' COMMENT '审核状态: 0-待审核, 1-通过, 2-驳回',
  `remark` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '审核备注',
  `applyReason` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '申请理由',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5a2042ae90b7b53c070da26bd08` (`user_id`),
  CONSTRAINT `FK_5a2042ae90b7b53c070da26bd08` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_creator_auth`
--

LOCK TABLES `app_creator_auth` WRITE;
/*!40000 ALTER TABLE `app_creator_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_creator_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_feedback`
--

DROP TABLE IF EXISTS `app_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_feedback`
--

LOCK TABLES `app_feedback` WRITE;
/*!40000 ALTER TABLE `app_feedback` DISABLE KEYS */;
INSERT INTO `app_feedback` VALUES (2,'满月那主样。','观持民近众复收的争。','2024-10-26 23:05:52.237052','2024-10-26 23:05:52.237052');
/*!40000 ALTER TABLE `app_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_feedback_screenshots_tool_storage`
--

DROP TABLE IF EXISTS `app_feedback_screenshots_tool_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_feedback_screenshots_tool_storage` (
  `appFeedbackId` int NOT NULL,
  `toolStorageId` int NOT NULL,
  PRIMARY KEY (`appFeedbackId`,`toolStorageId`),
  KEY `IDX_e7f3d0a451e57511cad4a8dde9` (`appFeedbackId`),
  KEY `IDX_b8eeb7adff80a6407438410aca` (`toolStorageId`),
  CONSTRAINT `FK_b8eeb7adff80a6407438410acaa` FOREIGN KEY (`toolStorageId`) REFERENCES `tool_storage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_e7f3d0a451e57511cad4a8dde94` FOREIGN KEY (`appFeedbackId`) REFERENCES `app_feedback` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_feedback_screenshots_tool_storage`
--

LOCK TABLES `app_feedback_screenshots_tool_storage` WRITE;
/*!40000 ALTER TABLE `app_feedback_screenshots_tool_storage` DISABLE KEYS */;
INSERT INTO `app_feedback_screenshots_tool_storage` VALUES (2,91),(2,92);
/*!40000 ALTER TABLE `app_feedback_screenshots_tool_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_picture`
--

DROP TABLE IF EXISTS `app_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `auditStatus` tinyint NOT NULL DEFAULT '0' COMMENT '审核状态: 0-待审核, 1-通过, 2-驳回',
  `storageId` int DEFAULT NULL,
  `isBase` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_2fb48905e982d4bbf26cb418ff4` (`storageId`),
  CONSTRAINT `FK_2fb48905e982d4bbf26cb418ff4` FOREIGN KEY (`storageId`) REFERENCES `tool_storage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_picture`
--

LOCK TABLES `app_picture` WRITE;
/*!40000 ALTER TABLE `app_picture` DISABLE KEYS */;
INSERT INTO `app_picture` VALUES (1,'2024-10-27 23:05:14.418289','2024-10-27 23:51:49.000000','20200618184103420188-202410272305342.jpg','1',1,150,1),(2,'2024-10-27 23:05:14.429047','2024-10-27 23:42:40.000000','20200904141301580361-202410272305343.jpg','1',1,151,0),(3,'2024-10-27 23:05:14.433210','2024-10-27 23:05:14.433210','20190828144302875400-202410272305346.jpg','1',1,152,0),(4,'2024-10-27 23:05:14.448695','2024-10-27 23:05:14.448695','20191017122708359438-202410272305354.jpg','1',1,153,0),(5,'2024-10-27 23:05:28.541627','2024-10-27 23:05:28.541627','20240814144804395366-202410272305414.jpg','1',1,154,0),(6,'2024-10-27 23:05:43.528300','2024-10-27 23:05:43.528300','20200618184103420188-202410272305448.jpg','1',1,155,0),(7,'2024-10-27 23:05:43.533908','2024-10-27 23:05:43.533908','20210604103709284895-202410272305458.jpg','1',1,156,0),(8,'2024-10-27 23:05:43.543874','2024-10-27 23:05:43.543874','20200904141301580361-202410272305462.jpg','1',1,157,0),(9,'2024-10-27 23:05:43.568687','2024-10-27 23:05:43.568687','20210602184704843622-202410272305459.jpg','1',1,158,0),(10,'2024-10-27 23:05:58.674104','2024-10-27 23:05:58.674104','1318045-202410272305604.jpg','1',1,159,0),(11,'2024-10-27 23:05:58.674366','2024-10-27 23:05:58.674366','1318047-202410272305601.jpg','1',1,160,0),(12,'2024-10-27 23:06:15.591651','2024-10-27 23:06:15.591651','微信图片_20241027154740-202410272306502.jpg','1',1,161,0),(13,'2024-10-27 23:06:15.594651','2024-10-27 23:06:15.594651','微信图片_20241027154738-202410272306508.jpg','1',1,162,0),(14,'2024-10-27 23:06:15.604480','2024-10-27 23:06:15.604480','微信图片_20241027154743-202410272306514.jpg','1',1,163,0);
/*!40000 ALTER TABLE `app_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_picture_audit`
--

DROP TABLE IF EXISTS `app_picture_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_picture_audit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `auditStatus` tinyint NOT NULL DEFAULT '0' COMMENT '审核状态: 0-待审核, 1-通过, 2-驳回',
  `remark` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '审核备注',
  `picture_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2ec4db59e92ad3cdce92f96bc4c` (`user_id`),
  KEY `FK_ca704bf81ec0dcc8f333882f61f` (`picture_id`),
  CONSTRAINT `FK_2ec4db59e92ad3cdce92f96bc4c` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`),
  CONSTRAINT `FK_ca704bf81ec0dcc8f333882f61f` FOREIGN KEY (`picture_id`) REFERENCES `app_picture` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_picture_audit`
--

LOCK TABLES `app_picture_audit` WRITE;
/*!40000 ALTER TABLE `app_picture_audit` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_picture_audit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_picture_categories_app_category`
--

DROP TABLE IF EXISTS `app_picture_categories_app_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_picture_categories_app_category` (
  `appPictureId` int NOT NULL,
  `appCategoryId` int NOT NULL,
  PRIMARY KEY (`appPictureId`,`appCategoryId`),
  KEY `IDX_3b08f79d33259b14a47c49f1cd` (`appPictureId`),
  KEY `IDX_6a9ac753034676e6b93cb3a38d` (`appCategoryId`),
  CONSTRAINT `FK_3b08f79d33259b14a47c49f1cd5` FOREIGN KEY (`appPictureId`) REFERENCES `app_picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_6a9ac753034676e6b93cb3a38dc` FOREIGN KEY (`appCategoryId`) REFERENCES `app_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_picture_categories_app_category`
--

LOCK TABLES `app_picture_categories_app_category` WRITE;
/*!40000 ALTER TABLE `app_picture_categories_app_category` DISABLE KEYS */;
INSERT INTO `app_picture_categories_app_category` VALUES (1,1),(2,1),(3,1),(4,1),(5,3),(6,5),(7,5),(8,5),(9,5),(10,1),(11,1),(12,1),(13,1),(14,1);
/*!40000 ALTER TABLE `app_picture_categories_app_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_banner`
--

DROP TABLE IF EXISTS `sys_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `coverId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_96a9b332d55a42f6c3562213dc` (`coverId`),
  CONSTRAINT `FK_96a9b332d55a42f6c3562213dcd` FOREIGN KEY (`coverId`) REFERENCES `tool_storage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_banner`
--

LOCK TABLES `sys_banner` WRITE;
/*!40000 ALTER TABLE `sys_banner` DISABLE KEYS */;
INSERT INTO `sys_banner` VALUES (6,'banner管理','12','www.baidu.com',87);
/*!40000 ALTER TABLE `sys_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_captcha_log`
--

DROP TABLE IF EXISTS `sys_captcha_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_captcha_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_captcha_log`
--

LOCK TABLES `sys_captcha_log` WRITE;
/*!40000 ALTER TABLE `sys_captcha_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_captcha_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_category`
--

DROP TABLE IF EXISTS `sys_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `orderNo` int DEFAULT '0',
  `mpath` varchar(255) COLLATE utf8mb4_general_ci DEFAULT '',
  `parentId` int DEFAULT NULL,
  `avatarId` int DEFAULT NULL,
  `isBase` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_70b2d62a93429e7d24e49e1d15` (`avatarId`),
  CONSTRAINT `FK_70b2d62a93429e7d24e49e1d156` FOREIGN KEY (`avatarId`) REFERENCES `tool_storage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_category`
--

LOCK TABLES `sys_category` WRITE;
/*!40000 ALTER TABLE `sys_category` DISABLE KEYS */;
INSERT INTO `sys_category` VALUES (1,'2024-10-26 22:38:36.994900','2024-10-27 22:31:59.000000',NULL,NULL,'风景','嘻嘻嘻',NULL,2,'1.',NULL,90,'1'),(2,'2024-10-26 23:26:48.998328','2024-10-27 22:34:09.000000',NULL,NULL,'手机壁纸','嘻嘻嘻',NULL,1,'2.',NULL,143,'1'),(3,'2024-10-27 20:58:41.290600','2024-10-27 22:33:49.000000',NULL,NULL,'桌面壁纸','零零零零',NULL,1,'',NULL,142,'1'),(4,'2024-10-27 22:31:37.563288','2024-10-27 22:31:53.000000',NULL,NULL,'头像',NULL,NULL,1,'',NULL,137,'1'),(5,'2024-10-27 22:32:21.690913','2024-10-27 22:32:21.690913',NULL,NULL,'美女',NULL,NULL,1,'',NULL,138,'1'),(6,'2024-10-27 22:32:38.480720','2024-10-27 22:32:38.480720',NULL,NULL,'游戏',NULL,NULL,1,'',NULL,139,'1'),(7,'2024-10-27 22:32:53.467656','2024-10-27 22:32:53.467656',NULL,NULL,'二次元','1',NULL,1,'',NULL,140,'1'),(8,'2024-10-27 22:33:31.578383','2024-10-27 22:33:31.578383',NULL,NULL,'治愈','1',NULL,1,'',NULL,141,'1');
/*!40000 ALTER TABLE `sys_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_config`
--

DROP TABLE IF EXISTS `sys_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_2c363c25cf99bcaab3a7f389ba` (`key`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_config`
--

LOCK TABLES `sys_config` WRITE;
/*!40000 ALTER TABLE `sys_config` DISABLE KEYS */;
INSERT INTO `sys_config` VALUES (1,'sys_user_initPassword','初始密码','123456','创建管理员账号的初始密码','2023-11-10 00:31:44.154921','2023-11-10 00:31:44.161263'),(2,'sys_api_token','API Token','nest-admin','用于请求 @ApiToken 的控制器','2023-11-10 00:31:44.154921','2024-01-29 09:52:27.000000');
/*!40000 ALTER TABLE `sys_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dept`
--

DROP TABLE IF EXISTS `sys_dept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dept` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `orderNo` int DEFAULT '0',
  `mpath` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `parentId` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_c75280b01c49779f2323536db67` (`parentId`) USING BTREE,
  CONSTRAINT `FK_c75280b01c49779f2323536db67` FOREIGN KEY (`parentId`) REFERENCES `sys_dept` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dept`
--

LOCK TABLES `sys_dept` WRITE;
/*!40000 ALTER TABLE `sys_dept` DISABLE KEYS */;
INSERT INTO `sys_dept` VALUES (1,'华东分部',1,'1.',NULL,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(2,'研发部',1,'1.2.',1,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(3,'市场部',2,'1.3.',1,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(4,'商务部',3,'1.4.',1,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(5,'财务部',4,'1.5.',1,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(6,'华南分部',2,'6.',NULL,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(7,'西北分部',3,'7.',NULL,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(8,'研发部',1,'6.8.',6,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL),(9,'市场部',1,'6.9.',6,'2023-11-10 00:31:43.996025','2023-11-10 00:31:44.008709',NULL,NULL);
/*!40000 ALTER TABLE `sys_dept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict`
--

DROP TABLE IF EXISTS `sys_dict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dict` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_by` int NOT NULL COMMENT '创建者',
  `update_by` int NOT NULL COMMENT '更新者',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d112365748f740ee260b65ce91` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict`
--

LOCK TABLES `sys_dict` WRITE;
/*!40000 ALTER TABLE `sys_dict` DISABLE KEYS */;
/*!40000 ALTER TABLE `sys_dict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict_item`
--

DROP TABLE IF EXISTS `sys_dict_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dict_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `order` int DEFAULT NULL COMMENT '字典项排序',
  `status` tinyint NOT NULL DEFAULT '1',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `orderNo` int DEFAULT NULL COMMENT '字典项排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_item`
--

LOCK TABLES `sys_dict_item` WRITE;
/*!40000 ALTER TABLE `sys_dict_item` DISABLE KEYS */;
INSERT INTO `sys_dict_item` VALUES (1,'2024-01-29 01:24:51.846135','2024-01-29 02:23:19.000000',1,1,'男','1',0,1,'性别男',1,3),(2,'2024-01-29 01:32:58.458741','2024-01-29 01:58:20.000000',1,1,'女','0',1,1,'性别女',1,2),(3,'2024-01-29 01:59:17.805394','2024-01-29 14:37:18.000000',1,1,'人妖王','3',NULL,1,'安布里奥·伊万科夫',1,0),(5,'2024-01-29 02:13:01.782466','2024-01-29 02:13:01.782466',1,1,'显示','1',NULL,1,'显示菜单',2,0),(6,'2024-01-29 02:13:31.134721','2024-01-29 02:13:31.134721',1,1,'隐藏','0',NULL,1,'隐藏菜单',2,0);
/*!40000 ALTER TABLE `sys_dict_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_dict_type`
--

DROP TABLE IF EXISTS `sys_dict_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_dict_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_74d0045ff7fab9f67adc0b1bda` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_dict_type`
--

LOCK TABLES `sys_dict_type` WRITE;
/*!40000 ALTER TABLE `sys_dict_type` DISABLE KEYS */;
INSERT INTO `sys_dict_type` VALUES (1,'2024-01-28 08:19:12.777447','2024-02-08 13:05:10.000000',1,1,'性别',1,'性别单选','sys_user_gender'),(2,'2024-01-28 08:38:41.235185','2024-01-29 02:11:33.000000',1,1,'菜单显示状态',1,'菜单显示状态','sys_show_hide');
/*!40000 ALTER TABLE `sys_dict_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_login_log`
--

DROP TABLE IF EXISTS `sys_login_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_login_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ua` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `provider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_3029712e0df6a28edaee46fd470` (`user_id`),
  CONSTRAINT `FK_3029712e0df6a28edaee46fd470` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_login_log`
--

LOCK TABLES `sys_login_log` WRITE;
/*!40000 ALTER TABLE `sys_login_log` DISABLE KEYS */;
INSERT INTO `sys_login_log` VALUES (1,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 00:29:08.969216','2024-10-26 00:29:08.969216',1),(2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 13:26:04.806703','2024-10-26 13:26:04.806703',1),(3,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 13:34:52.790195','2024-10-26 13:34:52.790195',1),(4,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 14:00:29.085900','2024-10-26 14:00:29.085900',1),(5,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 14:21:06.992166','2024-10-26 14:21:06.992166',1),(6,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 14:24:16.923914','2024-10-26 14:24:16.923914',1),(7,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 14:33:40.602902','2024-10-26 14:33:40.602902',1),(8,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 15:24:07.602269','2024-10-26 15:24:07.602269',27),(9,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 21:32:04.334543','2024-10-26 21:32:04.334543',1),(10,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 22:50:53.215082','2024-10-26 22:50:53.215082',1),(11,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-26 23:38:44.953504','2024-10-26 23:38:44.953504',1),(12,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 00:24:45.081065','2024-10-27 00:24:45.081065',1),(13,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 01:20:47.532924','2024-10-27 01:20:47.532924',27),(14,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 11:43:58.849641','2024-10-27 11:43:58.849641',1),(15,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 11:45:49.179539','2024-10-27 11:45:49.179539',27),(16,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 11:47:28.364737','2024-10-27 11:47:28.364737',29),(17,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 11:48:42.427189','2024-10-27 11:48:42.427189',27),(18,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 11:52:09.641200','2024-10-27 11:52:09.641200',1),(19,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 11:52:43.820923','2024-10-27 11:52:43.820923',27),(20,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 18:50:25.743699','2024-10-27 18:50:25.743699',1),(21,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','内网IP',NULL,'2024-10-27 22:22:14.723802','2024-10-27 22:22:14.723802',1);
/*!40000 ALTER TABLE `sys_login_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_menu`
--

DROP TABLE IF EXISTS `sys_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` tinyint NOT NULL DEFAULT '0',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `order_no` int DEFAULT '0',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `keep_alive` tinyint NOT NULL DEFAULT '1',
  `show` tinyint NOT NULL DEFAULT '1',
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `is_ext` tinyint NOT NULL DEFAULT '0',
  `ext_open_mode` tinyint NOT NULL DEFAULT '1',
  `active_menu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_menu`
--

LOCK TABLES `sys_menu` WRITE;
/*!40000 ALTER TABLE `sys_menu` DISABLE KEYS */;
INSERT INTO `sys_menu` VALUES (1,NULL,'/system','系统管理','',0,'ant-design:setting-outlined',254,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(2,1,'/system/user','用户管理','system:user:list',1,'ant-design:user-outlined',0,'system/user/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(3,1,'/system/role','角色管理','system:role:list',1,'ep:user',1,'system/role/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(4,1,'/system/menu','菜单管理','system:menu:list',1,'ep:menu',2,'system/menu/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(5,1,'/system/monitor','系统监控','',0,'ep:monitor',5,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(6,5,'/system/monitor/online','在线用户','system:online:list',1,'',0,'system/monitor/online/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(7,5,'/sys/monitor/login-log','登录日志','system:log:login:list',1,'',0,'system/monitor/log/login/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(8,5,'/system/monitor/serve','服务监控','system:serve:stat',1,'',4,'system/monitor/serve/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(9,1,'/system/schedule','任务调度','',0,'ant-design:schedule-filled',6,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(10,9,'/system/task','任务管理','',1,'',0,'system/schedule/task/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(11,9,'/system/task/log','任务日志','system:task:list',1,'',0,'system/schedule/log/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(12,NULL,'/document','文档','',0,'ion:tv-outline',2,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(14,12,'https://www.typeorm.org/','Typeorm中文文档(外链)',NULL,1,'',3,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',1,1,NULL,NULL,NULL),(15,12,'https://docs.nestjs.cn/','Nest.js中文文档(内嵌)','',1,'',4,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',1,2,NULL,NULL,NULL),(20,2,NULL,'新增','system:user:create',2,'',0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(21,2,'','删除','system:user:delete',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(22,2,'','更新','system:user:update',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(23,2,'','查询','system:user:read',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(24,3,'','新增','system:role:create',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(25,3,'','删除','system:role:delete',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(26,3,'','修改','system:role:update',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(27,3,'','查询','system:role:read',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(28,4,NULL,'新增','system:menu:create',2,NULL,0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(29,4,NULL,'删除','system:menu:delete',2,NULL,0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(30,4,'','修改','system:menu:update',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(31,4,NULL,'查询','system:menu:read',2,NULL,0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(32,6,'','下线','system:online:kick',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(34,10,'','新增','system:task:create',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(35,10,'','删除','system:task:delete',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(36,10,'','执行一次','system:task:once',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(37,10,'','查询','system:task:read',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(38,10,'','运行','system:task:start',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(39,10,'','暂停','system:task:stop',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(40,10,'','更新','system:task:update',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(41,7,'','查询登录日志','system:log:login:list',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(42,7,'','查询任务日志','system:log:task:list',2,'',0,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(43,NULL,'/about','关于','',1,'ant-design:info-circle-outlined',260,'account/about',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(48,NULL,'/tool','系统工具',NULL,0,'ant-design:tool-outlined',254,'',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(49,48,'/tool/email','邮件工具','system:tools:email',1,'ant-design:send-outlined',1,'tool/email/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(50,49,NULL,'发送邮件','tools:email:send',2,'',0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(51,48,'/tool/storage','存储管理','tool:storage:list',1,'ant-design:appstore-outlined',2,'tool/storage/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(52,51,NULL,'文件上传','upload:upload',2,'',0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(53,51,NULL,'文件删除','tool:storage:delete',2,'',2,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(54,2,NULL,'修改密码','system:user:password',2,'',5,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(56,1,'/system/dict-type','字典管理','system:dict-type:list',1,'ant-design:book-outlined',4,'system/dict-type/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(57,56,NULL,'新增','system:dict-type:create',2,'',1,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(58,56,NULL,'更新','system:dict-type:update',2,'',2,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(59,56,NULL,'删除','system:dict-type:delete',2,'',3,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(60,56,NULL,'查询','system:dict-type:info',2,'',4,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(61,1,'/system/dept','部门管理','system:dept:list',1,'ant-design:deployment-unit-outlined',3,'system/dept/index',0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(62,61,NULL,'新增','system:dept:create',2,'',1,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(63,61,NULL,'更新','system:dept:update',2,'',2,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(64,61,NULL,'删除','system:dept:delete',2,'',3,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(65,61,NULL,'查询','system:dept:read',2,'',4,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(68,5,'/health','健康检查','',1,'',4,'',0,0,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(69,68,NULL,'网络','app:health:network',2,'',0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(70,68,NULL,'数据库','app:health: database',2,'',0,NULL,0,1,1,'2023-11-10 00:31:44.023393','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(86,1,'/param-config','参数配置','system:param-config:list',1,'ep:edit',255,'system/param-config/index',0,1,1,'2024-01-10 17:34:52.569663','2024-01-19 02:11:27.000000',0,1,NULL,NULL,NULL),(87,86,NULL,'查询','system:param-config:read',2,'',255,NULL,0,1,1,'2024-01-10 17:39:20.983241','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(88,86,NULL,'新增','system:param-config:create',2,'',255,NULL,0,1,1,'2024-01-10 17:39:57.543510','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(89,86,NULL,'更新','system:param-config:update',2,'',255,NULL,0,1,1,'2024-01-10 17:40:27.355944','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(92,86,NULL,'删除','system:param-config:delete',2,'',255,NULL,0,1,1,'2024-01-10 17:57:32.059887','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(107,1,'system/dict-item/:id','字典项管理','system:dict-item:list',1,'ant-design:facebook-outlined',255,'system/dict-item/index',0,0,1,'2024-01-28 09:21:17.409532','2024-01-30 13:09:47.000000',0,1,'字典管理',NULL,NULL),(108,107,NULL,'新增','system:dict-item:create',2,'',255,NULL,0,1,1,'2024-01-28 09:22:39.401758','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(109,107,NULL,'更新','system:dict-item:update',2,'',255,NULL,0,1,1,'2024-01-28 09:26:43.911886','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(110,107,NULL,'删除','system:dict-item:delete',2,'',255,NULL,0,1,1,'2024-01-28 09:27:28.535225','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(111,107,NULL,'查询','system:dict-item:info',2,'',255,NULL,0,1,1,'2024-01-28 09:27:43.894820','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(112,12,'https://antdv.com/components/overview-cn','antdv文档(内嵌)',NULL,1,'',255,NULL,0,1,1,'2024-01-29 09:23:08.407723','2024-02-28 22:05:52.102649',1,2,NULL,NULL,NULL),(115,NULL,'netdisk','网盘管理',NULL,0,'ant-design:cloud-server-outlined',255,NULL,0,1,1,'2024-02-10 08:00:02.394616','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(116,115,'manage','文件管理','netdisk:manage:list',1,'',252,'netdisk/manage',0,1,1,'2024-02-10 08:03:49.837348','2024-02-10 09:34:41.000000',0,1,NULL,NULL,NULL),(117,116,NULL,'创建文件或文件夹','netdisk:manage:create',2,'',255,NULL,0,1,1,'2024-02-10 08:40:22.317257','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(118,116,NULL,'查看文件','netdisk:manage:read',2,'',255,NULL,0,1,1,'2024-02-10 08:41:22.008015','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(119,116,NULL,'更新','netdisk:manage:update',2,'',255,NULL,0,1,1,'2024-02-10 08:41:50.691643','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(120,116,NULL,'删除','netdisk:manage:delete',2,'',255,NULL,0,1,1,'2024-02-10 08:42:09.480601','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(121,116,NULL,'获取文件上传token','netdisk:manage:token',2,'',255,NULL,0,1,1,'2024-02-10 08:42:57.688104','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(122,116,NULL,'添加文件备注','netdisk:manage:mark',2,'',255,NULL,0,1,1,'2024-02-10 08:43:40.117321','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(123,116,NULL,'下载文件','netdisk:manage:download',2,'',255,NULL,0,1,1,'2024-02-10 08:44:01.338984','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(124,116,NULL,'重命名文件或文件夹','netdisk:manage:rename',2,'',255,NULL,0,1,1,'2024-02-10 08:44:27.233379','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(125,116,NULL,'复制文件或文件夹','netdisk:manage:copy',2,'',255,NULL,0,1,1,'2024-02-10 08:44:44.725391','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(126,116,NULL,'剪切文件或文件夹','netdisk:manage:cut',2,'',255,NULL,0,1,1,'2024-02-10 08:45:21.660511','2024-02-28 22:05:52.102649',0,1,NULL,NULL,NULL),(127,115,'overview','网盘概览','netdisk:overview:desc',1,'',254,'netdisk/overview',0,1,1,'2024-02-10 09:32:56.981190','2024-02-10 09:34:18.000000',0,1,NULL,NULL,NULL),(128,130,'/appManage/category','分类管理',NULL,1,'ant-design:aliwangwang-filled',255,'appManage/category/index',0,1,1,'2024-10-26 00:36:23.500401','2024-10-26 14:21:53.000000',0,1,NULL,1,1),(129,130,'/appManage/picture','图片管理',NULL,1,'ant-design:behance-square-outlined',255,'appManage/picture/index',0,1,1,'2024-10-26 00:37:21.590216','2024-10-26 14:21:46.000000',0,1,NULL,1,1),(130,NULL,'/appManage','移动端管理',NULL,0,'ep:iphone',255,NULL,1,1,1,'2024-10-26 13:27:37.757537','2024-10-26 14:05:34.000000',0,1,NULL,1,1),(131,132,NULL,'添加收藏','mini-app:favorites:add',2,'',255,NULL,1,1,1,'2024-10-26 13:29:13.234200','2024-10-26 13:30:16.000000',0,1,NULL,1,1),(132,136,'/mini-app/favorites','用户收藏',NULL,0,'',255,NULL,1,0,1,'2024-10-26 13:30:04.912091','2024-10-26 14:06:11.000000',0,1,NULL,1,1),(133,132,NULL,'取消收藏','mini-app:favorites:cancel',2,'',255,NULL,1,1,1,'2024-10-26 13:31:21.739793','2024-10-26 13:31:21.739793',0,1,NULL,1,NULL),(134,132,NULL,'查询收藏','mini-app:favorites:list',2,'',255,NULL,1,1,1,'2024-10-26 13:31:44.080330','2024-10-26 13:31:44.080330',0,1,NULL,1,NULL),(136,NULL,'/mini-app','移动端',NULL,0,'',255,NULL,1,0,1,'2024-10-26 14:05:57.633580','2024-10-26 14:06:03.000000',0,1,NULL,1,1),(137,130,'/appManage/banner','banner管理',NULL,1,'ant-design:aliyun-outlined',255,'appManage/banner/index',0,1,1,'2024-10-26 14:22:31.618967','2024-10-26 14:22:50.000000',0,1,NULL,1,1),(138,130,'/appManage/feedback','反馈管理',NULL,1,'ep:coffee',255,'appManage/feedback/index',0,1,1,'2024-10-26 22:49:59.657050','2024-10-26 22:50:12.000000',0,1,NULL,1,1),(139,130,'/appManage/pictureAudit','图片审核管理',NULL,1,'ant-design:clock-circle-filled',255,'appManage/pictureAudit/index',0,1,1,'2024-10-27 00:16:20.997976','2024-10-27 00:16:33.000000',0,1,NULL,1,1),(140,130,'/appManage/creatorAudit','创作者审核管理',NULL,1,'ant-design:codepen-square-filled',255,'appManage/creatorAudit/index',0,1,1,'2024-10-27 00:17:15.272272','2024-10-27 00:17:15.272272',0,1,NULL,1,NULL),(141,129,NULL,'图片上传','appManage:picture:upload',2,'',255,NULL,1,1,1,'2024-10-27 01:06:53.624558','2024-10-27 01:06:53.624558',0,1,NULL,1,NULL),(142,129,NULL,'图片更新','appManage:picture:update',2,'',255,NULL,1,1,1,'2024-10-27 01:07:08.679088','2024-10-27 01:07:08.679088',0,1,NULL,1,NULL),(143,129,NULL,'图片删除','appManage:picture:delete',2,'',255,NULL,1,1,1,'2024-10-27 01:07:29.210465','2024-10-27 01:07:29.210465',0,1,NULL,1,NULL),(145,129,NULL,'图片读取','appManage:picture:read',2,'',255,NULL,1,1,1,'2024-10-27 01:08:18.722764','2024-10-27 01:08:18.722764',0,1,NULL,1,NULL),(146,129,'appManage:picture:list','图片查询','appManage:picture:list',2,'',255,NULL,1,1,1,'2024-10-27 01:08:48.036859','2024-10-27 01:08:59.000000',0,1,NULL,1,1),(147,128,NULL,'分类查询','appManage:category:list',2,'',255,NULL,1,1,1,'2024-10-27 01:26:33.372568','2024-10-27 01:26:33.372568',0,1,NULL,1,NULL),(148,128,NULL,'分类树形','appManage:category:tree',2,'',255,NULL,1,1,1,'2024-10-27 01:26:55.807836','2024-10-27 01:27:25.000000',0,1,NULL,1,1);
/*!40000 ALTER TABLE `sys_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role`
--

DROP TABLE IF EXISTS `sys_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色标识',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `default` tinyint DEFAULT NULL,
  `create_by` int DEFAULT NULL COMMENT '创建者',
  `update_by` int DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_223de54d6badbe43a5490450c3` (`name`) USING BTREE,
  UNIQUE KEY `IDX_05edc0a51f41bb16b7d8137da9` (`value`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role`
--

LOCK TABLES `sys_role` WRITE;
/*!40000 ALTER TABLE `sys_role` DISABLE KEYS */;
INSERT INTO `sys_role` VALUES (1,'admin','管理员','超级管理员',1,'2023-11-10 00:31:44.058463','2024-10-26 14:24:03.000000',NULL,NULL,1),(2,'user','用户','',1,'2023-11-10 00:31:44.058463','2024-10-26 15:25:05.000000',1,NULL,1),(11,'creator','创建者',NULL,1,'2024-10-26 23:39:11.873267','2024-10-27 01:31:19.000000',NULL,NULL,1);
/*!40000 ALTER TABLE `sys_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_role_menus`
--

DROP TABLE IF EXISTS `sys_role_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_role_menus` (
  `role_id` int NOT NULL,
  `menu_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`menu_id`),
  KEY `IDX_35ce749b04d57e226d059e0f63` (`role_id`),
  KEY `IDX_2b95fdc95b329d66c18f5baed6` (`menu_id`),
  CONSTRAINT `FK_2b95fdc95b329d66c18f5baed6d` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_35ce749b04d57e226d059e0f633` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_role_menus`
--

LOCK TABLES `sys_role_menus` WRITE;
/*!40000 ALTER TABLE `sys_role_menus` DISABLE KEYS */;
INSERT INTO `sys_role_menus` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,14),(1,15),(1,20),(1,21),(1,22),(1,23),(1,24),(1,25),(1,26),(1,27),(1,28),(1,29),(1,30),(1,31),(1,32),(1,34),(1,35),(1,36),(1,37),(1,38),(1,39),(1,40),(1,41),(1,42),(1,43),(1,48),(1,49),(1,50),(1,51),(1,52),(1,53),(1,54),(1,56),(1,57),(1,58),(1,59),(1,60),(1,61),(1,62),(1,63),(1,64),(1,65),(1,68),(1,69),(1,70),(1,86),(1,87),(1,88),(1,89),(1,92),(1,107),(1,108),(1,109),(1,110),(1,111),(1,115),(1,116),(1,117),(1,118),(1,119),(1,120),(1,121),(1,122),(1,123),(1,124),(1,125),(1,126),(1,127),(1,128),(1,129),(1,130),(1,131),(1,132),(1,133),(1,134),(1,136),(1,137),(2,131),(2,132),(2,133),(2,134),(2,136),(11,128),(11,129),(11,130),(11,131),(11,132),(11,133),(11,134),(11,136),(11,141),(11,143),(11,146),(11,147),(11,148);
/*!40000 ALTER TABLE `sys_role_menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_task`
--

DROP TABLE IF EXISTS `sys_task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `service` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` tinyint NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1',
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `limit` int DEFAULT '0',
  `cron` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `every` int DEFAULT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `job_opts` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_ef8e5ab5ef2fe0ddb1428439ef` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_task`
--

LOCK TABLES `sys_task` WRITE;
/*!40000 ALTER TABLE `sys_task` DISABLE KEYS */;
INSERT INTO `sys_task` VALUES (2,'定时清空登录日志','LogClearJob.clearLoginLog',0,1,NULL,NULL,0,'0 0 3 ? * 1',0,'','{\"count\":1,\"key\":\"__default__:2:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":2}','定时清空登录日志','2023-11-10 00:31:44.197779','2024-10-27 23:58:40.000000'),(3,'定时清空任务日志','LogClearJob.clearTaskLog',0,0,NULL,NULL,0,'0 0 3 ? * 1',0,'','{\"count\":1,\"key\":\"__default__:3:::0 0 3 ? * 1\",\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}','定时清空任务日志','2023-11-10 00:31:44.197779','2024-10-26 14:07:30.000000'),(4,'访问百度首页','HttpRequestJob.handle',0,0,NULL,NULL,1,'* * * * * ?',NULL,'{\"url\":\"https://www.baidu.com\",\"method\":\"get\"}',NULL,'访问百度首页','2023-11-10 00:31:44.197779','2023-11-10 00:31:44.206935'),(5,'发送邮箱','EmailJob.send',0,0,NULL,NULL,-1,'0 0 0 1 * ?',NULL,'{\"subject\":\"这是标题\",\"to\":\"zeyu57@163.com\",\"content\":\"这是正文\"}',NULL,'每月发送邮箱','2023-11-10 00:31:44.197779','2023-11-10 00:31:44.206935');
/*!40000 ALTER TABLE `sys_task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_task_log`
--

DROP TABLE IF EXISTS `sys_task_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_task_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `consume_time` int DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_f4d9c36052fdb188ff5c089454b` (`task_id`),
  CONSTRAINT `FK_f4d9c36052fdb188ff5c089454b` FOREIGN KEY (`task_id`) REFERENCES `sys_task` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_task_log`
--

LOCK TABLES `sys_task_log` WRITE;
/*!40000 ALTER TABLE `sys_task_log` DISABLE KEYS */;
INSERT INTO `sys_task_log` VALUES (1,3,1,NULL,0,'2024-02-05 03:06:22.037448','2024-02-05 03:06:22.037448'),(2,2,1,NULL,0,'2024-02-10 09:42:21.738712','2024-02-10 09:42:21.738712');
/*!40000 ALTER TABLE `sys_task_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `psalt` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dept_id` int DEFAULT NULL,
  `wechatOpenId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `douyinOpenId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatarId` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`) USING BTREE,
  UNIQUE KEY `IDX_04f0dbf5e1812d43732b927209` (`wechatOpenId`),
  UNIQUE KEY `IDX_412904159d3cd6032e5d4531b5` (`douyinOpenId`),
  UNIQUE KEY `REL_a232e3c484cdcf67a0640d3e69` (`avatarId`),
  KEY `FK_96bde34263e2ae3b46f011124ac` (`dept_id`),
  CONSTRAINT `FK_96bde34263e2ae3b46f011124ac` FOREIGN KEY (`dept_id`) REFERENCES `sys_dept` (`id`),
  CONSTRAINT `FK_a232e3c484cdcf67a0640d3e692` FOREIGN KEY (`avatarId`) REFERENCES `tool_storage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user`
--

LOCK TABLES `sys_user` WRITE;
/*!40000 ALTER TABLE `sys_user` DISABLE KEYS */;
INSERT INTO `sys_user` VALUES (1,'admin','a11571e778ee85e82caae2d980952546','1743369777@qq.com','10086','管理员','xQYCspvFb8cAW6GG1pOoUGTLqsuUSO3d',1,'1743369777','2023-11-10 00:31:44.104382','2024-10-27 02:34:51.000000','bqy',1,NULL,NULL,NULL),(2,'user','dbd89546dec743f82bb9073d6ac39361','luffy@qq.com','10010','王路飞','qlovDV7pL5dPYPI3QgFFo1HH74nP6sJe',1,'1743369777','2023-11-10 00:31:44.104382','2024-01-29 09:49:57.000000','luffy',8,NULL,NULL,NULL),(8,'developer','f03fa2a99595127b9a39587421d471f6','nami@qq.com','10000','小贼猫','NbGM1z9Vhgo7f4dd2I7JGaGP12RidZdE',1,'1743369777','2023-11-10 00:31:44.104382','2024-02-03 21:41:18.000000','娜美',7,NULL,NULL,NULL),(27,'xinkai','fa55c22189fc5a53152f5fd16d0d1353','1174307481@qq.com','15819065440',NULL,NULL,1,NULL,'2024-10-26 15:22:59.872514','2024-10-27 11:45:32.228662','信凯',8,'o8Bo_5H3ZdbtSZNHhkAIpeWZAl90',NULL,89),(29,'user00','e8ed3c5c5cacb82e35f1dad17a73b6c8',NULL,NULL,NULL,'CAmqS11pcWZeBfDGPw5j3nuwlL_QLWFx',1,NULL,'2024-10-27 11:46:48.905896','2024-10-27 11:46:48.905896',NULL,8,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sys_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_user_roles`
--

DROP TABLE IF EXISTS `sys_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_96311d970191a044ec048011f4` (`user_id`),
  KEY `IDX_6d61c5b3f76a3419d93a421669` (`role_id`),
  CONSTRAINT `FK_6d61c5b3f76a3419d93a4216695` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`),
  CONSTRAINT `FK_96311d970191a044ec048011f44` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_user_roles`
--

LOCK TABLES `sys_user_roles` WRITE;
/*!40000 ALTER TABLE `sys_user_roles` DISABLE KEYS */;
INSERT INTO `sys_user_roles` VALUES (1,1),(2,2),(8,2),(27,2),(27,11),(29,2);
/*!40000 ALTER TABLE `sys_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo`
--

DROP TABLE IF EXISTS `todo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_9cb7989853c4cb7fe427db4b260` (`user_id`),
  CONSTRAINT `FK_9cb7989853c4cb7fe427db4b260` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo`
--

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;
INSERT INTO `todo` VALUES (1,'nest.js',NULL,0,'2023-11-10 00:31:44.139730','2023-11-10 00:31:44.147629');
/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tool_storage`
--

DROP TABLE IF EXISTS `tool_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tool_storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文件名',
  `fileName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实文件名',
  `ext_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `objectName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_651879e6bcfe06a049d4a4e3f05` (`user_id`),
  CONSTRAINT `FK_651879e6bcfe06a049d4a4e3f05` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tool_storage`
--

LOCK TABLES `tool_storage` WRITE;
/*!40000 ALTER TABLE `tool_storage` DISABLE KEYS */;
INSERT INTO `tool_storage` VALUES (78,'2024-02-03 21:41:16.851178','2024-02-03 21:41:16.851178','cfd0d14459bc1a47-202402032141838.jpeg','cfd0d14459bc1a47.jpeg','jpeg','/upload/cfd0d14459bc1a47-202402032141838.jpeg','图片','33.92 KB',1,''),(79,'2024-10-26 14:53:49.390582','2024-10-26 14:53:49.390582','1318047-202410261453268.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/0_ccz7TcI8M4A-pYSyXgv.jpg','图片','62.68 KB',1,'0_ccz7TcI8M4A-pYSyXgv.jpg'),(80,'2024-10-26 14:57:22.544721','2024-10-26 14:57:22.544721','1318047-202410261457490.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/zfLMWPGiIgBIkvCTYlbKp.jpg','图片','79.86 KB',1,'zfLMWPGiIgBIkvCTYlbKp.jpg'),(81,'2024-10-26 14:57:37.713732','2024-10-26 14:57:37.713732','1318047-202410261457655.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/oFR-71Uf95den2-YIXrJU.jpg','图片','79.86 KB',1,'oFR-71Uf95den2-YIXrJU.jpg'),(82,'2024-10-26 14:57:51.727777','2024-10-26 14:57:51.727777','1111-202410261457673.png','1111.png','png','http://localhost:9000/wallpaper/pFaGoFCa61eElg9N-s8oM.png','图片','62.69 KB',1,'pFaGoFCa61eElg9N-s8oM.png'),(83,'2024-10-26 15:27:13.330688','2024-10-26 15:27:13.330688','123-202410261527291.webp','123.png.webp','webp','http://localhost:9000/wallpaper/lQMdHMlPf0.webp','其他','10.51 KB',1,'lQMdHMlPf0.webp'),(84,'2024-10-26 21:08:06.354834','2024-10-26 21:08:06.354834','1318047-202410262108221.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/Opg9TK30VJ.jpg','图片','79.86 KB',1,'Opg9TK30VJ.jpg'),(85,'2024-10-26 21:11:13.762020','2024-10-26 21:11:13.762020','1318047-202410262111634.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/GhxanVRB8R.jpg','图片','79.86 KB',1,'GhxanVRB8R.jpg'),(86,'2024-10-26 21:32:26.797066','2024-10-26 21:32:26.797066','123-202410262132753.webp','123.png.webp','webp','http://localhost:9000/wallpaper/qxF7lafq_6.webp','其他','10.51 KB',1,'qxF7lafq_6.webp'),(87,'2024-10-26 21:35:30.873193','2024-10-26 21:35:30.873193','1318047-202410262135746.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/bv1NrhokrY.jpg','图片','47.84 KB',1,'bv1NrhokrY.jpg'),(88,'2024-10-26 22:09:33.821351','2024-10-26 22:09:33.821351','123-202410262209774.webp','123.png.webp','webp','http://localhost:9000/wallpaper/7KaraDUyE7.webp','其他','10.51 KB',1,'7KaraDUyE7.webp'),(89,'2024-10-26 22:26:01.229377','2024-10-26 22:26:01.229377','123-202410262226183.webp','123.png.webp','webp','http://localhost:9000/wallpaper/Xr3ki7_Mcw.webp','其他','10.51 KB',1,'Xr3ki7_Mcw.webp'),(90,'2024-10-26 22:38:36.195201','2024-10-26 22:38:36.195201','123-202410262238158.webp','123.png.webp','webp','http://localhost:9000/wallpaper/Nhopc8nA3A.webp','其他','10.51 KB',1,'Nhopc8nA3A.webp'),(91,'2024-10-26 22:53:57.281602','2024-10-26 22:53:57.281602','中文安装方法-202410262253175.png','中文安装方法.png','png','http://localhost:9000/wallpaper/gPSCZSDTlw.png','图片','64 KB',1,'gPSCZSDTlw.png'),(92,'2024-10-26 23:05:45.081999','2024-10-26 23:05:45.081999','中文安装方法-202410262305028.png','中文安装方法.png','png','http://localhost:9000/wallpaper/PUBMX1bHVp.png','图片','63.29 KB',1,'PUBMX1bHVp.png'),(93,'2024-10-26 23:26:48.120265','2024-10-26 23:26:48.120265','123-202410262326065.webp','123.png.webp','webp','http://localhost:9000/wallpaper/as2WnppVTE.webp','其他','10.51 KB',1,'as2WnppVTE.webp'),(94,'2024-10-27 01:42:17.673815','2024-10-27 01:42:17.673815','1318047-202410270142593.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/17F2tEW9X_.jpg','图片','62.82 KB',27,'17F2tEW9X_.jpg'),(95,'2024-10-27 01:44:13.200114','2024-10-27 01:44:13.200114','1318047-202410270144130.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/1SPpe6Fe9k.jpg','图片','62.82 KB',27,'1SPpe6Fe9k.jpg'),(96,'2024-10-27 01:53:49.555221','2024-10-27 01:53:49.555221','1318047-202410270153449.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/bgODg2ytfn.jpg','图片','79.86 KB',27,'bgODg2ytfn.jpg'),(97,'2024-10-27 02:14:32.251939','2024-10-27 02:14:32.251939','123-202410270214197.webp','123.png.webp','webp','http://localhost:9000/wallpaper/Trexkc9nDy.webp','其他','10.51 KB',27,'Trexkc9nDy.webp'),(98,'2024-10-27 02:14:32.265189','2024-10-27 02:14:32.265189','1111-202410270214203.png','1111.png','png','http://localhost:9000/wallpaper/Y2UrbqREj6.png','图片','62.83 KB',27,'Y2UrbqREj6.png'),(103,'2024-10-27 12:51:46.112008','2024-10-27 12:51:46.112008','123-202410271251037.webp','123.png.webp','webp','http://localhost:9000/wallpaper/AbJFn2qG2U.webp','其他','10.51 KB',NULL,'AbJFn2qG2U.webp'),(104,'2024-10-27 12:51:46.143563','2024-10-27 12:51:46.143563','7d5229fe784a4bf7b322aa6e34b95c98~tplv-p14lwwcsbr-7-202410271251043.jpg','7d5229fe784a4bf7b322aa6e34b95c98~tplv-p14lwwcsbr-7.jpg','jpg','http://localhost:9000/wallpaper/jVFWua2nWI.jpg','图片','62.77 KB',NULL,'jVFWua2nWI.jpg'),(105,'2024-10-27 12:57:02.484769','2024-10-27 12:57:02.484769','bf22cc4a31f237bdd911c163c75cf8e4-202410271257387.jpg','bf22cc4a31f237bdd911c163c75cf8e4.jpg','jpg','http://localhost:9000/wallpaper/lrKjY4HmTc.jpg','图片','22.65 KB',1,'lrKjY4HmTc.jpg'),(106,'2024-10-27 12:57:21.000914','2024-10-27 12:57:21.000914','123-202410271257946.webp','123.png.webp','webp','http://localhost:9000/wallpaper/xo1i-Kphvr.webp','其他','10.51 KB',27,'xo1i-Kphvr.webp'),(107,'2024-10-27 12:57:21.042131','2024-10-27 12:57:21.042131','7d5229fe784a4bf7b322aa6e34b95c98~tplv-p14lwwcsbr-7-202410271257951.jpg','7d5229fe784a4bf7b322aa6e34b95c98~tplv-p14lwwcsbr-7.jpg','jpg','http://localhost:9000/wallpaper/LGvSwOvbiC.jpg','图片','62.77 KB',27,'LGvSwOvbiC.jpg'),(108,'2024-10-27 15:34:35.337466','2024-10-27 15:34:35.337466','7d5229fe784a4bf7b322aa6e34b95c98~tplv-p14lwwcsbr-7-202410271534205.jpg','7d5229fe784a4bf7b322aa6e34b95c98~tplv-p14lwwcsbr-7.jpg','jpg','http://localhost:9000/wallpaper/G0pr8-R4aI.jpg','图片','79.81 KB',1,'G0pr8-R4aI.jpg'),(109,'2024-10-27 15:34:35.342276','2024-10-27 15:34:35.342276','1111-202410271534214.png','1111.png','png','http://localhost:9000/wallpaper/AUEdjXR0hy.png','图片','62.63 KB',1,'AUEdjXR0hy.png'),(110,'2024-10-27 15:48:10.129202','2024-10-27 15:48:10.129202','微信图片_20241027154713-202410271548926.jpg','微信图片_20241027154713.jpg','jpg','http://localhost:9000/wallpaper/b5TNdOOgfd.jpg','图片','63.88 KB',1,'b5TNdOOgfd.jpg'),(111,'2024-10-27 15:48:10.143394','2024-10-27 15:48:10.143394','微信图片_20241027154721-202410271548953.jpg','微信图片_20241027154721.jpg','jpg','http://localhost:9000/wallpaper/lxjCkJtu0Y.jpg','图片','62.61 KB',1,'lxjCkJtu0Y.jpg'),(112,'2024-10-27 15:48:10.169284','2024-10-27 15:48:10.169284','微信图片_20241027154729-202410271548957.jpg','微信图片_20241027154729.jpg','jpg','http://localhost:9000/wallpaper/pDLPBAsPpN.jpg','图片','62.61 KB',1,'pDLPBAsPpN.jpg'),(113,'2024-10-27 15:48:10.189243','2024-10-27 15:48:10.189243','微信图片_20241027154726-202410271548954.jpg','微信图片_20241027154726.jpg','jpg','http://localhost:9000/wallpaper/buzJfKvvcw.jpg','图片','62.61 KB',1,'buzJfKvvcw.jpg'),(114,'2024-10-27 15:48:10.191000','2024-10-27 15:48:10.191000','微信图片_20241027154710-202410271548923.jpg','微信图片_20241027154710.jpg','jpg','http://localhost:9000/wallpaper/3GtX2yrf25.jpg','图片','15.84 KB',1,'3GtX2yrf25.jpg'),(115,'2024-10-27 15:48:10.214946','2024-10-27 15:48:10.214946','微信图片_20241027154740-202410271548963.jpg','微信图片_20241027154740.jpg','jpg','http://localhost:9000/wallpaper/em4e9hrSiv.jpg','图片','62.61 KB',1,'em4e9hrSiv.jpg'),(116,'2024-10-27 15:48:10.218313','2024-10-27 15:48:10.218313','微信图片_20241027154738-202410271548965.jpg','微信图片_20241027154738.jpg','jpg','http://localhost:9000/wallpaper/6deUlXly44.jpg','图片','62.61 KB',1,'6deUlXly44.jpg'),(117,'2024-10-27 15:48:10.220784','2024-10-27 15:48:10.220784','微信图片_20241027154736-202410271548961.jpg','微信图片_20241027154736.jpg','jpg','http://localhost:9000/wallpaper/_OAz5G2ii7.jpg','图片','62.61 KB',1,'_OAz5G2ii7.jpg'),(118,'2024-10-27 15:48:10.231385','2024-10-27 15:48:10.231385','微信图片_20241027154734-202410271548959.jpg','微信图片_20241027154734.jpg','jpg','http://localhost:9000/wallpaper/8lfO18CTOT.jpg','图片','62.61 KB',1,'8lfO18CTOT.jpg'),(119,'2024-10-27 15:48:10.246694','2024-10-27 15:48:10.246694','微信图片_20241027154743-202410271548967.jpg','微信图片_20241027154743.jpg','jpg','http://localhost:9000/wallpaper/m3QbZ6U5e9.jpg','图片','62.61 KB',1,'m3QbZ6U5e9.jpg'),(120,'2024-10-27 15:48:10.247676','2024-10-27 15:48:10.247676','微信图片_20241027154650-202410271548913.jpg','微信图片_20241027154650.jpg','jpg','http://localhost:9000/wallpaper/QnBUUfDcWD.jpg','图片','47.82 KB',1,'QnBUUfDcWD.jpg'),(121,'2024-10-27 15:48:10.249258','2024-10-27 15:48:10.249258','微信图片_20241027154707-202410271548916.jpg','微信图片_20241027154707.jpg','jpg','http://localhost:9000/wallpaper/CSE4kIfHb3.jpg','图片','31.83 KB',1,'CSE4kIfHb3.jpg'),(122,'2024-10-27 15:48:10.255672','2024-10-27 15:48:10.255672','微信图片_20241027154731-202410271548962.jpg','微信图片_20241027154731.jpg','jpg','http://localhost:9000/wallpaper/gFABMxJOdK.jpg','图片','62.61 KB',1,'gFABMxJOdK.jpg'),(123,'2024-10-27 18:06:04.868981','2024-10-27 18:06:04.868981','微信图片_20241027154721-202410271806747.jpg','微信图片_20241027154721.jpg','jpg','http://localhost:9000/wallpaper/YYWiOYQsz_.jpg','图片','79.84 KB',1,'YYWiOYQsz_.jpg'),(124,'2024-10-27 18:19:17.124095','2024-10-27 18:19:17.124095','微信图片_20241027154734-202410271819042.jpg','微信图片_20241027154734.jpg','jpg','http://localhost:9000/wallpaper/I5XpF0COb9.jpg','图片','62.64 KB',1,'I5XpF0COb9.jpg'),(125,'2024-10-27 18:28:15.100588','2024-10-27 18:28:15.100588','微信图片_20241027154743-202410271828019.jpg','微信图片_20241027154743.jpg','jpg','http://localhost:9000/wallpaper/lexnckgGOq.jpg','图片','62.64 KB',1,'lexnckgGOq.jpg'),(126,'2024-10-27 18:41:18.681819','2024-10-27 18:41:18.681819','微信图片_20241027154726-202410271841609.jpg','微信图片_20241027154726.jpg','jpg','http://localhost:9000/wallpaper/a7EmW1FIJU.jpg','图片','821.35 KB',1,'a7EmW1FIJU.jpg'),(127,'2024-10-27 18:44:56.542660','2024-10-27 18:44:56.542660','微信图片_20241027154743-202410271844470.jpg','微信图片_20241027154743.jpg','jpg','http://localhost:9000/wallpaper/nbFArG-piP.jpg','图片','1.59 MB',1,'nbFArG-piP.jpg'),(128,'2024-10-27 18:47:28.357808','2024-10-27 18:47:28.357808','微信图片_20241027154740-202410271847235.jpg','微信图片_20241027154740.jpg','jpg','http://localhost:9000/wallpaper/oe9KPZQDiR.jpg','图片','929.48 KB',1,'oe9KPZQDiR.jpg'),(129,'2024-10-27 18:48:14.338128','2024-10-27 18:48:14.338128','微信图片_20241027154726-202410271848269.jpg','微信图片_20241027154726.jpg','jpg','http://localhost:9000/wallpaper/6gxZOJZGyi.jpg','图片','821.35 KB',1,'6gxZOJZGyi.jpg'),(130,'2024-10-27 18:48:58.273491','2024-10-27 18:48:58.273491','微信图片_20241027154729-202410271848140.jpg','微信图片_20241027154729.jpg','jpg','http://localhost:9000/wallpaper/S1AnWijqOx.jpg','图片','671.53 KB',1,'S1AnWijqOx.jpg'),(131,'2024-10-27 18:50:36.825455','2024-10-27 18:50:36.825455','微信图片_20241027154743-202410271850680.jpg','微信图片_20241027154743.jpg','jpg','http://localhost:9000/wallpaper/JnjBib8H0M.jpg','图片','1.59 MB',1,'JnjBib8H0M.jpg'),(132,'2024-10-27 20:58:40.409410','2024-10-27 20:58:40.409410','1318047-202410272058327.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/dT6qr-h4lJ.jpg','图片','884.36 KB',1,'dT6qr-h4lJ.jpg'),(133,'2024-10-27 21:00:08.644169','2024-10-27 21:00:08.644169','1318047-202410272100581.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/oM1QByfDqp.jpg','图片','884.36 KB',1,'oM1QByfDqp.jpg'),(134,'2024-10-27 21:02:17.817845','2024-10-27 21:02:17.817845','1318047-202410272102769.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/Tu7x9sSXdo.jpg','图片','884.36 KB',1,'Tu7x9sSXdo.jpg'),(135,'2024-10-27 21:02:44.682596','2024-10-27 21:02:44.682596','123-202410272102646.webp','123.png.webp','webp','http://localhost:9000/wallpaper/4rCYzzRkzk.webp','其他','10.51 KB',1,'4rCYzzRkzk.webp'),(136,'2024-10-27 21:25:40.902068','2024-10-27 21:25:40.902068','123-202410272125858.webp','123.png.webp','webp','http://localhost:9000/wallpaper/pRKQfTEsWl.webp','其他','10.51 KB',1,'pRKQfTEsWl.webp'),(137,'2024-10-27 22:31:34.794554','2024-10-27 22:31:34.794554','微信图片_20240410234510-202410272231696.jpg','微信图片_20240410234510.jpg','jpg','http://localhost:9000/wallpaper/MpEj-xq8-d.jpg','图片','38.93 KB',1,'MpEj-xq8-d.jpg'),(138,'2024-10-27 22:32:18.246533','2024-10-27 22:32:18.246533','20240817103619485304-202410272232212.jpg','20240817103619485304.jpg','jpg','http://localhost:9000/wallpaper/LpkO_13ESj.jpg','图片','84.19 KB',1,'LpkO_13ESj.jpg'),(139,'2024-10-27 22:32:34.337596','2024-10-27 22:32:34.337596','20210721151910774082-202410272232285.jpg','20210721151910774082.jpg','jpg','http://localhost:9000/wallpaper/VgNnu-k3Gm.jpg','图片','792.74 KB',1,'VgNnu-k3Gm.jpg'),(140,'2024-10-27 22:32:51.713606','2024-10-27 22:32:51.713606','20201113144731475823-202410272232652.jpg','20201113144731475823.jpg','jpg','http://localhost:9000/wallpaper/naRsHIr3cR.jpg','图片','2 MB',1,'naRsHIr3cR.jpg'),(141,'2024-10-27 22:33:29.648641','2024-10-27 22:33:29.648641','20240719113933908885-202410272233576.jpg','20240719113933908885.jpg','jpg','http://localhost:9000/wallpaper/iA4FER1BYT.jpg','图片','1.14 MB',1,'iA4FER1BYT.jpg'),(142,'2024-10-27 22:33:48.934091','2024-10-27 22:33:48.934091','1318045-202410272233874.jpg','1318045.jpg','jpg','http://localhost:9000/wallpaper/2AlN6Quu1X.jpg','图片','1.11 MB',1,'2AlN6Quu1X.jpg'),(143,'2024-10-27 22:34:08.935786','2024-10-27 22:34:08.935786','bf22cc4a31f237bdd911c163c75cf8e4-202410272234902.jpg','bf22cc4a31f237bdd911c163c75cf8e4.jpg','jpg','http://localhost:9000/wallpaper/ztJDoKr2Mt.jpg','图片','22.65 KB',1,'ztJDoKr2Mt.jpg'),(144,'2024-10-27 23:03:29.406891','2024-10-27 23:03:29.406891','123-202410272303360.webp','123.png.webp','webp','http://localhost:9000/wallpaper/ux-z7_vxkg.webp','其他','10.51 KB',1,'ux-z7_vxkg.webp'),(145,'2024-10-27 23:03:52.127977','2024-10-27 23:03:52.127977','20240116171309331694-202410272303087.jpg','20240116171309331694.jpg','jpg','http://localhost:9000/wallpaper/a72QKv1EYB.jpg','图片','396.3 KB',1,'a72QKv1EYB.jpg'),(146,'2024-10-27 23:04:07.949155','2024-10-27 23:04:07.949155','20210830180145947366-202410272304903.jpg','20210830180145947366.jpg','jpg','http://localhost:9000/wallpaper/Y1s_cDhm26.jpg','图片','205.22 KB',1,'Y1s_cDhm26.jpg'),(147,'2024-10-27 23:04:15.949533','2024-10-27 23:04:15.949533','20240817103619485304-202410272304918.jpg','20240817103619485304.jpg','jpg','http://localhost:9000/wallpaper/TpToVFbFve.jpg','图片','84.19 KB',1,'TpToVFbFve.jpg'),(148,'2024-10-27 23:04:32.133019','2024-10-27 23:04:32.133019','20200904141301580361-202410272304088.jpg','20200904141301580361.jpg','jpg','http://localhost:9000/wallpaper/erg6pbvF26.jpg','图片','418.78 KB',1,'erg6pbvF26.jpg'),(149,'2024-10-27 23:04:49.735914','2024-10-27 23:04:49.735914','20211230173205654391-202410272304689.jpg','20211230173205654391.jpg','jpg','http://localhost:9000/wallpaper/VnRYzB6d5I.jpg','图片','380.58 KB',1,'VnRYzB6d5I.jpg'),(150,'2024-10-27 23:05:14.406731','2024-10-27 23:05:14.406731','20200618184103420188-202410272305342.jpg','20200618184103420188.jpg','jpg','http://localhost:9000/wallpaper/CNsrKVJRMb.jpg','图片','90.44 KB',1,'CNsrKVJRMb.jpg'),(151,'2024-10-27 23:05:14.417112','2024-10-27 23:05:14.417112','20200904141301580361-202410272305343.jpg','20200904141301580361.jpg','jpg','http://localhost:9000/wallpaper/RQn3D5cz9X.jpg','图片','418.78 KB',1,'RQn3D5cz9X.jpg'),(152,'2024-10-27 23:05:14.418663','2024-10-27 23:05:14.418663','20190828144302875400-202410272305346.jpg','20190828144302875400.jpg','jpg','http://localhost:9000/wallpaper/oRvvNcjmY5.jpg','图片','451.12 KB',1,'oRvvNcjmY5.jpg'),(153,'2024-10-27 23:05:14.437175','2024-10-27 23:05:14.437175','20191017122708359438-202410272305354.jpg','20191017122708359438.jpg','jpg','http://localhost:9000/wallpaper/dDpsi60S2q.jpg','图片','629.57 KB',1,'dDpsi60S2q.jpg'),(154,'2024-10-27 23:05:28.532750','2024-10-27 23:05:28.532750','20240814144804395366-202410272305414.jpg','20240814144804395366.jpg','jpg','http://localhost:9000/wallpaper/PdqgFGSRL5.jpg','图片','3.25 MB',1,'PdqgFGSRL5.jpg'),(155,'2024-10-27 23:05:43.517125','2024-10-27 23:05:43.517125','20200618184103420188-202410272305448.jpg','20200618184103420188.jpg','jpg','http://localhost:9000/wallpaper/ZNub5UpoYE.jpg','图片','90.44 KB',1,'ZNub5UpoYE.jpg'),(156,'2024-10-27 23:05:43.523730','2024-10-27 23:05:43.523730','20210604103709284895-202410272305458.jpg','20210604103709284895.jpg','jpg','http://localhost:9000/wallpaper/SzHAwxprMI.jpg','图片','288.56 KB',1,'SzHAwxprMI.jpg'),(157,'2024-10-27 23:05:43.531332','2024-10-27 23:05:43.531332','20200904141301580361-202410272305462.jpg','20200904141301580361.jpg','jpg','http://localhost:9000/wallpaper/gp6UmAE-Xw.jpg','图片','418.78 KB',1,'gp6UmAE-Xw.jpg'),(158,'2024-10-27 23:05:43.552938','2024-10-27 23:05:43.552938','20210602184704843622-202410272305459.jpg','20210602184704843622.jpg','jpg','http://localhost:9000/wallpaper/Dr_iCFf5MR.jpg','图片','869.36 KB',1,'Dr_iCFf5MR.jpg'),(159,'2024-10-27 23:05:58.664907','2024-10-27 23:05:58.664907','1318045-202410272305604.jpg','1318045.jpg','jpg','http://localhost:9000/wallpaper/lDG1ZRIwGS.jpg','图片','1.11 MB',1,'lDG1ZRIwGS.jpg'),(160,'2024-10-27 23:05:58.665204','2024-10-27 23:05:58.665204','1318047-202410272305601.jpg','1318047.jpg','jpg','http://localhost:9000/wallpaper/1olv86EzrP.jpg','图片','884.36 KB',1,'1olv86EzrP.jpg'),(161,'2024-10-27 23:06:15.581090','2024-10-27 23:06:15.581090','微信图片_20241027154740-202410272306502.jpg','微信图片_20241027154740.jpg','jpg','http://localhost:9000/wallpaper/Qp687pWb5J.jpg','图片','929.48 KB',1,'Qp687pWb5J.jpg'),(162,'2024-10-27 23:06:15.581422','2024-10-27 23:06:15.581422','微信图片_20241027154738-202410272306508.jpg','微信图片_20241027154738.jpg','jpg','http://localhost:9000/wallpaper/TfxJB9WxQW.jpg','图片','1.13 MB',1,'TfxJB9WxQW.jpg'),(163,'2024-10-27 23:06:15.594968','2024-10-27 23:06:15.594968','微信图片_20241027154743-202410272306514.jpg','微信图片_20241027154743.jpg','jpg','http://localhost:9000/wallpaper/z17tIKt9Al.jpg','图片','1.59 MB',1,'z17tIKt9Al.jpg');
/*!40000 ALTER TABLE `tool_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_access_tokens`
--

DROP TABLE IF EXISTS `user_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_access_tokens` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_at` datetime NOT NULL COMMENT '令牌过期时间',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '令牌创建时间',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e9d9d0c303432e4e5e48c1c3e90` (`user_id`),
  CONSTRAINT `FK_e9d9d0c303432e4e5e48c1c3e90` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_access_tokens`
--

LOCK TABLES `user_access_tokens` WRITE;
/*!40000 ALTER TABLE `user_access_tokens` DISABLE KEYS */;
INSERT INTO `user_access_tokens` VALUES ('05439dd1-fdad-4943-8048-118c9dece152','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5NTk4ODUsImV4cCI6NDMyMTk1OTg4NX0.r4otwj_fTkw5ZDiHvg5eK82xW6YfVvC0fyNgJQtqEto','2106-12-17 00:24:45','2024-10-27 00:24:45.058102',1),('186ba742-c339-4e17-9498-b2b4374c6de3','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5MjM4NTYsImV4cCI6NDMyMTkyMzg1Nn0.pdr9VmRIaZsFswDQfbGDTG_NJIdSUJs56S_fS_v6lU4','2106-12-16 14:24:17','2024-10-26 14:24:16.904161',1),('22e6811b-e186-44ad-a069-c9c765a599dd','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI3LCJwdiI6MSwicm9sZXMiOlsidXNlciIsImNyZWF0b3IiXSwiaWF0IjoxNzMwMDAwOTIyLCJleHAiOjQzMjIwMDA5MjJ9.9m1TCI5OG8kBeVkD0I0jOc1IV1iTmEohBaw37cG3N5A','2106-12-17 11:48:42','2024-10-27 11:48:42.403353',27),('49e1fcb7-09c9-401d-99c4-cb228301935e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5MjI0MjksImV4cCI6NDMyMTkyMjQyOX0.2f44lqdb8Wqbb7_6U_HotOoLyyCxTU3lYvM5EtI6LLk','2106-12-16 14:00:29','2024-10-26 14:00:29.061760',1),('52bf949d-d23e-46f7-8ebd-3f0585a31996','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MzAwMDA2MzgsImV4cCI6NDMyMjAwMDYzOH0.UWW2T_jeA_aiqlajk7_vwP6z4AZxOpLZP8s5CtxdASM','2106-12-17 11:43:59','2024-10-27 11:43:58.816820',1),('5fd2429f-dc7c-4778-819b-82b84807eb77','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5NDk1MjQsImV4cCI6NDMyMTk0OTUyNH0.jw2qsB5Iiz_QPqujFaV8GvrXpJQYmKyM8Wd7rvO1Yys','2106-12-16 21:32:04','2024-10-26 21:32:04.302359',1),('723f5518-b7b0-416c-965a-58805a011e16','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MzAwMzg5MzQsImV4cCI6NDMyMjAzODkzNH0.11098mGlJTJ1ujML-W5JEIf-gM2WOMJJcVkTtHnsrm0','2106-12-17 22:22:15','2024-10-27 22:22:14.679734',1),('778bc604-e061-402b-853c-673eeb124018','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5NTcxMjQsImV4cCI6NDMyMTk1NzEyNH0.YLnP2Z5szJdi_kg_f0Rn9CYqEuwE0zmZYcFSv45eEO0','2106-12-16 23:38:45','2024-10-26 23:38:44.914055',1),('943efd20-f3e5-4db2-8413-562ac4e10dca','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5NTQyNTMsImV4cCI6NDMyMTk1NDI1M30.kkNWdLJj_Q05syKRAZ2J_sh2R-m8Z70o0vuCZz9dB3o','2106-12-16 22:50:53','2024-10-26 22:50:53.187135',1),('a07b88a5-396f-44f2-a99b-034400409197','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI3LCJwdiI6MSwicm9sZXMiOltdLCJpYXQiOjE3Mjk5MjczNzksImV4cCI6NDMyMTkyNzM3OX0.63gRfmIpGa00GuKhqAll4erdiNhFy8IXMb3wpdiaVNA','2106-12-16 15:23:00','2024-10-26 15:22:59.905598',27),('a4d78dd7-e7ad-49da-948e-c8fc189439e4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5MjAzNjQsImV4cCI6NDMyMTkyMDM2NH0.Jwye5iNUA23oGCbCG4XbnTonjagjcKOBl1_yOCXvCy4','2106-12-16 13:26:05','2024-10-26 13:26:04.772426',1),('abc7e262-2785-4928-ae4d-89e25c7ee845','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI3LCJwdiI6MSwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3Mjk5NjMyNDcsImV4cCI6NDMyMTk2MzI0N30.o_9GGnBZclDMs9gi5Qhz1dpd0m9iGEQcdywubU2o3JE','2106-12-17 01:20:47','2024-10-27 01:20:47.504251',27),('aef3acc7-d247-4cb7-bccf-dba8dde58351','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI3LCJwdiI6MSwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE3Mjk5Mjc0NDcsImV4cCI6NDMyMTkyNzQ0N30.r7krkVcFIF010d56xLoNtIweLWcDQWO2YgvsYqQMJH4','2106-12-16 15:24:08','2024-10-26 15:24:07.579826',27),('e1b91079-3174-4e1a-9264-017cecb2078e','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk5MjQ0MjAsImV4cCI6NDMyMTkyNDQyMH0.c7qtBnd8gReTRHQzqzXO19GshSWvEqunmRNlo_8ORTw','2106-12-16 14:33:41','2024-10-26 14:33:40.574668',1),('f1b07f9b-651d-41fc-8998-12cb609ec6fe','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3Mjk4NzM3NDgsImV4cCI6NDMyMTg3Mzc0OH0.yStQtbG_6wb-9hwJheG_FK_Rd_BPubGKweU8Ho4s-tA','2106-12-16 00:29:09','2024-10-26 00:29:08.941288',1),('f39dcee7-8311-456d-9309-8f6dfa04f5d1','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjI3LCJwdiI6MSwicm9sZXMiOlsidXNlciIsImNyZWF0b3IiXSwiaWF0IjoxNzMwMDAxMTYzLCJleHAiOjQzMjIwMDExNjN9.M9ZPAnB2YYWnF9kngOIdaOxYlEi_dyTj-lYlxaJgYa0','2106-12-17 11:52:44','2024-10-27 11:52:43.797120',27),('fdb1c457-a7ce-4e48-81d9-001c2df69b23','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJyb2xlcyI6WyJhZG1pbiJdLCJpYXQiOjE3MzAwMjYyMjUsImV4cCI6NDMyMjAyNjIyNX0.1BMnhNfiJ7gmMw0tIa3CalusEcjncnr4Y1kz3fl6n54','2106-12-17 18:50:26','2024-10-27 18:50:25.712702',1);
/*!40000 ALTER TABLE `user_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorite_pictures`
--

DROP TABLE IF EXISTS `user_favorite_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favorite_pictures` (
  `user_id` int NOT NULL,
  `picture_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`picture_id`),
  KEY `IDX_0812b66df9a4cb01ba3dde771d` (`user_id`),
  KEY `IDX_7caec1f592f88c6ff8df5de549` (`picture_id`),
  CONSTRAINT `FK_0812b66df9a4cb01ba3dde771d5` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_7caec1f592f88c6ff8df5de549e` FOREIGN KEY (`picture_id`) REFERENCES `app_picture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorite_pictures`
--

LOCK TABLES `user_favorite_pictures` WRITE;
/*!40000 ALTER TABLE `user_favorite_pictures` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorite_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_refresh_tokens`
--

DROP TABLE IF EXISTS `user_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_refresh_tokens` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_at` datetime NOT NULL COMMENT '令牌过期时间',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '令牌创建时间',
  `accessTokenId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_1dfd080c2abf42198691b60ae3` (`accessTokenId`),
  CONSTRAINT `FK_1dfd080c2abf42198691b60ae39` FOREIGN KEY (`accessTokenId`) REFERENCES `user_access_tokens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_refresh_tokens`
--

LOCK TABLES `user_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `user_refresh_tokens` DISABLE KEYS */;
INSERT INTO `user_refresh_tokens` VALUES ('060285a3-63c9-4e23-9157-05691ff8d4cc','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOGw3WmZkUEhub0g1M2NkblZxZG5pIiwiaWF0IjoxNzMwMDAwNjM4LCJleHAiOjQzMjIwMDA2Mzh9.iuLpCZW-zpe4FbziZvdZ2NWx4SG4JKP0SIiWGdGkQm4','2024-11-26 11:43:59','2024-10-27 11:43:58.828108','52bf949d-d23e-46f7-8ebd-3f0585a31996'),('0abe477b-ea1b-4e13-8cac-10ff730bc6b8','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiQ2FLMFU2ckZLZ2dQMGo4WFduZFpfIiwiaWF0IjoxNzMwMDM4OTM0LCJleHAiOjQzMjIwMzg5MzR9.AOmISPPjXsEBx69BlvNw_vUOT43IE26eg_u4TYM4xAw','2024-11-26 22:22:15','2024-10-27 22:22:14.700937','723f5518-b7b0-416c-965a-58805a011e16'),('19b375f1-e014-4a3a-b116-6fe5d2dc80a4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiWmw0UnhIYTJzTVpMUHhRWnhYTl9iIiwiaWF0IjoxNzI5OTU3MTI0LCJleHAiOjQzMjE5NTcxMjR9.SZessvuC0udElvFK4JqvhRJaNll5BXnVXjR4F0p6X_U','2024-11-25 23:38:45','2024-10-26 23:38:44.923163','778bc604-e061-402b-853c-673eeb124018'),('1a9e7424-8676-4a91-bfd7-9cc76f4862e8','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNU1LRmg2WFRBTVFmM29qeXcxX0syIiwiaWF0IjoxNzI5OTYzMjQ3LCJleHAiOjQzMjE5NjMyNDd9.0yCb2UyJMj5FzzxeLY5zHZ_Y96WAL3Y_HXlKRJCQoKo','2024-11-26 01:20:48','2024-10-27 01:20:47.518580','abc7e262-2785-4928-ae4d-89e25c7ee845'),('3e53c975-9826-4b2a-86fc-57797808d1eb','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiQkR2M3dBYjhwTHhLVlJ2ckpjQ0NiIiwiaWF0IjoxNzI5OTU0MjUzLCJleHAiOjQzMjE5NTQyNTN9.TK5icTkapVR5_ENaqbbvPylT9ZYFyUFfeaBNc2xpVrM','2024-11-25 22:50:53','2024-10-26 22:50:53.201161','943efd20-f3e5-4db2-8413-562ac4e10dca'),('431fdb57-a1a7-4ee6-aafb-972c0f665993','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiUU92aUZuQUFJWWN3SGxmQ3gyNVZTIiwiaWF0IjoxNzMwMDI2MjI1LCJleHAiOjQzMjIwMjYyMjV9.toj3JdHVKfotxpQLrw0yGDWlk-f2ZjQf38mYGV8NDxo','2024-11-26 18:50:26','2024-10-27 18:50:25.727280','fdb1c457-a7ce-4e48-81d9-001c2df69b23'),('4ccb9c14-5089-41aa-91fd-86e77d4c122c','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiaG1lQXNkOWJYdllzNDh2VjJfU3RnIiwiaWF0IjoxNzI5OTIzODU2LCJleHAiOjQzMjE5MjM4NTZ9.-c8GE_NqhXSRjF3ydHu5b_xbmkMjd3PButRAz2aSRSU','2024-11-25 14:24:17','2024-10-26 14:24:16.912455','186ba742-c339-4e17-9498-b2b4374c6de3'),('54436ad6-77c6-4e24-ba56-fd356fe133f1','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiN1JXMm0zLU9lNUtlSm0taklabGlqIiwiaWF0IjoxNzI5OTI3NDQ3LCJleHAiOjQzMjE5Mjc0NDd9.GgLvGicOaBCdxv-JKYObNLmI1W_2tIE7j9Vnf0Lm88o','2024-11-25 15:24:08','2024-10-26 15:24:07.589017','aef3acc7-d247-4cb7-bccf-dba8dde58351'),('57485e32-5614-4ed4-8291-20cf3e130c75','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiTGVvS2NBQ3pRTDB2ZG9NNlZYdExBIiwiaWF0IjoxNzI5OTI3Mzc5LCJleHAiOjQzMjE5MjczNzl9.PLxF_7mXy65JmOavOUxNXErUxO6TsBiGyPRUxEEpE_8','2024-11-25 15:23:00','2024-10-26 15:22:59.915283','a07b88a5-396f-44f2-a99b-034400409197'),('74697381-d96b-4e9e-babf-c8e459ff0822','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiUExhVV9USDdKSzhKZVFpeUxmNTR1IiwiaWF0IjoxNzI5OTI0NDIwLCJleHAiOjQzMjE5MjQ0MjB9._2E7OBlgZW_QR-GlA0k86QCsf_RndaOQ1-SVFp03ZSw','2024-11-25 14:33:41','2024-10-26 14:33:40.587467','e1b91079-3174-4e1a-9264-017cecb2078e'),('7d3a08f0-4858-4b1f-a5e4-cf972b0a960a','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNl9tT3pVQWl6TjZsSVVxWmFBVmUzIiwiaWF0IjoxNzI5OTU5ODg1LCJleHAiOjQzMjE5NTk4ODV9.DSzVJAt73WAdEhy83hbj1QvFTwPfqtDhRSx0d4OSggc','2024-11-26 00:24:45','2024-10-27 00:24:45.067131','05439dd1-fdad-4943-8048-118c9dece152'),('9b43c0a9-b464-4687-94e2-0a363e7692f4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNkNwVkRVeWp2V05pUURKUktUZC10IiwiaWF0IjoxNzI5OTIyNDI5LCJleHAiOjQzMjE5MjI0Mjl9.tQwxy0vDlha0yTkHV81Go_i2jXQjvk_jth0v2ERPamU','2024-11-25 14:00:29','2024-10-26 14:00:29.070614','49e1fcb7-09c9-401d-99c4-cb228301935e'),('b2af5116-4525-4ae8-b953-20a8eb83dc17','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiY3FKenFqMVhGd2ZvT2kycUk4dWstIiwiaWF0IjoxNzMwMDAxMTYzLCJleHAiOjQzMjIwMDExNjN9.P-pZ2iqydmhZLE-NY6cgw-xndyl_RzdteY5C6bTgvWQ','2024-11-26 11:52:44','2024-10-27 11:52:43.808738','f39dcee7-8311-456d-9309-8f6dfa04f5d1'),('b2fb58d6-036a-476a-8ac5-5b686a5aca47','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiQ0NJbUNTbHNFYnFYM1pkQ1BhMmdHIiwiaWF0IjoxNzMwMDAwOTIyLCJleHAiOjQzMjIwMDA5MjJ9.1b-juGipudZx7cn2A0XEu21O4mfXWuChNZO2s59_12g','2024-11-26 11:48:42','2024-10-27 11:48:42.415209','22e6811b-e186-44ad-a069-c9c765a599dd'),('f3970c4b-2a16-4088-a583-ade5316cf901','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiRkhEZDlVT0x2bGJXS1VjM21vekNxIiwiaWF0IjoxNzI5OTIwMzY0LCJleHAiOjQzMjE5MjAzNjR9.WhpJJViSLXQ0DpgBf6rVs7ntpla03cUKLXa9slHkSA8','2024-11-25 13:26:05','2024-10-26 13:26:04.786083','a4d78dd7-e7ad-49da-948e-c8fc189439e4'),('f599afc5-9fbd-4c02-9ef5-e94b90221610','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiN1ZVbmpyc1J0eWUyZWZWNWtUblpaIiwiaWF0IjoxNzI5OTQ5NTI0LCJleHAiOjQzMjE5NDk1MjR9.clXQ3clwSPnoRC-pUmUHOcMMWEHnPIdIrppYq_FLvq4','2024-11-25 21:32:04','2024-10-26 21:32:04.316691','5fd2429f-dc7c-4778-819b-82b84807eb77'),('fb2c3e0f-241e-4de0-aa6f-71b2d6897381','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiN2ZMSUVqNkZ2YjdoQ1RUQnRpRGNxIiwiaWF0IjoxNzI5ODczNzQ4LCJleHAiOjQzMjE4NzM3NDh9._SCX0KOrSoTczhR6VRO2oP2XQpk8bMyhty-Qjw-UveY','2024-11-25 00:29:09','2024-10-26 00:29:08.951385','f1b07f9b-651d-41fc-8998-12cb609ec6fe');
/*!40000 ALTER TABLE `user_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'wallpaper'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28  0:08:16
