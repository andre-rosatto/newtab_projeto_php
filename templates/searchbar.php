<?php
	$searchField = 'clientes';
	if ($_SERVER['PHP_SELF'] === '/products.php') {
		$searchField = 'produtos';
	} elseif ($_SERVER['PHP_SELF'] === '/orders.php') {
		$searchField = 'pedidos';
	}
?>

<setion class="search-bar bg-secondary">
	<div class="container row justify-center gap-large">
		<label>Filtrar <?php echo $searchField; ?>:
			<input type="text" id="search" value="" placeholder="Buscar" oninput="onSearchChange(event)">
		</label>
		<label>Ordenar por:
			<select id="order" onchange="onSelectChange()">
				<?php $orderStr = $orderBy . '-' . $order; ?>
				<?php foreach($orderOptions as $option => $value): ?>
					<option value="<?php echo $option; ?>" <?php echo $orderStr === $option ? 'selected' : ''; ?>><?php echo $value; ?></option>
				<?php endforeach; ?>
			</select>
		</label>
		<div class="pagination">
			<button id="previous-btn" class="btn btn-short bg-primary" onclick="onPaginationButton(-1)" disabled><</button>
			<input type="number" id="page" value="1" min="1" max="1" oninput="onPageChange(event)">
			<span id="page-count">/ 1</span>
			<button id="next-btn" class="btn btn-short bg-primary" onclick="onPaginationButton(1)">></button>
		</div>
	</div>
</setion>