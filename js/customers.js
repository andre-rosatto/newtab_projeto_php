function onEditItem(id) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			const data = JSON.parse(this.responseText);
			fillModal(id = id, type = 'cliente', items = [
				{ id: 'modal-customer-name', value: data['nome'] },
				{ id: 'modal-cpf', value: formatCPF(data['cpf']) },
				{ id: 'modal-email', value: data['email'] }
			]);
			document.querySelector('#customer-id-hidden').value = id;
			showModal('customer-modal');
		}
	}
	xmlhttp.open("GET", `config/request.php?tableinfo=clientes&id=${id}`, true);
	xmlhttp.send();
}

function onAddItem() {
	fillModal(id = null, type = 'cliente', items = [
		{ id: 'modal-customer-name', value: '' },
		{ id: 'modal-cpf', value: '' },
		{ id: 'modal-email', value: '' }
	]);
	showModal('customer-modal', true);
}

function onModalOK(e) {
	e.preventDefault();
	let valid = validateCustomer('name');
	valid &= validateCustomer('cpf');
	valid &= validateCustomer('email');
	if (valid) {
		document.querySelector('#modal-cpf').value = rawDigits(document.querySelector('#modal-cpf').value);
		document.querySelector('#form-edit').submit();
	}
}