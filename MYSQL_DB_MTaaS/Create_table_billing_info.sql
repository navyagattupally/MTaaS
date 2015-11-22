CREATE TABLE `billing_info` (
  `idBilling_Info` varchar(45) NOT NULL,
  `Amount` varchar(45) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `date_of_payment` datetime DEFAULT NULL,
  PRIMARY KEY (`idBilling_Info`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
select * from requestsimulatorandbalancer.server;