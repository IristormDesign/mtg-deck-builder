<template>
	<div>
		<standard-dialog dialogID="quantityMaxLimit">
			<p>A deck may not have more than 4 of any card with a particular name, other than the basic land cards.</p>
		</standard-dialog>

		<standard-dialog dialogID="movingCardGroup">
			<p>You’re moving {{ dialogData.card }} out of the {{ dialogData.activeGroup }} into the {{ dialogData.inactiveGroup }}.</p>
		</standard-dialog>

		<standard-dialog dialogID="confirmCardRemoval">
			<p>Remove {{ dialogData.cardName }} from this card list?</p>
			<form slot="form" method="dialog">
				<button @click="removeCard(dialogData.cardIndex)" autofocus>Yes, Remove</button>
				<button class="cancel">No, Cancel</button>
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
		dialogData () {
			if (this.$store.state.dialogVariableData) {
				return this.$store.state.dialogVariableData
			} else {
				return ''
			}
		}
	},
	watch: {
		'$store.state.idOfShowingDialog' (curID, prevID) {
			if (prevID === 'confirmCardRemoval') { // If a dialog has asked the user to confirm whether to remove a certain card, and then the user declined...
				const card = this.activeCardList.cards.find(unremovedCard => {
					return unremovedCard.name === this.$store.state.dialogVariableData.cardName
				})

				if (card) { // If the card is found, that means the user has canceled its removal.
					card.qty = 1
				}
			}
		}
	}
}
</script>
