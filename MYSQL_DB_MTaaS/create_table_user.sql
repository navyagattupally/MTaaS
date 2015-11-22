CREATE TABLE `user` (
  `idUser` varchar(45) NOT NULL,
  `UserLogin` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `DateOfBirth` datetime DEFAULT NULL,
  `ContactDetails` varchar(45) DEFAULT NULL,
  `UserType` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
