CREATE TABLE `server` (
  `idServer` varchar(45) NOT NULL,
  `IPAddress` varchar(45) DEFAULT NULL,
  `ImageName` varchar(45) DEFAULT NULL,
  `Location` varchar(45) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `DateCreated` datetime DEFAULT NULL,
  `Availability` varchar(45) DEFAULT NULL,
  `NoOfCPUs` varchar(45) DEFAULT NULL,
  `CPUsinUse` varchar(45) DEFAULT NULL,
  `RAM` varchar(45) DEFAULT NULL,
  `HubID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idServer`),
  KEY `HubID_idx` (`HubID`),
  CONSTRAINT `HubID` FOREIGN KEY (`HubID`) REFERENCES `hubs` (`HubID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;