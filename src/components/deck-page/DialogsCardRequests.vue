<template>
	<div>
		<standard-dialog dialogID="invalidCardPageURL">
			<p><strong>Error</strong>: The URL you’re submitting doesn’t go to a valid card page on Scryfall. No card could be added from it.</p>
		</standard-dialog>

		<standard-dialog dialogID="scryfallConnectionTimedOut">
			<p><strong>Error</strong>: Sorry, but your card name couldn’t be added right now. 😭</p>
			<p>MTG Deck Builder gets card data from Scryfall, but it seems Scryfall’s web servers can’t be reached at the moment. Try again another time.</p>
		</standard-dialog>

		<standard-dialog dialogID="invalidCardName">
			<p><strong>Error</strong>: No card named “{{ dd }}” exists in <i>Magic: The Gathering</i>.</p>
		</standard-dialog>

		<standard-dialog dialogID="cardAlreadyInDeck">
			<p>{{ dd }} already exists in this {{ stringActiveList }}.</p>
			<p>(If you were trying to add a duplicate of this card, do that by increasing the card’s quantity number in the card list.)</p>
		</standard-dialog>

		<standard-dialog
			dialogID="replaceExistingPrint"
			class="with-two-buttons"
		>
			<p>{{ dd.cardName }} already exists in this {{ stringActiveList }}, though in a different print.</p>
			<p>Do you want to replace your requested print of {{ dd.cardName }} with the existing print?</p>
			<form slot="form" method="dialog">
				<button
					@click="updateOldCard(dd, $store.state.showSideboard)"
					autofocus
				>Yes, Replace</button>
				<button class="cancel">No, Cancel</button>
			</form>
		</standard-dialog>

		<standard-dialog dialogID="miscError">
			<p><strong>Error</strong>: {{ dd }}</p>
		</standard-dialog>
	</div>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import getActiveDeck from '@/mixins/getActiveDeck' // Needed for the "replaceExistingPrint" dialog.
import requestScryfallData from '@/mixins/requestScryfallData'

export default {
	components: { StandardDialog },
	mixins: [getActiveDeck, requestScryfallData],
	computed: {
		dd () {
			return this.$store.state.dialogData
		},
		stringActiveList () {
			if (this.$store.state.showSideboard) {
				return 'deck’s sideboard'
			} else {
				return 'deck'
			}
		}
	}
}
</script>
