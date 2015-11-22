CREATE TABLE `resource_registration` (
  `idresource_registration` varchar(45) NOT NULL,
  `idUser` varchar(45) DEFAULT NULL,
  `idDevice` varchar(45) DEFAULT NULL,
  `idEmulator` varchar(45) DEFAULT NULL,
  `idServer` varchar(45) DEFAULT NULL,
  `DurationofReservation` int(11) DEFAULT NULL,
  `StartTime` datetime DEFAULT NULL,
  `EndTime` datetime DEFAULT NULL,
  PRIMARY KEY (`idresource_registration`),
  KEY `idUser_idx` (`idUser`),
  KEY `idDevice_idx` (`idDevice`),
  KEY `idEmulator_idx` (`idEmulator`),
  KEY `idServer_idx` (`idServer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
