<?php
if ($_SERVER['PHP_SELF'] === '/products.php') {
	$btnText = 'Cadastrar produto';
} elseif ($_SERVER['PHP_SELF'] === '/orders.php') {
	$btnText = 'Novo pedido';
} else {
	$btnText = 'Cadastrar cliente';
}
?>

<nav class="bg-primary row justify-center">
	<div class="container row stretch justify-space-between">
		<ul class="row gap-medium">
			<li <?php echo $_SERVER['PHP_SELF'] === '/index.php' ? 'class="selected no-events"' : ''; ?>><a href="index.php">Clientes</a></li>
			<li <?php echo $_SERVER['PHP_SELF'] === '/products.php' ? 'class="selected no-events"' : ''; ?>><a href="products.php">Produtos</a></li>
			<li <?php echo $_SERVER['PHP_SELF'] === '/orders.php' ? 'class="selected no-events"' : ''; ?>><a href="orders.php">Pedidos</a></li>
		</ul>
		<input class="btn bg-secondary" type="button" value="<?php echo $btnText; ?>" onclick="onAddItem()">
	</div>
</nav>