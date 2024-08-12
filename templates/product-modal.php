<section id="product-modal" class="modal">
	<form id="product-modal-form" class="modal-form narrow" name="form-edit" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<header class="row justify-space-between bg-primary">
			<h2 class="modal-title">Editar produto</h2>
			<span class="modal-id"></span>
			<button class="btn btn-close bg-secondary" onclick="onModalClose(event, 'product')">X</button>
		</header>

		<input type="hidden" name="product-id" id="product-id-hidden" value="">
		<input type="hidden" name="product-action" id="product-action-hidden" value="update">
		
		<div class="modal-content col gap-small">
			<div class="col stretch">
				<label for="modal-product-name">Nome</label>
				<input class="stretch" id="modal-product-name" type="text" name="product-name" value="" oninput="onModalInputChange(event)">
				<span id="product-name-error" class="form-error"></span>
			</div>
			
			<div class="row gap-small">
				<div class="col stretch">
					<label for="modal-value">Valor</label>
					<input class="stretch" id="modal-value" type="tel" name="value" value="" oninput="onModalInputChange(event)">
					<span id="value-error" class="form-error"></span>
				</div>
				
				<div class="col stretch">
					<label for="modal-barcode">Código de barras</label>
					<input class="stretch" id="modal-barcode" type="tel" name="barcode" value="" oninput="onModalInputChange(event)">
					<span id="barcode-error" class="form-error"></span>
				</div>
			</div>

			<div class="row justify-center gap-large">
				<button class="btn bg-primary" onclick="onModalOK(event, 'product')">OK</button>
				<button class="btn bg-secondary btn-delete" onclick="onModalDelete(event, 'product')">Excluir</button>
			</div>
		</div>
	</form>
</section>