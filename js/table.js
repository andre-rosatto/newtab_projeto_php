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
	]
};

const TABLE_HEADERS = {
	customer: ['ID', 'Nome', 'CPF', 'E-mail', '']
};

const TABLES = {
	customer: 'clientes',
	product: 'produtos',
	order: 'pedidos'
};

function initSearchbar(prefix, initialValue) {
	const select = document.querySelector(`#${prefix}-order`);
	const orderBy = select.dataset.orderBy;
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

function updatePagination(prefix, refreshTable = true) {
	const table = TABLES[document.querySelector(`#${prefix}-searchbar`).dataset.type];
	const filter = document.querySelector(`#${prefix}-search`).value;
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
			if (refreshTable) updateTable(prefix);
		});
}

function updateTable(prefix) {
	const table = TABLES[document.querySelector(`#${prefix}-searchbar`).dataset.type];
	const filter = document.querySelector(`#${prefix}-search`).value;
	const orderBy = document.querySelector(`#${prefix}-order`).value.split('-')[0];
	const orderDirection = document.querySelector(`#${prefix}-order`).value.split('-')[1];
	const page = document.querySelector(`#${prefix}-page`).value - 1;
	const buttonText = prefix.split('-')[0] === 'lookup' ? 'Selecionar' : 'Detalhes';
	fetch(`config/request.php?table=${table}&filter=${filter}&orderby=${orderBy}&orderdirection=${orderDirection}&page=${page}`)
		.then(res => res.json())
		.then(data => {
			const tbody = document.querySelector(`#${prefix}-tbody`);
			let html = '';
			data.forEach(item => {
				html += '<tr>';
				Object.keys(item).forEach(key => {
					html += `<td>${item[key]}</td>`;
				});
				html += `
					<td>
						<button class="btn btn-short bg-primary" onclick="onEditItem(${item['id']})">${buttonText}</button>
					</td>
				</tr>`;

				// tableFields.forEach(field => {
				// 	const isNumber = field === 'valor' || field === 'quantidade' || field === 'total';
				// 	let value = item[field];
				// 	if (field === 'cpf') {
				// 		value = formatCPF(value);
				// 	} else if (field === 'valor' || field === 'total') {
				// 		value = formatValue(value);
				// 	}
				// 	html += `<td class="fit-width${isNumber ? ' table-number' : ''}">${value}</td>`;
				// });

			});
			tbody.innerHTML = html;
		});
	// xmlhttp = new XMLHttpRequest();
	// xmlhttp.onreadystatechange = function () {
	// 	if (this.readyState === 4 && this.status === 200) {
	// 		const data = JSON.parse(this.responseText);
	// 		const tbody = document.querySelector(`#${prefix}-tbody`);
	// 		let html = '';
	// 		data.forEach(item => {
	// 			html += '<tr>';
	// 			tableFields.forEach(field => {
	// 				const isNumber = field === 'valor' || field === 'quantidade' || field === 'total';
	// 				let value = item[field];
	// 				if (field === 'cpf') {
	// 					value = formatCPF(value);
	// 				} else if (field === 'valor' || field === 'total') {
	// 					value = formatValue(value);
	// 				}
	// 				html += `<td class="fit-width${isNumber ? ' table-number' : ''}">${value}</td>`;
	// 			});
	// 			html += `
	// 				<td>
	// 					<button class="btn btn-short bg-primary" onclick="onEditItem(${item['id']})">${buttonText}</button>
	// 				</td>
	// 			</tr>`;
	// 		});
	// 		tbody.innerHTML = html;
	// 	}
	// }
	// xmlhttp.open("GET", `config/request.php?table=${table}&filter=${filter}&orderby=${orderBy}&orderdirection=${orderDirection}&page=${page}`, true);
	// xmlhttp.send();
}

function onSearchChange(e, prefix) {
	let filter = e.target.value.match(/[-+À-ÿ\w\d']+[-+À-ÿ\w\s]*/g);
	filter = filter ? filter[0] : '';
	e.target.value = filter;
	updatePagination(prefix);
}

function onSelectChange(prefix) {
	// updateOrderBy();
	// updateTable();
}

function onPageChange(e) {
	// page = Math.min(Math.max(1, Number(e.target.value)), pageCount) - 1;
	// e.target.value = page + 1;
	// updatePagination(updateTable);
}

function onPaginationButton(inc) {
	// page = Math.min(page + inc, pageCount - 1);
	// updatePagination(updateTable);
}