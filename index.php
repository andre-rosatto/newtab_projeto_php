<?php include 'templates/header.php'; ?>
<?php include 'templates/navbar.php'; ?>

<?php
	include 'config/connect.php';

	if (isset($_POST['customer-action'])) {
		$id = $_POST['customer-id'];
		$name = $conn->quote($_POST['customer-name']);
		$cpf = preg_replace('/[\D]/', '', $_POST['cpf']);
		$email = $conn->quote($_POST['email']);
		$sql = '';
		if ($_POST['customer-action'] === 'update') {
			$sql = "UPDATE clientes SET nome=$name, cpf='$cpf', email=$email WHERE id=$id";
		} elseif ($_POST['customer-action'] === 'new') {
			$sql = "INSERT INTO clientes (nome, cpf, email) VALUES ($name, '$cpf', $email)";
		} elseif ($_POST['customer-action'] === 'delete') {
			$sql = "UPDATE clientes SET dt_exclusao=NOW() WHERE id=$id";
		}
		if ($sql) {
			$result = $conn->prepare($sql);
			$result->execute();
			header('Location: index.php');
		}
	}
?>

<main>
	<?php
		$prefix = 'customer';
		include 'templates/table.php';
	?>

	<?php include 'templates/customer-modal.php'; ?>

	<?php include 'templates/footer.php'; ?>
</main>
