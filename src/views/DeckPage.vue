<template>
	<article
		v-if="this.validDeck"
		class="deck wrap"
		:class="($store.state.showSideboard) ? 'sideboard-visible' : null"
	>
		<deck-page-svg-symbols />

		<header class="deck-header">
			<section class="deck-info deck-name">
				<h2>{{ deck.name }}</h2>
			</section>
			<deck-colors :deck="deck" />
			<average-mana-value :deck="deck" />
			<date-edited :deck="deck" />
			<card-names :deck="deck" />
			<card-total :deck="deck" />
		</header>

		<div class="deck-action-bar">
			<mode-menu :deck="deck" />
			<deck-actions :deck="deck" />
		</div>

		<update-data-notice :deck="deck" />
		<router-view :deck="deck" />
		<dialogs-card-requests />
	</article>

	<not-found-content v-else />
</template>

<script>
import DeckPageSvgSymbols from '@/components/deck-page/DeckPageSvgSymbols.vue'
import DeckColors from '@/components/deck-page/StatDeckColors.vue'
import AverageManaValue from '@/components/deck-page/StatAverageManaValue.vue'
import DateEdited from '@/components/deck-page/StatDateEdited.vue'
import CardNames from '@/components/deck-page/StatCardNames.vue'
import CardTotal from '@/components/deck-page/StatCardTotal.vue'
import ModeMenu from '@/components/deck-page/ModeMenu.vue'
import DeckActions from '@/components/deck-page/DeckActions.vue'
import UpdateDataNotice from '@/components/deck-page/UpdateDataNotice.vue'
import DialogsCardRequests from '@/components/deck-page/DialogsCardRequests.vue'
import NotFoundContent from '@/components/NotFoundContent.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'
import cardListFunctions from '@/mixins/cardListFunctions.js'
import keyboardShortcuts from '@/mixins/keyboardShortcuts.js'

export default {
	components: { DeckPageSvgSymbols, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, ModeMenu, DeckActions, UpdateDataNotice, DialogsCardRequests, NotFoundContent },
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

			this.updateOpenDate()
		}
	},
	created () {
		this.showStarredCardIfAvailable()
		this.$store.commit('showSideboard', false)
		this.updateOpenDate()
	},
	methods: {
		showStarredCardIfAvailable () {
			const deck = this.deck

			if (!deck) return

			if (deck.viewedStarredCard) {
				this.$set(deck, 'viewedCard', deck.viewedStarredCard)
			}

			if (
				deck.sideboard &&
				deck.sideboard.viewedStarredCard
			) {
				this.$set(deck.sideboard, 'viewedCard', deck.sideboard.viewedStarredCard)
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
		},
		updateOpenDate () {
			if (!this.deck) return

			this.deck.openDate = new Date()
			this.$store.commit('decks', this.$store.state.decks)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-deck-page-general.scss';
	@use '@/sass/deck-header.scss';
	@use '@/sass/deck-action-bar.scss';
</style>
