<?php include 'templates/header.php'; ?>
<?php include 'templates/navbar.php'; ?>

<?php
	include 'config/connect.php';

	if (isset($_POST['product-action'])) {
		$id = $_POST['product-id'];
		$name = $_POST['product-name'];
		$value = $_POST['value'];
		$barcode = $_POST['barcode'];
		echo "$id, $name, $value, $barcode";
		$sql = '';
		if ($_POST['product-action'] === 'update') {
			$sql = "UPDATE produtos SET nome='$name', valor='$value', cod_barras='$barcode' WHERE id=$id";
		} elseif ($_POST['product-action'] === 'new') {
			$sql = "INSERT INTO produtos (nome, valor, cod_barras) VALUES ('$name', '$value', '$barcode')";
		} elseif ($_POST['product-action'] === 'delete') {
			$sql = "UPDATE produtos SET deleted_at=NOW() WHERE id=$id";
		}
		if ($sql) {
			$result = $conn->prepare($sql);
			$result->execute();
			header('Location: products.php');
		}
	}

	$orderBy = 'nome';
	$order = 'ASC';
	$tableHeaders = ['ID', 'Nome', 'Valor', 'Cód. barras', ''];
	$orderOptions = [
		'nome-ASC' => 'Nome &#9650;', 'nome-DESC' => 'Nome &#9660;',
		'valor-ASC' => 'Valor &#9650;', 'valor-DESC' => 'Valor &#9660;',
		'cod_barras-ASC' => 'Cód. barras &#9650;', 'cod_barras-DESC' => 'Cód. barras &#9660;',
		'id-ASC' => 'ID &#9650;', 'id-DESC' => 'ID &#9660;'
	];
?>

<main>
	<?php include 'templates/searchbar.php'; ?>
	
	<?php include 'templates/table.php'; ?>

	<?php include 'templates/product-modal.php'; ?>

	<?php include 'templates/footer.php'; ?>
</main>
