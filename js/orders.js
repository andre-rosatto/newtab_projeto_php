let orderBy = 'dt_pedido';
let orderDirection = 'DESC';

function onLoad() {
	document.querySelector('#order-searchbar').dataset.type = 'order';
	document.querySelector('#customer-searchbar').dataset.type = 'customer';
	document.querySelector('#product-searchbar').dataset.type = 'product';
	initSearchbar('order', 'dt_pedido-DESC');
	initSearchbar('customer', 'nome-ASC');
	initSearchbar('product', 'nome-ASC');
	initTable('order');
	initTable('customer');
	initTable('product');
	updatePagination('order');
}

function onEditItem(prefix, itemId) {
	if (prefix === 'customer' || prefix === 'product') {
		onSelectItem(prefix, itemId);
		return;
	}
	fetch(`config/request.php?tableinfo=pedidos&id=${itemId}`)
		.then(res => res.json())
		.then(order => {
			fillModal(order);
			showModal(prefix);
		});
}

function onAddItem() {
	fillModal();
	showModal('order', true);
}

function updateTotal() {
	// const amount = document.querySelector('#modal-order-amount').value;
	const amount = 5;
	const value = document.querySelector('#modal-order-value').value;

	console.log('amount', amount);
	console.log('value', value);
	console.log('rawValue', rawValue(value));
	console.log('rawValue * amount', rawValue(value) * amount);
	console.log('formatRawValue', formatValue(rawValue(value)));

	document.querySelector('#modal-order-total').value = formatValue(rawValue(value) * amount);
}

function fillModal(order) {
	const date = new Date().toLocaleDateString().split('/');
	//pedido
	document.querySelector('.modal-id').innerText = order ? `(ID: ${order['id']})` : '';
	document.querySelector('#order-id-hidden').value = order ? order['id'] : '';
	document.querySelector('#modal-order-date').value = order ? order['dt_pedido'] : `${date[2]}-${date[1]}-${date[0]}`;
	document.querySelector('#modal-order-status').value = order ? order['status_pedido'] : 'aberto';
	document.querySelector('#modal-order-amount').value = order ? order['quantidade'] : '1';
	document.querySelector('#modal-order-total').value = order ? formatValue(order['quantidade'] * order['valor']) : formatValue(0);
	//cliente
	document.querySelector('#order-customer-id').value = order ? order['id_cliente'] : '';
	document.querySelector('#modal-order-customer-name').value = order ? order['nome_cliente'] : '';
	document.querySelector('#modal-order-cpf').value = order ? formatCPF(order['cpf']) : '';
	document.querySelector('#modal-order-email').value = order ? order['email'] : '';
	//produto
	document.querySelector('#order-product-id').value = order ? order['id_produto'] : '';
	document.querySelector('#modal-order-product-name').value = order ? order['nome_produto'] : '';
	document.querySelector('#modal-order-value').value = order ? formatValue(order['valor']) : '';
	document.querySelector('#modal-order-barcode').value = order ? order['cod_barras'] : '';
}

function onModalSubmit(prefix) {
	console.log(prefix);
}

function onNew(e, prefix) {
	e.preventDefault();
	showModal(prefix, true);
}

function onSearch(e, prefix) {
	e.preventDefault();
	document.querySelector('#search-modal').classList.add('show');
	if (prefix === 'customer') {
		document.querySelector('#customer-searchbar-wrapper').classList.remove('hidden');
		document.querySelector('#product-searchbar-wrapper').classList.add('hidden');
		document.querySelector('#search-modal .modal-title').innerText = 'Buscar cliente';
	} else {
		document.querySelector('#customer-searchbar-wrapper').classList.add('hidden');
		document.querySelector('#product-searchbar-wrapper').classList.remove('hidden');
		document.querySelector('#search-modal .modal-title').innerText = 'Buscar produto';
	}
	updatePagination('customer', true);
	updatePagination('product', true);
}

