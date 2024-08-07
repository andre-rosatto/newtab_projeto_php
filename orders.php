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
			$result->execute();
			header('Location: orders.php');
		}
		// echo "sql: $sql<br>";
		// echo "action: {$_POST['order-action']}; customer: $customerId; product: $productId; date: $orderDate; amount: $amount; status: $orderStatus <br>";
	}

	$orderBy = 'dt_pedido';
	$order = 'DESC';
	$tableHeaders = ['ID', 'Produto', 'Valor Unid.', 'Quantidade', 'Total', 'Cliente', 'Data', 'Status', ''];
	$orderOptions = [
		'nome_produto-ASC' => 'Produto &#9650;', 'nome_produto-DESC' => 'Produto &#9660;',
		'valor-ASC' => 'Valor &#9650;', 'valor-DESC' => 'Valor &#9660;',
		'quantidade-ASC' => 'Quantidade &#9650;', 'quantidade-DESC' => 'Quantidade &#9660;',
		'total-ASC' => 'Total &#9650;', 'total-DESC' => 'Total &#9660;',
		'nome_cliente-ASC' => 'Cliente &#9650;', 'nome_cliente-DESC' => 'Cliente &#9660;',
		'dt_pedido-ASC' => 'Data &#9650;', 'dt_pedido-DESC' => 'Data &#9660;',
		'status_pedido-ASC' => 'Status &#9650;', 'status_pedido-DESC' => 'Status &#9660;'
	];
?>

<main>
	<?php include 'templates/searchbar.php'; ?>

	<?php include 'templates/table.php'; ?>

	<section id="order-modal" class="modal">
		<form class="modal-form narrow" name="form-edit" id="form-edit" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
			<header class="row justify-space-between bg-primary">
				<h2 class="modal-title">Editar pedido</h2>
				<span id="modal-id"></span>
				<button class="btn btn-close bg-secondary" onclick="onModalClose(event, 'order-modal')">X</button>
			</header>

			<input type="hidden" name="order-id" id="order-id-hidden" value="">
			<input type="hidden" name="order-action" id="order-action-hidden" value="update">

			<div class="modal-content col gap-small">
				<div class="row justify-space-between">
					<h3>Cliente</h3>
					<div class="row gap-small">
						<button class="btn bg-primary" onclick="onSearch(event, 'customer-modal')" data-type="customer-modal">Buscar</button>
						<button class="btn bg-primary" onclick="onNew(event, 'customer-modal')">Cadastrar novo</button>
					</div>
				</div>

				<input type="hidden" name="order-customer-id" id="order-modal-customer-id">
				<div class="col stretch">
					<label>Nome</label>
					<input class="stretch readonly" id="order-modal-customer-name" type="text" name="order-customer-name" value="" oninput="onModalInputChange(event)" readonly>
				</div>

				<div class="row gap-small">
					<div class="col">
						<label>CPF</label>
						<input class="stretch readonly" id="order-modal-cpf" type="text" name="order-cpf" value="" oninput="onModalInputChange(event)" readonly>
					</div>
					<div class="col stretch">
						<label>E-mail</label>
						<input class="stretch readonly" id="order-modal-email" type="text" name="order-email" value="" oninput="onModalInputChange(event)" readonly>
					</div>
				</div>
				<span id="customer-error" class="form-error"></span>

				<hr>

				<div class="row justify-space-between">
					<h3>Produto</h3>
					<div class="row gap-small">
						<button class="btn bg-primary" onclick="onSearch(event, 'product-modal')" data-type="product-modal">Buscar</button>
						<button class="btn bg-primary" onclick="onNew(event, 'product-modal')">Cadastrar novo</button>
					</div>
				</div>

				<input type="hidden" name="order-product-id" id="order-modal-product-id">
				<div class="col stretch">
					<label>Nome</label>
					<input class="stretch readonly" id="order-modal-product-name" type="text" name="order-product-name" value="" oninput="onModalInputChange(event)" readonly>
				</div>

				<div class="row gap-small">
					<div class="col">
						<label>Valor</label>
						<input class="stretch readonly" id="order-modal-value" type="text" name="order-value" value="" oninput="onModalInputChange(event)" readonly>
					</div>
					<div class="col stretch">
						<label>Cód. barras</label>
						<input class="stretch readonly" id="order-modal-barcode" type="text" name="order-barcode" value="" oninput="onModalInputChange(event)" readonly>
					</div>
				</div>
				<span id="product-error" class="form-error"></span>

				<hr>

				<div class="row gap-small">
					<div class="col stretch">
						<label for="order-modal-date">Data</label>
						<input class="stretch" id="order-modal-date" type="date" name="order-date" value="" oninput="onModalInputChange(event)">
						<span id="date-error" class="form-error"></span>
					</div>
					<div class="col stretch">
						<label for="order-status">Status</label>
						<select name="order-status" id="order-modal-status">
							<option value="aberto">Aberto</option>
							<option value="cancelado">Cancelado</option>
							<option value="pago">Pago</option>
						</select>
						<span class="form-error"></span>
					</div>
				</div>

				<div class="row gap-small">
					<div class="col stretch">
						<label for="order-modal-amount">Quantidade</label>
						<input class="stretch" id="order-modal-amount" type="number" name="order-amount" value="" min="1" max="9999999999" oninput="onModalInputChange(event)">
					</div>
					<div class="col stretch">
						<label>Total</label>
						<input class="stretch" id="order-modal-total" type="text" name="order-total" value="" oninput="onModalInputChange(event)" readonly>
					</div>
				</div>

				<div class="row justify-center gap-large">
					<button class="btn bg-primary" onclick="onModalOK(event, 'order')">OK</button>
					<button class="btn bg-secondary btn-delete" onclick="onModalDelete(event, 'order')">Excluir</button>
				</div>
			</div>
		</form>
	</section>

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
