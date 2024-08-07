<?php include 'templates/header.php'; ?>
<?php include 'templates/navbar.php'; ?>

<?php
	include 'config/connect.php';

	if (isset($_POST['customer-action'])) {
		$id = $_POST['customer-id'];
		$name = $_POST['customer-name'];
		$cpf = $_POST['cpf'];
		$email = $_POST['email'];
		$sql = '';
		if ($_POST['customer-action'] === 'update') {
			$sql = "UPDATE clientes SET nome='$name', cpf='$cpf', email='$email' WHERE id=$id";
		} elseif ($_POST['customer-action'] === 'new') {
			$sql = "INSERT INTO clientes (nome, cpf, email) VALUES ('$name', '$cpf', '$email')";
		} elseif ($_POST['customer-action'] === 'delete') {
			$sql = "UPDATE clientes SET deleted_at=NOW() WHERE id=$id";
		}
		if ($sql) {
			$result = $conn->prepare($sql);
			$result->execute();
			header('Location: index.php');
		}
	}

	$orderBy = 'nome';
	$order = 'ASC';
	$tableHeaders = ['ID', 'Nome', 'CPF', 'E-mail', ''];
	$orderOptions = [
		'nome-ASC' => 'Nome &#9650;', 'nome-DESC' => 'Nome &#9660;',
		'cpf-ASC' => 'CPF &#9650;', 'cpf-DESC' => 'CPF &#9660;',
		'email-ASC' => 'E-mail &#9650;', 'email-DESC' => 'E-mail &#9660;',
		'id-ASC' => 'ID &#9650;', 'id-DESC' => 'ID &#9660;'
	];
?>

<main>
	<?php include 'templates/searchbar.php'; ?>
	
	<?php include 'templates/table.php'; ?>

	<?php include 'templates/customer-modal.php'; ?>

	<?php include 'templates/footer.php'; ?>
</main>
