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
			<p>Remove {{ dd.cardName }} from this card list?</p>
			<form slot="form" method="dialog">
				<button @click="removeCard(dd.cardIndex)" autofocus>Remove</button>
				<button class="cancel">Cancel</button>
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
	},
	watch: {
		'$store.state.idOfShowingDialog' (curID, prevID) {
			if (prevID === 'confirmCardRemoval') { // If the user just closed a dialog confirming whether to remove a certain card...
				const card = this.activeCardList.cards.find(unremovedCard => {
					return unremovedCard.name === this.$store.state.dialogData.cardName
				})

				if (card) { // If the card is found, that means the user has canceled its removal.
					card.qty = 1
				}
			}
		}
	}
}
</script>
