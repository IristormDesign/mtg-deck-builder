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

		<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
			<symbol id="star-icon" viewBox="0 -960 960 960">
				<path d="m244-136 89-290L98-595h290l92-305 92 305h290L627-426l89 290-236-179-236 179Z" />
			</symbol>
			<symbol id="left-arrow-icon" viewBox="0 -960 960 960">
				<path d="m326.15-434.5 218.74 218.74L480-151.87 151.87-480 480-808.13l64.89 63.89L326.15-525.5h481.98v91H326.15Z"/>
			</symbol>
			<symbol id="right-arrow-icon" viewBox="0 -960 960 960">
				<path d="M633.85-434.5H151.87v-91h481.98L415.11-744.24 480-808.13 808.13-480 480-151.87l-64.89-63.89L633.85-434.5Z"/>
			</symbol>
		</svg>
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
