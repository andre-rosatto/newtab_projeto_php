<?php
include 'connect.php';

$pageSize = 20;
$table;

function getFilterParams($filter, $table) {
	$result = "WHERE $table.deleted_at IS NULL";
	if (strlen($filter) == 0) return $result;
	switch ($table) {
		case 'produtos':
			return $result . ' AND (id LIKE "%' . $filter . '%" OR nome LIKE "%' . $filter . '%" OR valor LIKE "%' . $filter . '%" OR cod_barras LIKE "%' . $filter . '%")';
		case 'pedidos':
			return $result . ' AND (pedidos.id LIKE "%' . $filter . '%" OR produtos.nome LIKE "%' . $filter . '%" OR quantidade LIKE "%' . $filter . '%" OR valor * quantidade LIKE "%' . $filter . '%" OR clientes.nome LIKE "%' . $filter . '%" OR dt_pedido LIKE "%' . $filter . '%" OR status_pedido LIKE "%' . $filter . '%")';
		default:
			return $result . ' AND (id LIKE "%' . $filter . '%" OR nome LIKE "%' . $filter . '%" OR cpf LIKE "%' . $filter . '%" OR email LIKE "%' . $filter . '%")';
	}
}

if (isset($_GET['tablesize'])) {
	// retorna a quantidade de itens na tabela
	$table = $_GET['tablesize'];
	$filter = $_GET['filter'];
	$filterParam = getFilterParams($filter, $table);
	if ($table === 'pedidos') {
		$sql = "SELECT COUNT(pedidos.id) FROM $table LEFT JOIN clientes ON pedidos.id_cliente = clientes.id LEFT JOIN produtos ON pedidos.id_produto = produtos.id $filterParam";
	} else {
		$sql = "SELECT COUNT(id) FROM $table $filterParam";
	}
	$statement = $conn->query($sql);
	echo $statement->fetchColumn();
} elseif (isset($_GET['tableinfo'])) {
	// retorna uma coluna da tabela
	$table = $_GET['tableinfo'];
	$id = $_GET['id'];
	if ($table === 'pedidos') {
		// retorna coluna da tabela produtos
		$sql = "
			SELECT
				pedidos.id,
				produtos.id AS id_produto,
				produtos.nome AS nome_produto,
				valor,
				cod_barras,
				quantidade,
				clientes.id AS id_cliente,
				clientes.nome AS nome_cliente,
				cpf,
				email,
				DATE_FORMAT(dt_pedido, '%Y-%m-%d') AS dt_pedido,
				status_pedido
			FROM $table
			LEFT JOIN clientes ON pedidos.id_cliente = clientes.id
			LEFT JOIN produtos ON pedidos.id_produto = produtos.id
			WHERE pedidos.id=$id";
	} elseif ($table === 'produtos') {
		// retorna coluna da tabela produtos
		$sql = "SELECT id, nome, valor, cod_barras FROM $table WHERE id=$id";
	} else {
		// retorna coluna da tabela clientes
		$sql = "SELECT id, nome, cpf, email FROM $table WHERE id=$id";
	}
	$statement = $conn->query($sql);
	$result = $statement->fetch(PDO::FETCH_ASSOC);
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
} elseif (isset($_GET['table'])) {
	// retorna os itens da tabela
	$table = $_GET['table']	;
	$filter = $_GET['filter'];
	$orderBy = $_GET['orderby'];
	$orderDirection = $_GET['orderdirection'];
	$offset = (int)$_GET['page'] * $pageSize;
	$filterParam = getFilterParams($filter, $table);

	if ($table === 'pedidos') {
		// retorna os itens da tabela pedidos
		$sql = "
			SELECT
				pedidos.id,
				id_produto,
				produtos.nome AS nome_produto,
				valor,
				quantidade,
				valor * quantidade AS total,
				id_cliente,
				clientes.nome AS nome_cliente,
				DATE_FORMAT(dt_pedido, '%Y/%m/%d') AS dt_pedido,
				status_pedido
			FROM $table
			LEFT JOIN clientes ON pedidos.id_cliente = clientes.id
			LEFT JOIN produtos ON pedidos.id_produto = produtos.id
			$filterParam ORDER BY $orderBy $orderDirection LIMIT $pageSize OFFSET $offset";
	} elseif ($table === 'produtos') {
		// retorna os itens da tabela produtos
		$sql = "SELECT id, nome, valor, cod_barras FROM $table $filterParam ORDER BY $orderBy $orderDirection LIMIT $pageSize OFFSET $offset";
	} else {
		// retorna os itens da tabela clientes
		$sql = "SELECT id, nome, cpf, email FROM $table $filterParam ORDER BY $orderBy $orderDirection LIMIT $pageSize OFFSET $offset";
	}
	$statement = $conn->query($sql);
	$result = $statement->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
} elseif (isset($_GET['item'])) {
	$table = $_GET['item'];
	$id = $_GET['id'];
	if ($_GET['item'] === 'produtos') {
		$sql = "SELECT id, nome, valor, cod_barras FROM $table WHERE id=$id AND deleted_at IS NULL";
	} else {
		$sql = "SELECT id, nome, cpf, email FROM $table WHERE id=$id AND deleted_at IS NULL";
	}
	$statement = $conn->query($sql);
	$result = $statement->fetch(PDO::FETCH_ASSOC);
	echo json_encode($result, JSON_UNESCAPED_UNICODE);
} elseif (isset($_GET['register'])) {
	$table=$_GET['register'];
	$sql = '';
	$name = $conn->quote($_GET['name']);
	if ($table === 'clientes') {
		$cpf = $_GET['cpf'];
		$email = $conn->quote($_GET['email']);
		$sql = "INSERT INTO clientes (nome, cpf, email) VALUES ($name, '$cpf', $email)";
	} elseif ($table === 'produtos') {
		$value = $_GET['value'];
		$barcode = $_GET['barcode'];
		$sql = "INSERT INTO produtos (nome, valor, cod_barras) VALUES ($name, $value, '$barcode')";
	}
	if ($sql) {
		$statement = $conn->prepare($sql);
		$statement->execute();
		$sql = "SELECT LAST_INSERT_ID() AS id";
		$statement = $conn->query($sql);
		$result = $statement->fetch(PDO::FETCH_ASSOC);
		echo json_encode($result, JSON_UNESCAPED_UNICODE);
	}
}

$conn = null;