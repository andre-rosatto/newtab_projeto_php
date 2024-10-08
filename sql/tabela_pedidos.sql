DROP TABLE IF EXISTS pedidos;

CREATE TABLE IF NOT EXISTS pedidos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_cliente INT UNSIGNED NOT NULL,
  id_produto INT UNSIGNED NOT NULL,
  dt_pedido DATE NOT NULL,
  quantidade INT NOT NULL,
  status_pedido ENUM('aberto','cancelado','pago') DEFAULT 'aberto',
  PRIMARY KEY (id),
  FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,
  FOREIGN KEY (id_produto) REFERENCES produtos(id) ON DELETE CASCADE
) ENGINE=INNODB;