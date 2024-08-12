function showModal(prefix, newItem = false) {
	document.querySelectorAll(`#${prefix}-modal .form-error`).forEach(el => el.innerText = '');
	document.querySelector(`#${prefix}-modal`).classList.add('show');
	document.querySelector(`#${prefix}-modal input:not([type="hidden"])`)?.focus();
	const deleteBtn = document.querySelector(`#${prefix}-modal .btn-delete`);
	const action = document.querySelector(`#${prefix}-action-hidden`);
	if (newItem) {
		deleteBtn?.classList.add('hidden');
		if (action) action.value = 'new';
	} else {
		deleteBtn?.classList.remove('hidden');
		if (action) action.value = 'update';
	}
}

function hideModal(prefix) {
	document.querySelector(`#${prefix}-modal`).classList.remove('show');
}

// function onModalInputChange(e) {
// 	switch (e.target.name) {
// 		// clientes
// 		case 'customer-name':
// 			e.target.value = formatCustomerName(e.target.value);
// 			validateCustomer('name');
// 			break;
// 		case 'cpf':
// 			e.target.value = formatCPF(e.target.value).substring(0, 14);
// 			validateCustomer('cpf');
// 			break;
// 		case 'email':
// 			validateCustomer('email');
// 			break;

// 		// produtos
// 		case 'product-name':
// 			e.target.value = formatProductName(e.target.value);
// 			validateProduct('name');
// 			break;
// 		case 'value':
// 			e.target.value = formatValue(e.target.value);
// 			validateProduct('value');
// 			break;
// 		case 'barcode':
// 			e.target.value = rawDigits(e.target.value).substring(0, 20);
// 			validateProduct('barcode');
// 			break;

// 		// pedidos
// 		case 'order-date':
// 			validateOrder('date');
// 			break;
// 		case 'order-amount':
// 			e.target.value = formatAmount(e.target.value);
// 			updateTotal();
// 			break;
// 	}
// }

// function onModalDelete(e, type) {
// 	e.preventDefault();
// 	document.querySelector(`#${type}-action-hidden`).value = 'delete';
// 	document.querySelector('#form-edit').submit();
// }

function onModalClose(e, prefix) {
	e.preventDefault();
	hideModal(prefix);
}