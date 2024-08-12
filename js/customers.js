let orderBy = 'nome';
let orderDirection = 'ASC';

function onLoad() {
	document.querySelector('#customer-searchbar').dataset.type = 'customer';
	initSearchbar('customer', 'nome-ASC');
	initTable('customer');
	updatePagination('customer');
}

function onEditItem(prefix, customerId) {
	fetch(`config/request.php?tableinfo=clientes&id=${customerId}`)
		.then(res => res.json())
		.then(customer => {
			fillModal(customer);
			showModal(prefix);
		});
}

function onAddItem() {
	fillModal();
	showModal('customer', true);
}

function fillModal(customer) {
	document.querySelector('.modal-id').innerText = customer ? `(ID: ${customer['id']})` : '';
	document.querySelector('#customer-id-hidden').value = customer ? customer['id'] : '';
	document.querySelector('#modal-customer-name').value = customer ? customer['nome'] : '';
	document.querySelector('#modal-cpf').value = customer ? formatCPF(customer['cpf']) : '';
	document.querySelector('#modal-email').value = customer ? customer['email'] : '';
}