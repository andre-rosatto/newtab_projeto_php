const ORDER_OPTIONS = {
	customer: [
		{ field: 'nome', direction: 'ASC', displayName: 'Nome &#9650;' },
		{ field: 'nome', direction: 'DESC', displayName: 'Nome &#9660;' },
		{ field: 'cpf', direction: 'ASC', displayName: 'CPF &#9650;' },
		{ field: 'cpf', direction: 'DESC', displayName: 'CPF &#9660;' },
		{ field: 'email', direction: 'ASC', displayName: 'E-mail &#9650;' },
		{ field: 'email', direction: 'DESC', displayName: 'E-mail &#9660;' },
		{ field: 'id', direction: 'ASC', displayName: 'ID &#9650;' },
		{ field: 'id', direction: 'DESC', displayName: 'ID &#9660;' }
	],
	product: [
		{ field: 'nome', direction: 'ASC', displayName: 'Nome &#9650;' },
		{ field: 'nome', direction: 'DESC', displayName: 'Nome &#9660;' },
		{ field: 'valor', direction: 'ASC', displayName: 'Valor &#9650;' },
		{ field: 'valor', direction: 'DESC', displayName: 'Valor &#9660;' },
		{ field: 'cod_barras', direction: 'ASC', displayName: 'Cód. barras &#9650;' },
		{ field: 'cod_barras', direction: 'DESC', displayName: 'Cód. barras &#9660;' },
		{ field: 'id', direction: 'ASC', displayName: 'ID &#9650;' },
		{ field: 'id', direction: 'DESC', displayName: 'ID &#9660;' }
	],
	order: [
		{ field: 'nome_produto', direction: 'ASC', displayName: 'Produto &#9650;' },
		{ field: 'nome_produto', direction: 'DESC', displayName: 'Produto &#9660;' },
		{ field: 'valor', direction: 'ASC', displayName: 'Valor &#9650;' },
		{ field: 'valor', direction: 'DESC', displayName: 'Valor &#9660;' },
		{ field: 'quantidade', direction: 'ASC', displayName: 'Quantidade &#9650;' },
		{ field: 'quantidade', direction: 'DESC', displayName: 'Quantidade &#9660;' },
		{ field: 'total', direction: 'ASC', displayName: 'Total &#9650;' },
		{ field: 'total', direction: 'DESC', displayName: 'Total &#9660;' },
		{ field: 'nome_cliente', direction: 'ASC', displayName: 'Cliente &#9650;' },
		{ field: 'nome_cliente', direction: 'DESC', displayName: 'Cliente &#9660;' },
		{ field: 'dt_pedido', direction: 'ASC', displayName: 'Data &#9650;' },
		{ field: 'dt_pedido', direction: 'DESC', displayName: 'Data &#9660;' },
		{ field: 'status_pedido', direction: 'ASC', displayName: 'Status &#9650;' },
		{ field: 'status_pedido', direction: 'DESC', displayName: 'Status &#9660;' },
		{ field: 'id', direction: 'ASC', displayName: 'ID &#9650;' },
		{ field: 'id', direction: 'DESC', displayName: 'ID &#9660;' }
	]
};

const TABLE_HEADERS = {
	customer: ['ID', 'Nome', 'CPF', 'E-mail', ''],
	product: ['ID', 'Nome', 'Valor', 'Cód. barras', ''],
	order: ['ID', 'Produto', 'Valor', 'Quantidade', 'Total', 'Cliente', 'Data', 'Status', '']
};

const TABLES = {
	customer: 'clientes',
	product: 'produtos',
	order: 'pedidos'
};

const PAGE_SIZE = 20;

function initSearchbar(prefix, initialValue, isLookup = false) {
	const select = document.querySelector(`#${prefix}-order`);
	document.querySelector(`#${prefix}-searchbar`).dataset.type = isLookup ? 'lookup' : '';
	let html = '';
	ORDER_OPTIONS[prefix].forEach(option => {
		const value = `${option.field}-${option.direction}`;
		const selected = value === initialValue ? ' selected' : '';
		html += `<option value="${value}"${selected}>${option.displayName}</option>`;
	});
	select.innerHTML = html;
}

