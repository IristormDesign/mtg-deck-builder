<template>
	<div
		v-if="cardUpdateStatus > 0"
		class="outdated-deck-data-notice"
	>
		<aside v-if="cardUpdateStatus === 1">
			<h3>Deck Data Update</h3>
			<p>This deck has an outdated set of card data. Update it now to get enhanced features! See the June 1 <router-link to="/release-notes">release note</router-link> for more info.</p>
			<div class="button-container">
				<button @click="userEngagedUpdate()">Update</button>
			</div>
		</aside>

		<standard-dialog dialogID="tooManyCardsToUpdate">
			<p>Sorry, this deck’s data set can’t be updated because it has too many cards.</p>
		</standard-dialog>
		<standard-dialog dialogID="cardUpdateProgress">
			<div
				v-if="cardUpdateStatus === 2"
				slot="form" method="dialog"
				class="card-update-progress"
			>
				<p>Updating now&hellip;</p>
				<p>Progress: <strong class="updated-percentage">{{ updatedPercent }}%</strong></p>
			</div>

			<template v-else-if="cardUpdateStatus === 3">
				<h3>Update Countered</h3>
				<p>😖 Sorry—MTG Deck Builder couldn’t update your card data right now.</p>
				<p>Make sure that your computer or phone is currently connected to the Internet, and that the <a href="https://scryfall.com/" target="_blank">Scryfall<svg><use href="#open-in-new-icon" /></svg></a> website (where the card data is retrieved from) is live.</p>
				<p>If this error persists, try updating at a later time, or report this problem to the <router-link to="/contact">app developer</router-link>.</p>
			</template>

			<template v-else-if="cardUpdateStatus === 4">
				<p>✅ Update finished!</p>
			</template>
		</standard-dialog>
	</div>
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
			cardUpdateStatus: 0, /*
				Status codes:
				0 = No update available
				1 = Update available but not started yet
				2 = Update in progress
				3 = Update failed
				4 = Update successfully completed
			*/
			numberOfCardsUpdated: 0
		}
	},
	computed: {
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

			this.determineDeckDataVersion()
		}
	},
	mounted () {
		this.determineDeckDataVersion()
	},
	methods: {
		determineDeckDataVersion () {
			if (!this.deck) return // This condition is needed for 404 error pages.

			if (
				!this.deck.dataVersion ||
				this.deck.dataVersion < this.latestDeckDataVersion
			) {
				this.prepareDataUpdate()
			} else {
				this.cardUpdateStatus = 0
			}
		},
		prepareDataUpdate () {
			this.cardsToUpdate = [] // Reset this array in case an update check is done more than once.

			if (!this.deck.sideboard) { // Early versions of deck data didn't have the sideboard list. If the `sideboard` key is still missing from the `deck` object, then add it.
				this.deckObject.sideboard = {
					cards: [],
					viewedCard: null
				}
			}

			this.findOutdatedCards(this.deck)
			this.findOutdatedCards(this.deck.sideboard)

			if (this.cardsToUpdate.length > 0) {
				this.cardUpdateStatus = 1
			} else {
				this.deckObject.dataVersion = this.latestDeckDataVersion
				this.$store.commit('decks', this.$store.state.decks)
				this.cardUpdateStatus = 0
			}
		},
		findOutdatedCards (list) {
			for (const card of list.cards) {
				if (card.prodMana) continue // Any `card` object with the `prodMana` key means it's already on the latest data version.

				const dataToPush = {
					inSideboard: list === this.deck.sideboard,
					name: this.doubleFacedCardName(card),
					qty: card.qty,
					img: card.img,
					img2: card.img2,
					imgVersion: card.imgVersion,
					link: card.link
				}

				if (card.gapAfter === true) {
					dataToPush.gapAfter = true
				}

				this.cardsToUpdate.push(dataToPush)
			}
		},
		userEngagedUpdate () {
			if (this.cardsToUpdate.length > 200) {
				this.$store.commit('idOfShowingDialog', 'tooManyCardsToUpdate')
			} else {
				this.$store.commit('idOfShowingDialog', 'cardUpdateProgress')

				this.cardUpdateStatus = 2
				this.numberOfCardsUpdated = 0
				const cardsToUpdate = this.cardsToUpdate
				const callback = (hasError) => {
					if (hasError) {
						this.cardUpdateStatus = 3
					} else {
						this.numberOfCardsUpdated++

						if (this.numberOfCardsUpdated < cardsToUpdate.length) return

						this.finishUpdating()
					}
				}

				for (let i = 0; i < cardsToUpdate.length; i++) {
					setTimeout(() => {
						this.axiosRequestName(cardsToUpdate[i].name, callback, cardsToUpdate[i])
					}, i * 125) // Delay each request so that the Scryfall API doesn't get overloaded.
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
				this.cardUpdateStatus = 4
			}, 250) // This slight delay allows the displayed updated percentage to reach "100%" before the alert message appears.
		}
	}
}
</script>
