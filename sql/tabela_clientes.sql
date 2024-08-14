DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes (
  id INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  cpf CHAR(11) NOT NULL,
  email VARCHAR(100) DEFAULT NULL,
  dt_exclusao DATE DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;