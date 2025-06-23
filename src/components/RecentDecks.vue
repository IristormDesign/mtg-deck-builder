<template>
	<section
		v-if="recentDecks.length > 0"
		class="recent-decks"
	>
		<nav>
			<h3>Recently Opened</h3>
			<ul>
				<li
					v-for="deck in recentDecks"
					:key="deck.name"
				>
					<router-link
						:to="{
							name: 'listEditor',
							params: {
								deck: deck,
								deckPath: deck.path
							}
						}"
					>
						<span class="deck-name">
							{{ deck.name }}
						</span>
						<div class="deck-colors">
							<div
								:class="sizeManaSymbols(deck)"
								v-html="renderManaSymbols(deck)"
							></div>
						</div>
					</router-link>
				</li>
			</ul>
		</nav>
	</section>
</template>

<script>
import deckColors from '@/mixins/deckColors.js'
import symbolsMarkup from '@/mixins/symbolsMarkup.js'

export default {
	mixins: [deckColors, symbolsMarkup],
	data () {
		return {
			recentDecks: []
		}
	},
	watch: {
		'$route' (to, from) {
			/* If the route went from one deck's page to a different deck's page... */
			if (to.params.deckPath !== from.params.deckPath) {
				this.sortDecksByOpenDate()
			}
		},
		'$store.state.decks.length' (newLength, oldLength) {
			/* If the number of stored decks has changed... */
			if (newLength !== oldLength) {
				this.sortDecksByOpenDate()
			}
		}
	},
	mounted () {
		this.sortDecksByOpenDate()
	},
	methods: {
		sortDecksByOpenDate () {
			let sortedDecks = [...this.$store.state.decks]

			/* From the array of decks to show, exclude the currently open deck. */
			sortedDecks = sortedDecks.filter(
				deck => !this.getCurrentDeck(deck)
			)

			/* Sort decks by their open date, most recent first. */
			sortedDecks = sortedDecks.sort((a, b) => {
				return new Date(b.openDate || b.editDate) - new Date(a.openDate || a.editDate)
			})

			/* Set the maximum number of recent decks to display at a time. */
			this.recentDecks = sortedDecks.slice(0, 5)
		},
		getCurrentDeck (deck) {
			return this.$route.path.toLowerCase().includes(`/deck/${deck.path}/`)
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/recent-decks.scss';
</style>
