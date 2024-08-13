let orderBy = 'dt_pedido';
let orderDirection = 'DESC';

function onLoad() {
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
	const amount = document.querySelector('#modal-order-amount').value;
	// const amount = 5;
	const value = document.querySelector('#modal-order-value').value;
	document.querySelector('#modal-order-total').value = formatValue((rawValue(value) * amount).toFixed(2));
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
	} else if (prefix === 'product') {
		document.querySelector('#customer-searchbar-wrapper').classList.add('hidden');
		document.querySelector('#product-searchbar-wrapper').classList.remove('hidden');
		document.querySelector('#search-modal .modal-title').innerText = 'Buscar produto';
	}
	document.querySelector(`#${prefix}-page`).value = '1';
	document.querySelector(`#${prefix}-search`).value = '';
	document.querySelector(`#${prefix}-order`).value = 'nome-ASC';
	updatePagination(prefix, true);
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

function onModalSubmit(prefix) {
	if (prefix === 'customer') {
		const name = document.querySelector('#modal-customer-name').value;
		const cpf = rawDigits(document.querySelector('#modal-cpf').value);
		const email = document.querySelector('#modal-email').value;
		fetch(`config/request.php?register=clientes&nome=${name}&cpf=${cpf}&email=${email}`)
			.then(res => res.json())
			.then(data => {
				onSelectItem('customer', data['id']);
				hideModal('customer');
			});
	} else if (prefix === 'product') {
		const name = document.querySelector('#modal-product-name').value;
		const value = rawValue(document.querySelector('#modal-value').value);
		const barcode = document.querySelector('#modal-barcode').value;
		fetch(`config/request.php?register=produtos&nome=${name}&valor=${value}&cod_barras=${barcode}`)
			.then(res => res.json())
			.then(data => {
				onSelectItem('product', data['id']);
				hideModal('product');
			});
	}

}