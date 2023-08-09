<template>
	<div v-if="deckDataOutdated" class="wrap">
		<aside class="outdated-deck-data-notice">
			<template v-if="!updatingDeckData">
				<p>⚠ This deck uses an outdated set of card data. Update it to get enhanced app features!</p>
				<div
					v-if="!updatingDeckData"
					class="button-container"
				>
					<button @click="allowDataUpdate()">Update</button>
				</div>
			</template>
			<template v-else>
				<p>Updating now, please wait&hellip;</p>
				<p>Progress: <strong class="updated-percentage">{{ (totalCardsUpdated / combinedDeckTotals * 100).toFixed(0) }}%</strong></p>
			</template>
		</aside>
	</div>
</template>

<script>
import requestScryfallData from '@/mixins/requestScryfallData.js'

export default {
	mixins: [requestScryfallData],
	props: {
		deck: Object
	},
	data () {
		return {
			allCardsToUpdate: [],
			totalCardsUpdated: 0,
			updatingDeckData: false
		}
	},
	computed: {
		combinedDeckTotals () {
			return this.deck.cards.length + this.deck.sideboard.cards.length
		},
		deckDataOutdated () {
			return this.deck.dataVersion < this.$store.state.latestDeckDataVersion
		}
	},
	methods: {
		allowDataUpdate () {
			if (this.combinedDeckTotals > 150) {
				alert('⚠ Sorry, this deck’s data cannot be updated because it has too many cards.')
			} else {
				this.updatingDeckData = true
				this.$store.commit('setShowSideboard', false)

				this.gatherAllCards(this.deck)
			}
		},
		gatherAllCards (group) {
			for (const card of group.cards) {
				this.allCardsToUpdate.push({
					gapAfter: card.gapAfter,
					inSideboard: this.$store.state.showSideboard,
					name: card.name,
					qty: card.qty
				})

				if (this.allCardsToUpdate.length === this.deck.cards.length) { // Once all cards in the main group have been gathered...
					this.$store.commit('setShowSideboard', true)

					// Now gather the sideboard's cards.
					this.gatherAllCards(this.deck.sideboard)
				} else if (this.allCardsToUpdate.length === this.combinedDeckTotals) { // Once all the cards in both the main and sideboard groups have been updated...
					this.updateCardGroupData()
				}
			}
		},
		updateCardGroupData () {
			for (let i = 0; i < this.allCardsToUpdate.length; i++) {
				const cardData = this.allCardsToUpdate[i]

				const callback = () => {
					this.totalCardsUpdated++

					if (this.totalCardsUpdated === this.combinedDeckTotals) {
						setTimeout(() => {
							this.$router.go(0) // Reload the page.
						}, 125)
					}
				}

				setTimeout(() => {
					this.axiosRequestName(cardData.name, callback(), cardData)
				}, (i + 1) * 100)
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck.scss';
</style>
