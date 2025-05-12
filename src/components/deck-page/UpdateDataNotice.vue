<template>
	<aside
		v-if="deckDataIsOutdated || deckDataIsUpdating"
		class="outdated-deck-data-notice"
	>
		<template v-if="!deckDataIsUpdating">
			<h3>Card Data Update</h3>
			<p>This deck has an outdated set of card data. Update it to get new or enhanced app features!</p>
			<p>Before updating, you should make a backup copy of your deck’s data by saving a deck archive file.</p>
			<div class="button-group">
				<div class="button-container">
					<button @click="archiveDeck()">Archive</button>
				</div>
				<div class="button-container">
					<button @click="userEngagedUpdate()">Update</button>
				</div>
			</div>
		</template>
		<template v-else>
			<p>Updating now&hellip;</p>
			<p>Progress: <strong class="updated-percentage">{{ updatedPercent }}%</strong></p>
		</template>

		<standard-dialog dialogID="tooManyCardsToUpdate">
			<p>Sorry, this deck’s data set can’t be updated because it has too many cards.</p>
		</standard-dialog>
		<standard-dialog dialogID="cardDataUpdateComplete">
			<p>✅ Update completed!</p>
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
			deckDataIsUpdating: false,
			numberOfCardsUpdated: 0
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
		/**
		 * Add the `sideboard` object for any decks that may be lacking it. (Decks created from earlier app versions didn't have sideboards.)
		 */
		prepareDataUpdate () {
			if (!this.deckDataIsOutdated) return

			/* Reset the following data variables in case an update check is done more than once. */
			this.cardsToUpdate = []
			this.deckDataIsUpdating = false
			this.numberOfCardsUpdated = 0

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
			if (this.cardsToUpdate.length > 200) {
				this.$store.commit('idOfShowingDialog', 'tooManyCardsToUpdate')
			} else {
				this.deckDataIsUpdating = true

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

			this.deckObject.editDate = new Date()
			store.commit('showSideboard', false)

			this.$nextTick(() => {
				this.deckObject.dataVersion = this.latestDeckDataVersion
				store.commit('decks', store.state.decks)
			})

			setTimeout(() => {
				store.commit('idOfShowingDialog', {
					id: 'cardDataUpdateComplete',
					data: {
						callback: () => {
							this.deckDataIsUpdating = false
						}
					}
				})
			}, 125) // This slight delay allows the displayed updated percentage to reach "100%" before the alert message appears.
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
