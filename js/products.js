function onEditItem(id) {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			const data = JSON.parse(this.responseText);
			fillModal(id = id, type = 'cliente', items = [
				{ id: 'modal-product-name', value: data['nome'] },
				{ id: 'modal-value', value: formatValue(data['valor']) },
				{ id: 'modal-barcode', value: data['cod_barras'] }
			]);
			document.querySelector('#product-id-hidden').value = id;
			showModal('product-modal');
		}
	}
	xmlhttp.open("GET", `config/request.php?tableinfo=produtos&id=${id}`, true);
	xmlhttp.send();
}

function onAddItem() {
	fillModal(id = null, type = 'produto', items = [
		{ id: 'modal-product-name', value: '' },
		{ id: 'modal-value', value: formatValue(0) },
		{ id: 'modal-barcode', value: '' }
	]);
	showModal('product-modal', true);
}

function onModalOK(e) {
	e.preventDefault();
	let valid = validateProduct('name');
	valid &= validateProduct('value');
	valid &= validateProduct('barcode');
	if (valid) {
		document.querySelector('#modal-value').value = rawValue(document.querySelector('#modal-value').value);
		document.querySelector('#form-edit').submit();
	}
}