// function onEditItem(id) {
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			const data = JSON.parse(this.responseText);
// 			fillModal(id = id, type = 'cliente', items = [
// 				{ id: 'modal-customer-name', value: data['nome'] },
// 				{ id: 'modal-cpf', value: formatCPF(data['cpf']) },
// 				{ id: 'modal-email', value: data['email'] }
// 			]);
// 			document.querySelector('#customer-id-hidden').value = id;
// 			showModal('customer-modal');
// 		}
// 	}
// 	xmlhttp.open("GET", `config/request.php?tableinfo=clientes&id=${id}`, true);
// 	xmlhttp.send();
// }

// function onAddItem() {
// 	fillModal(id = null, type = 'cliente', items = [
// 		{ id: 'modal-customer-name', value: '' },
// 		{ id: 'modal-cpf', value: '' },
// 		{ id: 'modal-email', value: '' }
// 	]);
// 	showModal('customer-modal', true);
// }

// function onModalOK(e) {
// 	e.preventDefault();
// 	let valid = validateCustomer('name');
// 	valid &= validateCustomer('cpf');
// 	valid &= validateCustomer('email');
// 	if (valid) {
// 		document.querySelector('#modal-cpf').value = rawDigits(document.querySelector('#modal-cpf').value);
// 		document.querySelector('#form-edit').submit();
// 	}
// }

let orderBy = 'nome';
let orderDirection = 'ASC';

function onLoad() {
	document.querySelector('#customer-searchbar').dataset.type = 'customer';
	initSearchbar('customer', 'nome-ASC');
	initTable('customer');
	updatePagination('customer');
	// atualiza input:select
	// const select = document.querySelector('#customer-order');
	// const orderOptions = [
	// 	{ field: 'nome', direction: 'ASC', displayName: 'Nome &#9650;' },
	// 	{ field: 'nome', direction: 'DESC', displayName: 'Nome &#9660;' },
	// 	{ field: 'cpf', direction: 'ASC', displayName: 'CPF &#9650;' },
	// 	{ field: 'cpf', direction: 'DESC', displayName: 'CPF &#9660;' },
	// 	{ field: 'email', direction: 'ASC', displayName: 'E-mail &#9650;' },
	// 	{ field: 'email', direction: 'DESC', displayName: 'E-mail &#9660;' },
	// 	{ field: 'id', direction: 'ASC', displayName: 'ID &#9650;' },
	// 	{ field: 'id', direction: 'DESC', displayName: 'ID &#9660;' }
	// ];
	// html = '';
	// orderOptions.forEach(option => {
	// 	const selected = option.field === orderBy && option.direction === orderDirection ? ' selected' : '';
	// 	html += `<option value="${option.field}${selected}">${option.displayName}</option>`;
	// });
	// select.innerHTML = html;

	// // atualiza tabela
	// html = '';
	// ['ID', 'Nome', 'CPF', 'E-mail', ''].forEach(header => {
	// 	html += `<th>${header}</th>`;
	// });
	// document.querySelector('#customer-tr').innerHTML = html;
	// updatePagination('customer', 'clientes');
	// updateTable('customer', 'clientes', 'Editar');
}