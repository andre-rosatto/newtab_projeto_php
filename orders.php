<!DOCTYPE html>
<html lang="pt-BR">
<?php include 'templates/header.php'; ?>

<body onload="onLoad('<?php echo $page; ?>')">
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
			$sql = "UPDATE pedidos SET dt_exclusao=NOW() WHERE id=$id";
		}
		if ($sql) {
			$result = $conn->prepare($sql);
			$result->execute();
			header('Location: orders.php');
			die();
		}
	}
	?>

	<main>
		<?php
		$prefix = 'order';
		include 'templates/table.php';
		?>

		<?php include 'templates/order-modal.php'; ?>

		<?php include 'templates/customer-modal.php'; ?>

		<?php include 'templates/product-modal.php'; ?>

		<section id="search-modal" class="modal">
			<div class="modal-form wide">
				<header class="row justify-space-between bg-primary">
					<h2 class="modal-title"></h2>
					<button class="btn btn-close bg-secondary" onclick="onModalClose(event, 'search')">X</button>
				</header>

				<div id="customer-searchbar-wrapper">
					<?php
					$prefix = 'customer';
					include 'templates/table.php';
					?>
				</div>
				<div id="product-searchbar-wrapper">
					<?php
					$prefix = 'product';
					include 'templates/table.php';
					?>
				</div>
			</div>
		</section>
	</main>

	<?php include 'templates/footer.php'; ?>

</body>

</html>