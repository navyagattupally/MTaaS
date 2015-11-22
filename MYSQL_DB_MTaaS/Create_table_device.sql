CREATE TABLE `device` (
  `idDevice` varchar(45) NOT NULL,
  `DeviceName` varchar(45) DEFAULT NULL,
  `OSType` varchar(45) DEFAULT NULL,
  `Version` varchar(45) DEFAULT NULL,
  `RAM` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `idUser` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDevice`),
  KEY `idUser_idx` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;