function initTable(prefix) {
	const tr = document.querySelector(`#${prefix}-tr`);
	tr.innerHTML = `<th>${TABLE_HEADERS[prefix].join('</th><th>')}</th>`;
}

function updatePagination(prefix) {
	const table = TABLES[prefix];
	const filter = document.querySelector(`#${prefix}-search`).value;
	let page = document.querySelector(`#${prefix}-page`).value - 1;
	fetch(`config/request.php?tablesize=${table}&filter=${filter}`)
		.then(res => res.json())
		.then(itemCount => {
			// atualiza o número de itens na tabela
			pageCount = Math.max(1, Math.ceil(itemCount / PAGE_SIZE));

			// atualiza os números da página
			document.querySelector(`#${prefix}-page-count`).innerText = `/ ${pageCount}`;
			document.querySelector(`#${prefix}-page`).max = pageCount;
			page = Math.min(page, pageCount - 1);
			document.querySelector(`#${prefix}-page`).value = page + 1;

			// atualiza os botões < >
			document.querySelector(`#${prefix}-next-btn`).disabled = page >= pageCount - 1 ? true : false;
			document.querySelector(`#${prefix}-previous-btn`).disabled = page <= 0 ? true : false;
			updateTable(prefix);
		});
}

function updateTable(prefix) {
	const table = TABLES[prefix];
	const filter = document.querySelector(`#${prefix}-search`).value;
	const orderBy = document.querySelector(`#${prefix}-order`).value.split('-')[0];
	const orderDirection = document.querySelector(`#${prefix}-order`).value.split('-')[1];
	const page = document.querySelector(`#${prefix}-page`).value - 1;
	const buttonText = document.querySelector(`#${prefix}-searchbar`).dataset.type === 'lookup' ? 'Selecionar' : 'Editar';
	fetch(`config/request.php?table=${table}&filter=${filter}&orderby=${orderBy}&orderdirection=${orderDirection}&page=${page}`)
		.then(res => res.json())
		.then(data => {
			const tbody = document.querySelector(`#${prefix}-tbody`);
			let html = '';
			data.forEach(item => {
				html += '<tr>';
				Object.keys(item).forEach(field => {
					const isNumber = field === 'valor' || field === 'quantidade' || field === 'total';
					let value = item[field];
					if (field === 'cpf') {
						value = formatCPF(value);
					} else if (field === 'valor' || field === 'total') {
						value = formatValue(value);
					}
					if (field === 'id_produto') {
						document.querySelector('#order-product-id').value = item[field];
					} else if (field === 'id_cliente') {
						document.querySelector('#order-customer-id').value = item[field];
					} else {
						html += `<td class="fit-width${isNumber ? ' table-number' : ''}">${value}</td>`;
					}
				});
				html += `
					<td>
						<button class="btn btn-short bg-primary" onclick="onEditItem('${prefix}', ${item['id']})">${buttonText}</button>
					</td>
				</tr>`;
			});
			tbody.innerHTML = html;
		});
}

function onSearchChange(e, prefix) {
	let filter = e.target.value.match(/[-+À-ÿ\w\d']+[-+À-ÿ\w\s]*/g);
	filter = filter ? filter[0] : '';
	e.target.value = filter;
	updatePagination(prefix);
}

function onSelectChange(prefix) {
	updateTable(prefix);
}

function onPageChange(e, prefix) {
	page = Math.min(Math.max(1, Number(e.target.value)), pageCount) - 1;
	e.target.value = page + 1;
	updatePagination(prefix);
}

function onPaginationButton(inc, prefix) {
	const page = document.querySelector(`#${prefix}-page`);
	page.value = Math.min(page.value) + inc, pageCount - 1;
	updatePagination(prefix);
}