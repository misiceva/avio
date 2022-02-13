/*
SQLyog Community
MySQL - 10.4.20-MariaDB : Database - avio
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`avio` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `avio`;

/*Table structure for table `airplane` */

DROP TABLE IF EXISTS `airplane`;

CREATE TABLE `airplane` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `airplane` */

insert  into `airplane`(`id`,`model`,`capacity`) values 
(1,'ertfyjhtgrse',200);

/*Table structure for table `airport` */

DROP TABLE IF EXISTS `airport`;

CREATE TABLE `airport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*Data for the table `airport` */

insert  into `airport`(`id`,`name`,`location`) values 
(1,'J.F.K.','New York'),
(2,'Nikola tesla','Belgrade'),
(3,'Suvarnabhumi Airport','Bangkok'),
(4,'Cairo International Airport','Cairo'),
(5,'Shanghai Pudong International Airport','Shangai'),
(6,'George Bush Intercontinental Airport','Houston'),
(7,'Beijing Daxing International Airport','Beijing '),
(8,'Washington Dulles International Airport','Washington DC'),
(9,'Orlando International Airport','Orlando'),
(10,'Dallas Fort Worth International Airport','Dallas'),
(11,'Denver International Airport','Denver '),
(12,'Charles de Gaulle Airport','Paris');

/*Table structure for table `flight` */

DROP TABLE IF EXISTS `flight`;

CREATE TABLE `flight` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startTime` datetime NOT NULL,
  `duration` int(11) NOT NULL,
  `startId` int(11) DEFAULT NULL,
  `destinationId` int(11) DEFAULT NULL,
  `airplaneId` int(11) DEFAULT NULL,
  `seatCategories` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`seatCategories`)),
  PRIMARY KEY (`id`),
  KEY `startId` (`startId`),
  KEY `destinationId` (`destinationId`),
  KEY `airplaneId` (`airplaneId`),
  CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`startId`) REFERENCES `airport` (`id`),
  CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`destinationId`) REFERENCES `airport` (`id`),
  CONSTRAINT `flight_ibfk_3` FOREIGN KEY (`airplaneId`) REFERENCES `airplane` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `flight` */

insert  into `flight`(`id`,`startTime`,`duration`,`startId`,`destinationId`,`airplaneId`,`seatCategories`) values 
(3,'2022-02-14 09:46:00',45,1,2,1,'\"{\\\"a\\\":3,\\\"v\\\":2}\"'),
(4,'2022-02-23 09:46:26',567,8,9,1,'\"{\\\"dfg\\\":5,\\\"dsf\\\":5}\"'),
(5,'2022-02-16 14:35:04',4,4,5,1,'\"{\\\"economy\\\":300,\\\"economy plus\\\":400,\\\"bussines\\\":900}\"');

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1644313544502,'createUser1644313544502'),
(2,1644356908152,'createAirportTable1644356908152'),
(3,1644356993723,'createAirplaneTable1644356993723'),
(4,1644357245176,'createFlightTable1644357245176'),
(5,1644357386070,'createReservationTable1644357386070'),
(6,1644358704202,'addPlateToFlight1644358704202'),
(7,1644427512972,'changeReservationFkToCascade1644427512972'),
(8,1644619087652,'addEmailToUser1644619087652');

/*Table structure for table `reservation` */

DROP TABLE IF EXISTS `reservation`;

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seatCategory` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `flightId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `flightId` (`flightId`),
  KEY `userId` (`userId`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`flightId`) REFERENCES `flight` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `reservation` */

insert  into `reservation`(`id`,`seatCategory`,`price`,`flightId`,`userId`) values 
(2,'a',3,3,2),
(3,'v',2,3,2),
(4,'a',3,3,2),
(5,'v',2,3,2);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`admin`,`password`,`email`) values 
(1,'Lazar','Stojadinovic',1,'/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=','laxi2168@gmail.com'),
(2,'Stefan','Milosavljevic',0,'/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=','dusan@appcargo.com');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
