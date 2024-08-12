<?php include 'templates/header.php'; ?>
<?php include 'templates/navbar.php'; ?>

<?php
	include 'config/connect.php';

	if (isset($_POST['order-action'])) {
		$id = $_POST['order-id'];
		$customerId = $_POST['order-customer-id'];
		$productId = $_POST['order-product-id'];
		$orderDate = $_POST['order-date'];
		$amount = $_POST['order-amount'];
		$orderStatus = $_POST['order-status'];
		$sql = '';
		if ($_POST['order-action'] === 'update') {
			$sql = "UPDATE pedidos SET id_produto=$productId, id_cliente=$customerId, dt_pedido='$orderDate', quantidade=$amount, status_pedido='$orderStatus' WHERE id=$id";
		} elseif ($_POST['order-action'] === 'new') {
			$sql = "INSERT INTO pedidos (id_cliente, id_produto, dt_pedido, quantidade, status_pedido) VALUES ($customerId, $productId, '$orderDate', $amount, '$orderStatus')";
		} elseif ($_POST['order-action'] === 'delete') {
			$sql = "UPDATE pedidos SET deleted_at=NOW() WHERE id=$id";
		}
		if ($sql) {
			$result = $conn->prepare($sql);
			// $result->execute();
			// header('Location: orders.php');
		}
		// echo "sql: $sql<br>";
		// echo "action: {$_POST['order-action']}; customer: $customerId; product: $productId; date: $orderDate; amount: $amount; status: $orderStatus <br>";
	}

	// $orderBy = 'dt_pedido';
	// $order = 'DESC';
	// $tableHeaders = ['ID', 'Produto', 'Valor Unid.', 'Quantidade', 'Total', 'Cliente', 'Data', 'Status', ''];
	// $orderOptions = [
	// 	'nome_produto-ASC' => 'Produto &#9650;', 'nome_produto-DESC' => 'Produto &#9660;',
	// 	'valor-ASC' => 'Valor &#9650;', 'valor-DESC' => 'Valor &#9660;',
	// 	'quantidade-ASC' => 'Quantidade &#9650;', 'quantidade-DESC' => 'Quantidade &#9660;',
	// 	'total-ASC' => 'Total &#9650;', 'total-DESC' => 'Total &#9660;',
	// 	'nome_cliente-ASC' => 'Cliente &#9650;', 'nome_cliente-DESC' => 'Cliente &#9660;',
	// 	'dt_pedido-ASC' => 'Data &#9650;', 'dt_pedido-DESC' => 'Data &#9660;',
	// 	'status_pedido-ASC' => 'Status &#9650;', 'status_pedido-DESC' => 'Status &#9660;'
	// ];
?>

<main>
<?php
		$prefix = 'order';
		include 'templates/table.php';
	?>

	<?php include 'templates/order-modal.php'; ?>

	<?php include 'templates/customer-modal.php'; ?>

	<?php include 'templates/product-modal.php'; ?>

	<section id="search-modal" class="modal" data-type="">
		<div class="modal-form wide">
			<header class="row justify-space-between bg-primary">
				<h2 class="modal-title"></h2>
				<button class="btn btn-close bg-secondary" onclick="onModalClose(event, 'search-modal')">X</button>
			</header>
			<div class="search-bar bg-secondary">
				<label>Buscar <span></span>:
					<input type="text" oninput="onModalSearchChange(event)" placeholder="Buscar">
				</label>
			</div>

			<?php include 'templates/table.php'; ?>

		</div>
	</section>

	<?php include 'templates/footer.php'; ?>
</main>