function onSelectItem(prefix, itemId) {
	const table = prefix === 'customer' ? 'clientes' : 'produtos';
	fetch(`config/request.php?tableinfo=${table}&id=${itemId}`)
		.then(res => res.json())
		.then(item => {
			if (prefix === 'customer') {
				document.querySelector('#order-customer-id').value = item ? item['id'] : '';
				document.querySelector('#modal-order-customer-name').value = item ? item['nome'] : '';
				document.querySelector('#modal-order-cpf').value = item ? formatCPF(item['cpf']) : '';
				document.querySelector('#modal-order-email').value = item ? item['email'] : '';
				validateOrder('customer');
			} else if (prefix === 'product') {
				document.querySelector('#order-product-id').value = item ? item['id'] : '';
				document.querySelector('#modal-order-product-name').value = item ? item['nome'] : '';
				document.querySelector('#modal-order-value').value = item ? formatValue(item['valor']) : '';
				document.querySelector('#modal-order-barcode').value = item ? item['cod_barras'] : '';
				updateTotal();
				validateOrder('product');
			}
			hideModal('search');
		});
}

// let data;

// function onEditItem(id) {
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			data = JSON.parse(this.responseText);
// 			fillModal(id = id, type = 'pedido', items = [
// 				{ id: 'order-modal-customer-name', value: data['nome_cliente'] },
// 				{ id: 'order-modal-cpf', value: formatCPF(data['cpf']) },
// 				{ id: 'order-modal-email', value: data['email'] },
// 				{ id: 'order-modal-product-name', value: data['nome_produto'] },
// 				{ id: 'order-modal-value', value: formatValue(data['valor']) },
// 				{ id: 'order-modal-barcode', value: data['cod_barras'] },
// 				{ id: 'order-modal-date', value: data['dt_pedido'] },
// 				{ id: 'order-modal-status', value: data['status_pedido'] },
// 				{ id: 'order-modal-amount', value: data['quantidade'] },
// 				{ id: 'order-modal-total', value: formatValue(data['valor'] * data['quantidade']) }
// 			]);
// 			document.querySelector('#order-id-hidden').value = id;
// 			document.querySelector('#order-modal-customer-id').value = data['id_cliente'];
// 			document.querySelector('#order-modal-product-id').value = data['id_produto'];
// 			showModal('order-modal');
// 		}
// 	}
// 	xmlhttp.open("GET", `config/request.php?tableinfo=pedidos&id=${id}`, true);
// 	xmlhttp.send();
// }

// function onAddItem() {
// 	fillModal(id = null, type = 'pedido', items = [
// 		{ id: 'order-modal-customer-name', value: '' },
// 		{ id: 'order-modal-cpf', value: '' },
// 		{ id: 'order-modal-email', value: '' },
// 		{ id: 'order-modal-product-name', value: '' },
// 		{ id: 'order-modal-value', value: formatValue(0) },
// 		{ id: 'order-modal-barcode', value: '' },
// 		{ id: 'order-modal-date', value: new Date().toISOString().substring(0, 10) },
// 		{ id: 'order-modal-status', value: 'aberto' },
// 		{ id: 'order-modal-amount', value: '1' },
// 		{ id: 'order-modal-total', value: formatValue(0) }
// 	]);
// 	showModal('order-modal', true);
// }

// function onModalOK(e, type) {
// 	e.preventDefault();
// 	let valid = false;
// 	switch (type) {
// 		case 'product':
// 			valid = validateProduct('name');
// 			valid &= validateProduct('value');
// 			valid &= validateProduct('barcode');
// 			break;
// 		case 'order':
// 			valid = validateOrder('date');
// 			valid &= validateOrder('customer');
// 			valid &= validateOrder('product');
// 			break;
// 		default:
// 			valid = validateCustomer('name');
// 			valid &= validateCustomer('cpf');
// 			valid &= validateCustomer('email');
// 	}
// 	if (valid) {
// 		if (type === 'customer') {
// 			document.querySelector('#modal-cpf').value = rawDigits(document.querySelector('#modal-cpf').value);
// 		} else if (type === 'product') {
// 			document.querySelector('#modal-value').value = rawValue(document.querySelector('#modal-value').value);
// 		}
// 		document.querySelector('#form-edit').submit();
// 	}
// }

