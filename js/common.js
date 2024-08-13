// const PAGE_SIZE = 20;

// let filter = '';
// let page = 0;
// let pageCount = 1;
// let tableFields = [];
// let itemCount = 0;

// formatação
// function rawDigits(cpf) {
// 	return cpf.replace(/[^\d]/g, '');
// }

// function formatCPF(cpf) {
// 	let formattedValue = rawDigits(cpf);
// 	if (formattedValue.length > 3) {
// 		formattedValue = formattedValue.slice(0, 3) + '.' + formattedValue.slice(3);
// 	}
// 	if (formattedValue.length > 7) {
// 		formattedValue = formattedValue.slice(0, 7) + '.' + formattedValue.slice(7);
// 	}
// 	if (formattedValue.length > 11) {
// 		formattedValue = formattedValue.slice(0, 11) + '-' + formattedValue.slice(11);
// 	}
// 	return formattedValue;
// }

// function rawValue(value) {
// 	return Number(value.toString().replace(/[^\d]/g, '')) / 100;
// }

// function formatValue(value) {
// 	const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
// 	return formatter.format(rawValue(value));
// }

// function formatCustomerName(value) {
// 	let result = value.match(/[A-Za-zÀ-ÿ]+[A-Za-zÀ-ÿ'\s]*/g);
// 	result = result ? result[0] : '';
// 	return result.substring(0, 100);
// }

// function formatProductName(value) {
// 	let result = value.replace(/^[\s\"]*|[\"]*/g, '');
// 	return result.substring(0, 100);
// }

// function formatAmount(value) {
// 	return Math.max(1, Math.min(9999999999, rawDigits(value)));
// }

// atualizações
// function updateOrderBy() {
// 	const parts = document.querySelector('#order').value.split('-');
// 	orderBy = parts[0];
// 	orderDirection = parts[1];
// }

// function updatePagination(prefix, table, onUpdate) {
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			// atualiza o número de itens na tabela
// 			const itemCount = Number(this.responseText);
// 			pageCount = Math.max(1, Math.ceil(itemCount / PAGE_SIZE));

// 			// atualiza os números da página
// 			document.querySelector(`#${prefix}-page-count`).innerText = `/ ${pageCount}`;
// 			document.querySelector(`#${prefix}-page`).max = pageCount;
// 			page = Math.min(page, pageCount - 1);
// 			document.querySelector(`#${prefix}-page`).value = page + 1;

// 			// atualiza os botões < >
// 			document.querySelector(`#${prefix}-next-btn`).disabled = page >= pageCount - 1 ? true : false;
// 			document.querySelector(`#${prefix}-previous-btn`).disabled = page <= 0 ? true : false;
// 			if (typeof onUpdate === 'function') onUpdate();
// 		}
// 	}
// 	xmlhttp.open("GET", `config/request.php?tablesize=${table}&filter=${filter}`, true);
// 	xmlhttp.send();
// }

// function updateTable(prefix, table, buttonText) {
// 	xmlhttp = new XMLHttpRequest();
// 	xmlhttp.onreadystatechange = function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			const data = JSON.parse(this.responseText);
// 			const tbody = document.querySelector(`#${prefix}-tbody`);
// 			let html = '';
// 			data.forEach(item => {
// 				html += '<tr>';
// 				tableFields.forEach(field => {
// 					const isNumber = field === 'valor' || field === 'quantidade' || field === 'total';
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
// 						<button class="btn btn-short bg-primary" onclick="onEditItem(${item['id']})">${buttonText}</button>
// 					</td>
// 				</tr>`;
// 			});
// 			tbody.innerHTML = html;
// 		}
// 	}
// 	xmlhttp.open("GET", `config/request.php?table=${table}&filter=${filter}&orderby=${orderBy}&orderdirection=${orderDirection}&page=${page}`, true);
// 	xmlhttp.send();
// }

// eventos
// function onLoad(page) {
// 	switch (page) {
// 		case 'products':
// 			table = 'produtos';
// 			tableFields = ['id', 'nome', 'valor', 'cod_barras'];
// 			break;
// 		case 'orders':
// 			table = 'pedidos';
// 			tableFields = ['id', 'nome_produto', 'valor', 'quantidade', 'total', 'nome_cliente', 'dt_pedido', 'status_pedido'];
// 			break;
// 		default:
// 			table = 'clientes';
// 			tableFields = ['id', 'nome', 'cpf', 'email'];
// 	}
// 	updateOrderBy();
// 	updatePagination(updateTable);
// }

// function onSearchChange(e) {
// 	filter = e.target.value.match(/[A-Za-zÀ-ÿ\d]+[A-Za-zÀ-ÿ'\s]*/g);
// 	filter = filter ? filter[0] : '';
// 	e.target.value = filter;
// 	updatePagination(updateTable);
// }

// function onSelectChange() {
// 	updateOrderBy();
// 	updateTable();
// }

// function onPageChange(e) {
// 	page = Math.min(Math.max(1, Number(e.target.value)), pageCount) - 1;
// 	e.target.value = page + 1;
// 	updatePagination(updateTable);
// }

// function onPaginationButton(inc) {
// 	page = Math.min(page + inc, pageCount - 1);
// 	updatePagination(updateTable);
// }

