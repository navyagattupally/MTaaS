CREATE TABLE `emulator` (
  `idEmulator` varchar(45) NOT NULL,
  `EmulatorName` varchar(45) DEFAULT NULL,
  `OSType` varchar(45) DEFAULT NULL,
  `Version` varchar(45) DEFAULT NULL,
  `RAM` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `HubID` varchar(45) DEFAULT NULL,
  `idUser` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEmulator`),
  KEY `HubID_idx` (`HubID`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;