// function onSearch(e) {
// 	e.preventDefault();
// 	let searchTerm = 'clientes';
// 	let tableHeaders = ['ID', 'Nome', 'CPF', 'E-mail', ''];
// 	const type = e.target.dataset.type;
// 	if (type === 'product-modal') {
// 		searchTerm = 'produtos';
// 		tableHeaders = ['ID', 'Nome', 'Valor', 'Cód. barras', ''];
// 	}
// 	let html = '<tr>';
// 	tableHeaders.forEach(header => {
// 		html += `<th>${header}</th>`;
// 	});
// 	html += '</tr>';
// 	document.querySelector('#search-modal').dataset.type = type;
// 	document.querySelector('#search-modal .search-bar input').value = '';
// 	document.querySelector('#search-modal table thead').innerHTML = html;
// 	document.querySelector('#search-modal .modal-title').innerText = `Busca de ${searchTerm}`;
// 	document.querySelector('#search-modal .search-bar label span').innerText = searchTerm;
// 	showModal('search-modal');
// 	updateSearchTable('', type);
// }

// function onNew(e, modal) {
// 	e.preventDefault();
// 	if (modal === 'product-modal') {
// 		document.querySelector('#modal-value').value = formatValue(0);
// 	}
// 	showModal(modal, true);
// }

// function onSelectItem(itemId) {
// 	const table = document.querySelector('#search-modal').dataset.type === 'product-modal' ? 'produtos' : 'clientes';
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			const data = JSON.parse(this.responseText);
// 			if (table === 'produtos') {
// 				document.querySelector('#order-modal-product-id').value = data['id'];
// 				document.querySelector('#order-modal-product-name').value = data['nome'];
// 				document.querySelector('#order-modal-value').value = formatValue(data['valor']);
// 				document.querySelector('#order-modal-barcode').value = data['cod_barras'];
// 				updateTotal();
// 			} else {
// 				document.querySelector('#order-modal-customer-id').value = data['id'];
// 				document.querySelector('#order-modal-customer-name').value = data['nome'];
// 				document.querySelector('#order-modal-cpf').value = formatCPF(data['cpf']);
// 				document.querySelector('#order-modal-email').value = data['email'];
// 			}
// 		}
// 		hideModal('search-modal');
// 	}
// 	xmlhttp.open("GET", `config/request.php?item=${table}&id=${itemId}`, true);
// 	xmlhttp.send();
// }

// function updateSearchTable(filter, type) {
// 	let table = 'clientes';
// 	let searchFields = ['id', 'nome', 'cpf', 'email'];
// 	if (type === 'product-modal') {
// 		table = 'produtos';
// 		searchFields = ['id', 'nome', 'valor', 'cod_barras'];
// 	}
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			const data = JSON.parse(this.responseText);
// 			let html = '';
// 			table.innerHTML = '';
// 			data.forEach(item => {
// 				html += '<tr>';
// 				searchFields.forEach(field => {
// 					const isNumber = field === 'valor';
// 					let value = item[field];
// 					if (field === 'cpf') {
// 						value = formatCPF(value);
// 					} else if (field === 'valor' || field === 'total') {
// 						value = formatValue(value);
// 					}
// 					html += `<td class="fit-width${isNumber ? ' table-number' : ''}">${value}</td>`;
// 				});
// 				html += `
// 					<td>
// 						<button class="btn btn-short bg-primary" onclick="onSelectItem(${item['id']})">Selecionar</button>
// 					</td>
// 				</tr>`;
// 			});
// 			document.querySelector(`#search-modal tbody`).innerHTML = html;
// 		}
// 	}
// 	xmlhttp.open("GET", `config/request.php?table=${table}&filter=${filter}&page=0&offset=0&orderby=nome&orderdirection=ASC`, true);
// 	xmlhttp.send();
// }

// function onModalSearchChange(e) {
// 	const type = document.querySelector('#search-modal').dataset.type;
// 	const filter = e.target.value.trim();
// 	updateSearchTable(filter, type);
// }

// function updateTotal() {
// 	const amount = Number(document.querySelector('#order-modal-amount').value);
// 	const value = rawValue(document.querySelector('#order-modal-value').value);
// 	document.querySelector('#order-modal-total').value = formatValue(amount * value);
// }
