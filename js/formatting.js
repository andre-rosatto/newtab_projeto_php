function rawDigits(cpf) {
	return cpf.replace(/[^\d]/g, '');
}

function formatCPF(cpf) {
	let formattedValue = rawDigits(cpf);
	if (formattedValue.length > 3) {
		formattedValue = formattedValue.slice(0, 3) + '.' + formattedValue.slice(3);
	}
	if (formattedValue.length > 7) {
		formattedValue = formattedValue.slice(0, 7) + '.' + formattedValue.slice(7);
	}
	if (formattedValue.length > 11) {
		formattedValue = formattedValue.slice(0, 11) + '-' + formattedValue.slice(11);
	}
	return formattedValue;
}

function rawValue(value) {
	return Number(value.toString().replace(/[^\d]/g, '')) / 100;
}

function formatValue(value) {
	const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
	return formatter.format(rawValue(value));
}

function formatCustomerName(value) {
	let result = value.match(/[A-Za-zÀ-ÿ]+[A-Za-zÀ-ÿ'\s]*/g);
	result = result ? result[0] : '';
	return result.substring(0, 100);
}

function formatProductName(value) {
	let result = value.replace(/^[\s\"]*|[\"]*/g, '');
	return result.substring(0, 100);
}

function formatAmount(value) {
	return Math.max(1, Math.min(9999999999, rawDigits(value)));
}