<!DOCTYPE html>
<html lang="pt-BR">
<?php include 'templates/header.php'; ?>

<body onload="onLoad('<?php echo $page; ?>')">
	<?php include 'templates/header.php'; ?>
	<?php include 'templates/navbar.php'; ?>

	<?php
	include 'config/connect.php';

	if (isset($_POST['product-action'])) {
		$id = $_POST['product-id'];
		$name = $conn->quote($_POST['product-name']);
		$value = preg_replace('/[\D]/', '', $_POST['value']) / 100;
		$barcode = $_POST['barcode'];
		$sql = '';
		if ($_POST['product-action'] === 'update') {
			$sql = "UPDATE produtos SET nome=$name, valor=$value, cod_barras='$barcode' WHERE id=$id";
		} elseif ($_POST['product-action'] === 'new') {
			$sql = "INSERT INTO produtos (nome, valor, cod_barras) VALUES ($name, $value, '$barcode')";
		} elseif ($_POST['product-action'] === 'delete') {
			$sql = "DETELE FROM produtos WHERE id=$id";
		}
		if ($sql) {
			$result = $conn->prepare($sql);
			$result->execute();
			header('Location: products.php');
			die();
		}
	}
	?>

	<main>
		<?php
		$prefix = 'product';
		include 'templates/table.php';
		?>

		<?php include 'templates/product-modal.php'; ?>

	</main>

	<?php include 'templates/footer.php'; ?>

</body>

</html>