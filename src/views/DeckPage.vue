<template>
	<article
		v-if="this.validDeck"
		class="deck wrap"
		:class="($store.state.showSideboard) ? 'sideboard-visible' : null"
	>
		<header class="deck-header">
			<deck-name :deck="deck" />
			<deck-colors :deck="deck" />
			<average-mana-value :deck="deck" />
			<date-edited :deck="deck" />
			<card-names :deck="deck" />
			<card-total :deck="deck" />
			<modes-menu />
		</header>

		<update-data-notice :deck="deck" />

		<router-view />
	</article>

	<not-found-content v-else />
</template>

<script>
import DeckName from '@/components/deck-page/DeckName.vue'
import DeckColors from '@/components/deck-page/StatDeckColors.vue'
import AverageManaValue from '@/components/deck-page/StatAverageManaValue.vue'
import DateEdited from '@/components/deck-page/StatDateEdited.vue'
import CardNames from '@/components/deck-page/StatCardNames.vue'
import CardTotal from '@/components/deck-page/StatCardTotal.vue'
import ModesMenu from '@/components/deck-page/ModesMenu.vue'
import UpdateDataNotice from '@/components/deck-page/UpdateDataNotice.vue'
import NotFoundContent from '@/components/NotFoundContent.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, ModesMenu, UpdateDataNotice, NotFoundContent },
	mixins: [getActiveDeck],
	data () {
		return {
			dataModified: false
		}
	},
	computed: {
		validDeck () {
			return this.$store.state.decks.find(deck =>
				this.$route.params.deckPath.toLowerCase() === deck.path
			)
		}
	},
	watch: {
		$route (curRoute, prevRoute) {
			if ( // If only switching deck modes...
				prevRoute &&
				curRoute.params.deckPath !== prevRoute.params.deckPath
			) {
				this.showStarredCardIfAvailable(curRoute, prevRoute)
			} else {
				this.autoScrollDown()
			}
		}
	},
	created () {
		this.$store.commit('showSideboard', false)
		this.prepareDecksWithOutdatedData()
		this.showStarredCardIfAvailable()
	},
	beforeRouteUpdate (to, from, next) {
		this.$store.commit('showSideboard', false)
		this.$store.commit('focusCardButton', null)

		next()

		this.prepareDecksWithOutdatedData()
	},
	methods: {
		showStarredCardIfAvailable () {
			const deck = this.deck

			if (deck.viewedStarredCard) {
				deck.viewedCard = deck.viewedStarredCard
			}
			if (deck.sideboard.viewedStarredCard) {
				deck.sideboard.viewedCard = deck.sideboard.viewedStarredCard
			}

			this.$store.commit('decks', this.$store.state.decks)
		},
		prepareDecksWithOutdatedData () {
			if (this.deck) { // This check is needed for 404 deck pages.
				this.addMissingSideboard()
				this.checkForDataVersion()

				this.$nextTick(() => {
					if (this.dataModified) {
						this.$store.commit('decks', this.$store.state.decks)
					}
				})
			}
		},
		/**
		 * If the deck's data version number doesn't match the latest version number, then determine what its version number should be.
		 */
		checkForDataVersion () {
			if (this.deck.dataVersion !== this.$store.state.latestDeckDataVersion) {
				this.deck.dataVersion = this.determinedDataVersion()

				this.dataModified = true
			}
		},
		/**
		 * @returns {number} Version number
		 */
		determinedDataVersion () {
			for (const card of this.deck.cards) {
				if (!card.keywords) { // For any card, even one that has no keywords, its `card` object should have a `keywords` key assigned to an array, whether empty or not. Also, the `power` and `toughness` keys were added at the same time as the `keywords` key, so if `keywords` doesn't exist, then neither do `power` or `toughness`.
					return 1
				}
			}
			return this.$store.state.latestDeckDataVersion

			// The sideboard's cards are intentionally not checked for the `keywords` key, because the sideboard feature had been released after `keywords`.
		},
		/**
		 * Add the `sideboard` object for any decks that are missing it. (Decks created from earlier app versions didn't have sideboards.)
		 */
		addMissingSideboard () {
			if (!this.deck.sideboard) {
				this.deck.sideboard = {
					cards: [],
					viewedCard: ''
				}
				this.dataModified = true
			}
		},
		autoScrollDown () {
			this.$nextTick(() => {
				const destination = document.querySelector('.deck-modes')

				if (destination) {
					destination.scrollIntoView({
						behavior: 'instant'
					})
				}
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-general.scss';
</style>
