<template>
	<div v-if="deckDataOutdated" class="wrap">
		<aside class="outdated-deck-data-notice">
			<template v-if="!updatingDeckData">
				<p>⚠ This deck is using an outdated set of card data. Update it to get enhanced app features!</p>
				<div
					v-if="!updatingDeckData"
					class="button-container"
				>
					<button @click="prepareDataUpdate()">Update</button>
				</div>
			</template>
			<template v-else>
				<p>Updating now, please wait&hellip;</p>
				<p>Progress: <strong class="updated-percentage">{{ updatedPercent }}%</strong></p>
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
			cardsToUpdate: [],
			numberOfCardsToIgnore: 0,
			numberOfCardsUpdated: 0,
			updatingDeckData: false
		}
	},
	computed: {
		deckDataOutdated () {
			return this.deck.dataVersion < this.$store.state.latestDeckDataVersion
		},
		updatedPercent () {
			return (this.numberOfCardsUpdated / this.cardsToUpdate.length * 100).toFixed(0)
		}
	},
	methods: {
		prepareDataUpdate () {
			if (this.cardsToUpdate > 150) {
				alert('⚠ Sorry, this deck’s data cannot be updated because it has too many cards.')
			} else {
				this.updatingDeckData = true
				this.$store.commit('setShowSideboard', false)

				for (const card of this.deck.cards) {
					this.determineOutdatedCard(card)
				}

				this.$store.commit('setShowSideboard', true)

				for (const card of this.deck.sideboard.cards) {
					this.determineOutdatedCard(card)
				}

				this.updateCardData()
			}
		},
		determineOutdatedCard (card) {
			const cardIsOutdated = !card.keywords // Any `card` object lacking the `keywords` key is the sign (the only one for now) indicating that a card's data is outdated.

			if (cardIsOutdated) {
				this.cardsToUpdate.push({
					gapAfter: card.gapAfter,
					inSideboard: this.$store.state.showSideboard,
					name: card.name,
					qty: card.qty
				})

				this.numberOfCardsToIgnore++
			}
		},
		updateCardData () {
			const cardsTU = this.cardsToUpdate

			for (let i = 0; i < cardsTU.length; i++) {
				const callback = () => {
					this.numberOfCardsUpdated++

					if (this.numberOfCardsUpdated === cardsTU.length) {
						setTimeout(() => {
							this.$router.go(0) // Reload the page.
						}, 100)
					}
				}

				setTimeout(() => {
					this.axiosRequestName(cardsTU[i].name, callback(), cardsTU[i])
				}, (i + 1) * 100) // Delay each request so that the Scryfall API doesn't get overloaded
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck.scss';
</style>