// janelas modais
// function showModal(modalId, newItem = false) {
// 	document.querySelectorAll('.form-error').forEach(el => el.innerText = '');
// 	document.querySelector(`#${modalId}`).classList.add('show');
// 	document.querySelector(`#${modalId} input:not([type="hidden"])`)?.focus();
// 	const deleteBtn = document.querySelector(`#${modalId} .btn-delete`);
// 	const type = modalId.split('-')[0];
// 	const action = document.querySelector(`#${type}-action-hidden`);
// 	if (newItem) {
// 		deleteBtn?.classList.add('hidden');
// 		if (action) action.value = 'new';
// 	} else {
// 		deleteBtn?.classList.remove('hidden');
// 		if (action) action.value = 'update';
// 	}
// }

// function hideModal(modalId) {
// 	document.querySelector(`#${modalId}`).classList.remove('show');
// }

// function fillModal(id, type, items) {
// 	document.querySelector('#modal-id').innerText = id ? `ID: ${id}` : '';
// 	document.querySelector('.modal-title').innerHTML = id ? `Editar ${type}` : `Novo ${type}`;
// 	items.forEach(item => {
// 		document.querySelector(`#${item['id']}`).value = item['value'];
// 	})
// }

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

// function onModalClose(e, modalId) {
// 	e.preventDefault();
// 	hideModal(modalId);
// }

// validação dos formulários nas janelas modais
// function validateCustomer(field) {
// 	const errors = {};
// 	if (field === 'name') {
// 		// validar nome
// 		const name = document.querySelector('#modal-customer-name').value;
// 		if (name.length === 0) {
// 			errors['name'] = 'Um nome é necessário.';
// 		} else if (name.length < 5) {
// 			errors['name'] = 'Nome deve conter pelo menos 5 caracteres.';
// 		}
// 		document.querySelector('#customer-name-error').innerText = errors['name'] ?? '';
// 	} else if (field === 'cpf') {
// 		// validar CPF
// 		const cpf = rawDigits(document.querySelector('#modal-cpf').value);
// 		if (cpf.length === 0) {
// 			errors['cpf'] = 'CPF é necessário.';
// 		} else if (cpf.length != 11) {
// 			errors['cpf'] = 'CPF deve conter 11 dígitos.';
// 		}
// 		document.querySelector('#cpf-error').innerText = errors['cpf'] ?? '';
// 	} else if (field === 'email') {
// 		// validar e-mail
// 		const email = document.querySelector('#modal-email').value.trim();
// 		if (email.length === 0) {
// 			errors['email'] = 'Email é necessário.';
// 		} else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
// 			errors['email'] = 'O e-mail deve ser válido.';
// 		}
// 		document.querySelector('#email-error').innerText = errors['email'] ?? '';
// 	}
// 	return Object.keys(errors).length === 0;
// }

// function validateProduct(field) {
// 	const errors = {};
// 	if (field === 'name') {
// 		// validar nome
// 		const name = document.querySelector('#modal-product-name').value;
// 		if (name.length === 0) {
// 			errors['name'] = 'Um nome é necessário.';
// 		} else if (name.length < 5) {
// 			errors['name'] = 'Nome deve conter pelo menos 5 caracteres.';
// 		}
// 		document.querySelector('#product-name-error').innerText = errors['name'] ?? '';
// 	} else if (field === 'value') {
// 		// validar valor
// 		const value = rawValue(document.querySelector('#modal-value').value);
// 		if (value > 999_999_999.99) {
// 			errors['value'] = 'Valor máximo R$999.999.999,99.';
// 		}
// 		document.querySelector('#value-error').innerText = errors['value'] ?? '';
// 	} else if (field === 'barcode') {
// 		// validar código de barras
// 		const barcode = document.querySelector('#modal-barcode').value;
// 		if (barcode.length !== 20) {
// 			errors['barcode'] = 'Cód. barras deve conter 20 dígitos.';
// 		}
// 		document.querySelector('#barcode-error').innerText = errors['barcode'] ?? '';
// 	}
// 	return Object.keys(errors).length === 0;
// }

// function validateOrder(field) {
// 	const errors = {};
// 	if (field === 'date') {
// 		// validar data
// 		const date = new Date(document.querySelector('#order-modal-date').value.trim());
// 		if (isNaN(date)) {
// 			errors['date'] = 'Data é necessária.';
// 		} else if (date.getFullYear() < 1950) {
// 			errors['date'] = 'Data mínima 01/01/1950.';
// 		}
// 		document.querySelector('#date-error').innerText = errors['date'] ?? '';
// 	} else if (field === 'customer') {
// 		if (document.querySelector('#order-modal-customer-id').value === '') {
// 			errors['customer'] = 'Cliente é necessário.';
// 		}
// 		document.querySelector('#customer-error').innerText = errors['customer'] ?? '';
// 	} else if (field === 'product') {
// 		if (document.querySelector('#order-modal-product-id').value === '') {
// 			errors['product'] = 'Produto é necessário.';
// 		}
// 		document.querySelector('#product-error').innerText = errors['product'] ?? '';
// 	}
// 	return Object.keys(errors).length === 0;
// }