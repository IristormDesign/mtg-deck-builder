<template>
	<div>
		<standard-dialog dialogID="nameIsTooLong">
			<p>Please make the deck’s name no longer than 50 characters.</p>
		</standard-dialog>
		<standard-dialog dialogID="missingLetterOrDigit">
			<p><strong>Error</strong>: The deck’s name must include an English letter or a digit.</p>
		</standard-dialog>
		<standard-dialog dialogID="deckNameExists">
			<p><strong>Error</strong>: You already have a deck named <i>{{ $store.state.dialogData.name }}</i>. Please give a different name.</p>
		</standard-dialog>
	</div>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'

export default {
	components: { StandardDialog }
}
</script>
