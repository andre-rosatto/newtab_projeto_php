<?php include 'templates/header.php'; ?>
<?php include 'templates/navbar.php'; ?>

<?php
	include 'config/connect.php';

	if (isset($_POST['product-action'])) {
		$id = $_POST['product-id'];
		$name = $_POST['product-name'];
		$value = preg_replace('/[\D]/', '', $_POST['value']) / 100;
		$barcode = $_POST['barcode'];
		$sql = '';
		if ($_POST['product-action'] === 'update') {
			$sql = "UPDATE produtos SET nome='$name', valor=$value, cod_barras='$barcode' WHERE id=$id";
		} elseif ($_POST['product-action'] === 'new') {
			$sql = "INSERT INTO produtos (nome, valor, cod_barras) VALUES ('$name', $value, '$barcode')";
		} elseif ($_POST['product-action'] === 'delete') {
			$sql = "UPDATE produtos SET deleted_at=NOW() WHERE id=$id";
		}
		// echo $sql;
		if ($sql) {
			$result = $conn->prepare($sql);
			$result->execute();
			header('Location: products.php');
		}
	}
?>

<main>
<?php
		$prefix = 'product';
		include 'templates/table.php';
	?>

	<?php include 'templates/product-modal.php'; ?>

	<?php include 'templates/footer.php'; ?>
</main>
