CREATE TABLE `hubs` (
  `HubID` varchar(45) NOT NULL,
  `HubName` varchar(45) DEFAULT NULL,
  `IPAddress` varchar(45) DEFAULT NULL,
  `MaxDevices` int(11) DEFAULT NULL,
  `Availabiltiy` varchar(45) DEFAULT NULL,
  `AssignedServer` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`HubID`),
  KEY `idServer_idx` (`AssignedServer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;