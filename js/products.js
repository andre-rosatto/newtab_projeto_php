let orderBy = 'nome';
let orderDirection = 'ASC';

function onLoad() {
	initSearchbar('product', 'nome-ASC');
	initTable('product');
	updatePagination('product');
}

function onEditItem(prefix, productId) {
	fetch(`config/request.php?tableinfo=produtos&id=${productId}`)
		.then(res => res.json())
		.then(product => {
			fillModal(product);
			showModal(prefix);
		});
}

function onAddItem() {
	fillModal();
	showModal('product', true);
}

function onModalSubmit(prefix) {
	document.querySelector(`#${prefix}-modal-form`).submit();
}

function fillModal(product) {
	document.querySelector('.modal-id').innerText = product ? `(ID: ${product['id']})` : '';
	document.querySelector('#product-id-hidden').value = product ? product['id'] : '';
	document.querySelector('#modal-product-name').value = product ? product['nome'] : '';
	document.querySelector('#modal-value').value = product ? formatValue(product['valor']) : formatValue(0);
	document.querySelector('#modal-barcode').value = product ? product['cod_barras'] : '';
}