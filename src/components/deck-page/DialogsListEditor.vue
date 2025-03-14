<template>
	<div>
		<standard-dialog dialogID="quantityMaxLimit">
			<p>A deck may not have more than 4 of any card with a particular name, other than the basic land cards.</p>
		</standard-dialog>

		<standard-dialog dialogID="movingCardGroup">
			<p>You’re moving {{ dd.card }} out of the {{ dd.activeGroup }} into the {{ dd.inactiveGroup }}.</p>
		</standard-dialog>

		<standard-dialog
			dialogID="confirmCardRemoval"
			class="with-two-buttons"
		>
			<p>⚠ You’re about to remove {{ dd.cardName }} from this card list.</p>
			<form slot="form" method="dialog">
				<div class="button-container">
					<button @click="removeCard(dd.cardIndex)">Remove</button>
				</div>
				<div class="button-container">
					<button class="cancel" autofocus>Cancel</button>
				</div>
			</form>
		</standard-dialog>
	</div>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import deckColors from '@/mixins/deckColors.js'
import removeCard from '@/mixins/removeCard.js'
import cardListFunctions from '@/mixins/cardListFunctions'

export default {
	components: { StandardDialog },
	mixins: [deckColors, removeCard, cardListFunctions],
	props: {
		deck: Object
	},
	computed: {
		dd () {
			return this.$store.state.dialogData
		}
	}
}
</script>
