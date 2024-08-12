function validateCustomer(field) {
	const errors = {};
	if (field === 'name') {
		// validar nome
		const name = document.querySelector('#modal-customer-name').value;
		if (name.length === 0) {
			errors['name'] = 'Um nome é necessário.';
		} else if (name.length < 5) {
			errors['name'] = 'Nome deve conter pelo menos 5 caracteres.';
		}
		document.querySelector('#customer-name-error').innerText = errors['name'] ?? '';
	} else if (field === 'cpf') {
		// validar CPF
		const cpf = rawDigits(document.querySelector('#modal-cpf').value);
		if (cpf.length === 0) {
			errors['cpf'] = 'CPF é necessário.';
		} else if (cpf.length != 11) {
			errors['cpf'] = 'CPF deve conter 11 dígitos.';
		}
		document.querySelector('#cpf-error').innerText = errors['cpf'] ?? '';
	} else if (field === 'email') {
		// validar e-mail
		const email = document.querySelector('#modal-email').value.trim();
		if (email.length === 0) {
			errors['email'] = 'Email é necessário.';
		} else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
			errors['email'] = 'O e-mail deve ser válido.';
		}
		document.querySelector('#email-error').innerText = errors['email'] ?? '';
	}
	return Object.keys(errors).length === 0;
}

function validateProduct(field) {
	const errors = {};
	if (field === 'name') {
		// validar nome
		const name = document.querySelector('#modal-product-name').value;
		if (name.length === 0) {
			errors['name'] = 'Um nome é necessário.';
		} else if (name.length < 5) {
			errors['name'] = 'Nome deve conter pelo menos 5 caracteres.';
		}
		document.querySelector('#product-name-error').innerText = errors['name'] ?? '';
	} else if (field === 'value') {
		// validar valor
		const value = rawValue(document.querySelector('#modal-value').value);
		if (value > 999_999_999.99) {
			errors['value'] = 'Valor máximo R$999.999.999,99.';
		}
		document.querySelector('#value-error').innerText = errors['value'] ?? '';
	} else if (field === 'barcode') {
		// validar código de barras
		const barcode = document.querySelector('#modal-barcode').value;
		if (barcode.length !== 20) {
			errors['barcode'] = 'Cód. barras deve conter 20 dígitos.';
		}
		document.querySelector('#barcode-error').innerText = errors['barcode'] ?? '';
	}
	return Object.keys(errors).length === 0;
}

function validateOrder(field) {
	const errors = {};
	if (field === 'date') {
		// validar data
		const date = new Date(document.querySelector('#order-modal-date').value.trim());
		if (isNaN(date)) {
			errors['date'] = 'Data é necessária.';
		} else if (date.getFullYear() < 1950) {
			errors['date'] = 'Data mínima 01/01/1950.';
		}
		document.querySelector('#date-error').innerText = errors['date'] ?? '';
	} else if (field === 'customer') {
		if (document.querySelector('#order-modal-customer-id').value === '') {
			errors['customer'] = 'Cliente é necessário.';
		}
		document.querySelector('#customer-error').innerText = errors['customer'] ?? '';
	} else if (field === 'product') {
		if (document.querySelector('#order-modal-product-id').value === '') {
			errors['product'] = 'Produto é necessário.';
		}
		document.querySelector('#product-error').innerText = errors['product'] ?? '';
	}
	return Object.keys(errors).length === 0;
}