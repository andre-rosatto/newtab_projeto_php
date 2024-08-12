<section id="order-modal" class="modal">
	<form id="order-modal-form" class="modal-form narrow" name="form-edit" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<header class="row justify-space-between bg-primary">
			<h2 class="modal-title">Editar pedido</h2>
			<span class="modal-id"></span>
			<button class="btn btn-close bg-secondary" onclick="onModalClose(event, 'order')">X</button>
		</header>

		<input type="hidden" name="order-id" id="order-id-hidden" value="">
		<input type="hidden" name="order-action" id="order-action-hidden" value="update">

		<div class="modal-content col gap-small">
			<div class="row justify-space-between">
				<h3>Cliente</h3>
				<div class="row gap-small">
					<button class="btn bg-primary" onclick="onSearch(event, 'customer-modal')" data-type="customer-modal">Buscar</button>
					<button class="btn bg-primary" onclick="onNew(event, 'customer-modal')">Cadastrar novo</button>
				</div>
			</div>

			<input type="hidden" name="order-customer-id" id="order-customer-id">
			<div class="col stretch">
				<label>Nome</label>
				<input class="stretch readonly" id="modal-order-customer-name" type="text" name="order-customer-name" value="" oninput="onModalInputChange(event)" readonly>
			</div>

			<div class="row gap-small">
				<div class="col">
					<label>CPF</label>
					<input class="stretch readonly" id="modal-order-cpf" type="text" name="order-cpf" value="" oninput="onModalInputChange(event)" readonly>
				</div>
				<div class="col stretch">
					<label>E-mail</label>
					<input class="stretch readonly" id="modal-order-email" type="text" name="order-email" value="" oninput="onModalInputChange(event)" readonly>
				</div>
			</div>
			<span id="customer-error" class="form-error"></span>

			<hr>

			<div class="row justify-space-between">
				<h3>Produto</h3>
				<div class="row gap-small">
					<button class="btn bg-primary" onclick="onSearch(event, 'product-modal')" data-type="product-modal">Buscar</button>
					<button class="btn bg-primary" onclick="onNew(event, 'product-modal')">Cadastrar novo</button>
				</div>
			</div>

			<input type="hidden" name="order-product-id" id="order-product-id">
			<div class="col stretch">
				<label>Nome</label>
				<input class="stretch readonly" id="modal-order-product-name" type="text" name="order-product-name" value="" oninput="onModalInputChange(event)" readonly>
			</div>

			<div class="row gap-small">
				<div class="col">
					<label>Valor</label>
					<input class="stretch readonly" id="modal-order-value" type="text" name="order-value" value="" oninput="onModalInputChange(event)" readonly>
				</div>
				<div class="col stretch">
					<label>Cód. barras</label>
					<input class="stretch readonly" id="modal-order-barcode" type="text" name="order-barcode" value="" oninput="onModalInputChange(event)" readonly>
				</div>
			</div>
			<span id="product-error" class="form-error"></span>

			<hr>

			<div class="row gap-small">
				<div class="col stretch">
					<label for="order-date">Data</label>
					<input class="stretch" id="modal-order-date" type="date" name="order-date" value="" oninput="onModalInputChange(event)">
					<span id="date-error" class="form-error"></span>
				</div>
				<div class="col stretch">
					<label for="order-status">Status</label>
					<select name="order-status" id="modal-order-status">
						<option value="aberto">Aberto</option>
						<option value="cancelado">Cancelado</option>
						<option value="pago">Pago</option>
					</select>
					<span class="form-error"></span>
				</div>
			</div>

			<div class="row gap-small">
				<div class="col stretch">
					<label for="order-amount">Quantidade</label>
					<input class="stretch" id="modal-order-amount" type="number" name="order-amount" value="" min="1" max="9999999999" oninput="onModalInputChange(event)">
				</div>
				<div class="col stretch">
					<label>Total</label>
					<input class="stretch" id="modal-order-total" type="text" name="order-total" value="" oninput="onModalInputChange(event)" readonly>
				</div>
			</div>

			<div class="row justify-center gap-large">
				<button class="btn bg-primary" onclick="onModalOK(event, 'order')">OK</button>
				<button class="btn bg-secondary btn-delete" onclick="onModalDelete(event, 'order')">Excluir</button>
			</div>
		</div>
	</form>
</section>