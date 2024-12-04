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
		</header>

		<div class="deck-action-bar">
			<deck-mode-heading />
			<mode-menu />
			<deck-actions :deck="deck" />
		</div>

		<update-data-notice :deck="deck" />

		<router-view :deck="deck" />
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
import DeckModeHeading from '@/components/deck-page/DeckModeHeading.vue'
import ModeMenu from '@/components/deck-page/ModeMenu.vue'
import DeckActions from '@/components/deck-page/DeckActions.vue'
import UpdateDataNotice from '@/components/deck-page/UpdateDataNotice.vue'
import NotFoundContent from '@/components/NotFoundContent.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import cardListFunctions from '@/mixins/cardListFunctions.js'
import keyboardShortcuts from '@/mixins/keyboardShortcuts.js'

export default {
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, DeckModeHeading, ModeMenu, DeckActions, UpdateDataNotice, NotFoundContent },
	mixins: [getActiveDeck, cardListFunctions, keyboardShortcuts],
	computed: {
		validDeck () {
			return this.$store.state.decks.find(deck =>
				this.$route.params.deckPath.toLowerCase() === deck.path
			)
		}
	},
	watch: {
		$route (curRoute, prevRoute) {
			if (curRoute.params.deckPath === prevRoute.params.deckPath) { // If only switching between deck page modes for the same deck...
				this.scrollToActionBar()
			} else { // Else going from one deck's page to a different deck's.
				this.showStarredCardIfAvailable()
			}

			this.$store.commit('focusCardBar', null)
			this.$store.commit('showSideboard', false)
		}
	},
	created () {
		this.showStarredCardIfAvailable()
		this.$store.commit('showSideboard', false)
	},
	methods: {
		showStarredCardIfAvailable () {
			const deck = this.deck

			if (!deck) return

			if (deck.viewedStarredCard) {
				deck.viewedCard = deck.viewedStarredCard
			}

			if (
				deck.sideboard &&
				deck.sideboard.viewedStarredCard
			) {
				deck.sideboard.viewedCard = deck.sideboard.viewedStarredCard
			}

			this.$store.commit('decks', this.$store.state.decks)
		},
		/* If the deck action bar is in view on the page, then hold the page's existing position. Otherwise, make the page scroll to the deck action bar. */
		scrollToActionBar () {
			const prevPagePosition = window.scrollY
			const actionBar = document.querySelector('.deck-action-bar')

			this.$nextTick(() => {
				window.scroll(0, prevPagePosition)

				actionBar.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest'
				})
			})
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-page-general.scss';
	@import '@/sass/deck-header.scss';
	@import '@/sass/deck-action-bar.scss';
</style>
