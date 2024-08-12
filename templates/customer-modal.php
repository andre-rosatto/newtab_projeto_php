<section id="customer-modal" class="modal">
	<form class="modal-form narrow" name="form-edit" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
		<header class="row justify-space-between bg-primary">
			<h2 class="modal-title">Editar cliente</h2>
			<span class="modal-id"></span>
			<button class="btn btn-close bg-secondary" onclick="onModalClose(event, 'customer')">X</button>
		</header>
		
		<input type="hidden" name="customer-id" id="customer-id-hidden" value="">
		<input type="hidden" name="customer-action" id="customer-action-hidden" value="update">
		
		<div class="modal-content col gap-small">
			<div class="col stretch">
				<label for="modal-customer-name">Nome</label>
				<input class="stretch" id="modal-customer-name" type="text" name="customer-name" value="" oninput="onModalInputChange(event)">
				<span id="customer-name-error" class="form-error"></span>
			</div>
			
			<div class="row gap-small">
				<div class="col stretch">
					<label for="modal-cpf">CPF</label>
					<input class="stretch" id="modal-cpf" type="text" name="cpf" value="" oninput="onModalInputChange(event)">
					<span id="cpf-error" class="form-error"></span>
				</div>
				
				<div class="col stretch">
					<label for="modal-email">E-mail</label>
					<input class="stretch" id="modal-email" type="email" name="email" value="" oninput="onModalInputChange(event)">
					<span id="email-error" class="form-error"></span>
				</div>
			</div>

			<div class="row justify-center gap-large">
				<button class="btn bg-primary" onclick="onModalOK(event, 'customer', true)">OK</button>
				<button class="btn bg-secondary btn-delete" onclick="onModalDelete(event, 'customer')">Excluir</button>
			</div>
		</div>
	</form>
</section>