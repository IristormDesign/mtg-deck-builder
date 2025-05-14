<template>
	<aside
		v-if="showingOutdatedDataNotice"
		class="outdated-deck-data-notice"
	>
		<h3>Card Data Update</h3>
		<p>This deck has an outdated set of card data. Update it to get new or enhanced app features!</p>
		<div class="button-container">
			<button @click="userEngagedUpdate()">Update</button>
		</div>

		<standard-dialog dialogID="tooManyCardsToUpdate">
			<p>Sorry, this deck’s data set can’t be updated because it has too many cards.</p>
		</standard-dialog>
		<standard-dialog dialogID="cardDataUpdateProgress">
			<template v-if="updateInProgress">
				<p>Updating now&hellip;</p>
				<p>Progress: <strong class="updated-percentage">{{ updatedPercent }}%</strong></p>
			</template>
			<template v-else>
				<p>✅ Update completed!</p>
			</template>
		</standard-dialog>
	</aside>
</template>

<script>
import StandardDialog from '@/components/StandardDialog.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'
import doubleFacedCards from '@/mixins/doubleFacedCards'
import latestDataVersions from '@/mixins/latestDataVersions.js'
import requestScryfallData from '@/mixins/requestScryfallData.js'

export default {
	components: { StandardDialog },
	mixins: [cardListFunctions, doubleFacedCards, latestDataVersions, requestScryfallData],
	props: {
		deck: Object
	},
	data () {
		return {
			cardsToUpdate: [],
			updateInProgress: true,
			numberOfCardsUpdated: 0,
			showingOutdatedDataNotice: false
		}
	},
	computed: {
		/**
		* @returns {boolean}
		*/
		deckDataIsOutdated () {
			if (!this.deck) return // This condition is needed for 404 error pages.

			return (
				!this.deck.dataVersion ||
				this.deck.dataVersion < this.latestDeckDataVersion
			)
		},
		/**
		* @returns {number}
		*/
		updatedPercent () {
			return (this.numberOfCardsUpdated / this.cardsToUpdate.length * 100).toFixed(0)
		}
	},
	watch: {
		'$route' (to, from) {
			if (to.params.deckPath === from.params.deckPath) return // Exit now if the route is only switching modes on the same deck page

			this.prepareDataUpdate()
		}
	},
	mounted () {
		this.prepareDataUpdate()
	},
	methods: {
		prepareDataUpdate () {
			if (!this.deckDataIsOutdated) {
				this.showingOutdatedDataNotice = false
				return
			} else {
				this.showingOutdatedDataNotice = true
			}

			/* Reset the following data variables in case an update check is done more than once. */
			this.cardsToUpdate = []
			this.updateInProgress = true

			if (!this.deck.sideboard) { // Early versions of deck data didn't have the sideboard list. If the `sideboard` key is still missing from the `deck` object, then add it.
				this.deckObject.sideboard = {
					cards: [],
					viewedCard: null
				}
			}

			const store = this.$store

			store.commit('showSideboard', false)
			this.determineOutdatedCards(this.deck)

			store.commit('showSideboard', true)
			this.determineOutdatedCards(this.deck.sideboard)

			store.commit('showSideboard', false)

			if (this.cardsToUpdate.length === 0) {
				this.deckObject.dataVersion = this.latestDeckDataVersion
				store.commit('decks', store.state.decks)
			}
		},
		determineOutdatedCards (list) {
			for (const card of list.cards) {
				if (card.type.includes('Planeswalker')) {
					if (card.loyalty) continue // Any planeswalker card object with a `loyalty` key means that card's data set is on the newest version.
				} else if (card.layout) continue // Any non-planeswalker card object with the `layout` key means that card's data set is on the newest version.

				this.cardsToUpdate.push({
					gapAfter: card.gapAfter,
					inSideboard: this.$store.state.showSideboard,
					name: this.doubleFacedCardName(card),
					qty: card.qty,
					img: card.img,
					img2: card.img2,
					imgVersion: card.imgVersion,
					link: card.link
				})
			}
		},
		userEngagedUpdate () {
			this.numberOfCardsUpdated = 0

			if (this.cardsToUpdate.length > 200) {
				this.$store.commit('idOfShowingDialog', 'tooManyCardsToUpdate')
			} else {
				this.$store.commit('idOfShowingDialog', 'cardDataUpdateProgress')

				const cardsToUpdate = this.cardsToUpdate

				for (let i = 0; i < cardsToUpdate.length; i++) {
					const callback = () => {
						this.numberOfCardsUpdated++

						if (this.numberOfCardsUpdated < cardsToUpdate.length) return

						this.finishUpdating()
					}

					setTimeout(() => {
						// console.log(`Updating card data for ${cardsToUpdate[i].name}...`)
						// callback()

						this.axiosRequestName(cardsToUpdate[i].name, callback(), cardsToUpdate[i])
					}, (i + 1) * 125) // Delay each request so that the Scryfall API doesn't get overloaded.
				}
			}
		},
		finishUpdating () {
			const store = this.$store

			this.$nextTick(() => {
				this.deckObject.editDate = new Date()
				this.deckObject.dataVersion = this.latestDeckDataVersion
				store.commit('decks', store.state.decks)
			})
			setTimeout(() => {
				this.updateInProgress = false
			}, 125) // This slight delay allows the displayed updated percentage to reach "100%" before the alert message appears.

			store.commit('idOfShowingDialog', {
				id: 'cardDataUpdateComplete',
				data: {
					callback: () => {
						this.showingOutdatedDataNotice = false
					}
				}
			})
		},
		archiveDeck () {
			this.$router.push({
				name: 'archiveDecks',
				params: { presetDeckName: this.deck.name }
			})
		}
	}
}
</script>
