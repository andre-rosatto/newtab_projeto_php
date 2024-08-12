<setion class="search-bar bg-secondary" id="<?php echo $prefix; ?>-searchbar">
	<div class="container row justify-center gap-large">
		<label>Filtrar:
			<input type="text" id="<?php echo $prefix; ?>-search" value="" placeholder="Buscar" oninput="onSearchChange(event, '<?php echo $prefix; ?>')">
		</label>
		<label>Ordenar por:
			<select id="<?php echo $prefix; ?>-order" onchange="onSelectChange('<?php echo $prefix; ?>')">
				
			</select>
		</label>
		<div class="pagination">
			<button id="<?php echo $prefix; ?>-previous-btn" class="btn btn-short bg-primary" onclick="onPaginationButton(-1, '<?php echo $prefix; ?>')" disabled><</button>
			<input type="number" id="<?php echo $prefix; ?>-page" value="1" min="1" max="1" oninput="onPageChange(event, '<?php echo $prefix; ?>')">
			<span id="<?php echo $prefix; ?>-page-count">/ 1</span>
			<button id="<?php echo $prefix; ?>-next-btn" class="btn btn-short bg-primary" onclick="onPaginationButton(1, '<?php echo $prefix; ?>')">></button>
		</div>
	</div>
</setion>

<table>
	<thead class="bg-primary">
		<tr id="<?php echo $prefix; ?>-tr">

		</tr>
	</thead>
	<tbody id="<?php echo $prefix; ?>-tbody">
		
	</tbody>
</table>