<?php
$headerTitle;
$page;
switch ($_SERVER['PHP_SELF']) {
	case '/products.php':
		$headerTitle = 'Produtos';
		$page = 'products';
		break;
	case '/orders.php':
		$headerTitle = 'Pedidos';
		$page = 'orders';
		break;
	default:
		$headerTitle = 'Clientes';
		$page = 'customers';
}
?>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Newtab: Projeto PHP</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/navbar.css">
	<link rel="stylesheet" href="css/table.css">
	<link rel="stylesheet" href="css/modal.css">
	<link rel="stylesheet" href="css/footer.css">
	<script src="js/formatting.js"></script>
	<script src="js/validation.js"></script>
	<script src="js/modal.js"></script>
	<script src="js/table.js"></script>

	<?php if ($_SERVER['PHP_SELF'] === '/orders.php'): ?>
		<script src="js/orders.js"></script>
	<?php elseif ($_SERVER['PHP_SELF'] === '/products.php'): ?>
		<script src="js/products.js"></script>
	<?php else: ?>
		<script src="js/customers.js"></script>
	<?php endif; ?>
</head>