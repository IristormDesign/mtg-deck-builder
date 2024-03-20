<template>
	<div class="draw-simulator">
		<div class="control-panel">
			<section class="deck-info">
				<h3>Cards&nbsp;in Library</h3>
				<div class="output">
					{{ library.length }}
					<span
						class="warning-symbol"
						v-show="(library.length === 0 && drawnList.length > 0)"
						title="You’ve drawn every card from your library."
					>⚠</span>
				</div>
			</section>
			<section class="deck-info">
				<h3>Drawn Cards</h3>
				<div class="output">{{ drawnList.length }}</div>
			</section>
			<div class="button-container">
				<button
					@click="drawCard()"
					:disabled="library.length === 0"
					:title="(library.length === 0 && drawnList.length > 0) ? 'There are no cards left to draw.' : null"
				>Draw a Card</button>
				<button
					@click="restart()"
					:disabled="drawnList.length === 0"
				>Restart</button>
			</div>
		</div>

		<section class="card-list-section">
			<header class="screen-readers-only">
				<h3>Drawn Cards</h3>
			</header>
			<ul v-if="drawnList.length > 0">
				<li v-for="(card, i) in drawnList" :key="i">
					<card-star :card="card" :deck="deck" :i="i" />
					<card-button :card="card" :deck="deck" :i="i" />
				</li>
			</ul>
			<div
				v-else-if="library.length > 0"
				class="no-cards"
			>
				<p>Your library is now shuffled. Each card you draw from it will be listed here.</p>
				<p>To begin, click the “Draw a Card” button.</p>
			</div>
			<div
				v-else
				class="no-cards"
			>
				<p>To be able to use the Draw Simulator, first add cards to your deck’s main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
			</div>
		</section>

		<card-image :deck="deck" />
	</div>
</template>

<script>
import CardImage from '@/components/DeckCardImage.vue'
import CardStar from '@/components/DeckCardStar.vue'
import CardButton from '@/components/DeckCardButton.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { CardImage, CardStar, CardButton },
	mixins: [cardListFunctions, getActiveDeck],
	data () {
		return {
			afterReshuffle: false,
			drawnList: [],
			library: []
		}
	},
	computed: {
		reshuffleConditions () {
			const drawnList = this.drawnList
			const cardName = this.library[0].name

			return (
				!this.afterReshuffle && // If the library had *not* just been reshuffled; and...
				(	// If the drawn card has the same name as either the 1st-, 2nd-, or 3rd-previous drawn card, with a little randomness mixed in...
					(
						drawnList[0] &&
						drawnList[0].name === cardName &&
						Math.random() < 0.75
					) || (
						drawnList[1] &&
						drawnList[1].name === cardName &&
						Math.random() < 0.5
					) || (
						drawnList[2] &&
						drawnList[2].name === cardName &&
						Math.random() < 0.25
					)
				)
			)
		}
	},
	mounted () {
		this.prepareCards()
	},
	methods: {
		prepareCards () {
			this.$store.commit('viewedDrawnCard', null)

			if (this.drawnList.length === 0) {
				this.deck.cards.forEach(card => {
					for (let i = 0; i < card.qty; i++) {
						this.library.push(card)
					}
				})
			} else {
				this.library.push(...this.drawnList)
				this.drawnList = []
			}

			this.shuffleLibrary()
		},
		/**
		 * Shuffle the deck's cards using the Fisher-Yates method of array randomization.
		 */
		shuffleLibrary () {
			const array = this.library
			let counter = array.length

			// While there are elements in the array...
			while (counter > 0) {
				// Pick a random index.
				const index = Math.floor(Math.random() * counter)

				// Decrease counter by 1.
				counter--

				// Swap the last element with it.
				const temp = array[counter]
				array[counter] = array[index]
				array[index] = temp
			}
		},
		drawCard () {
			const card = this.library[0]

			if (card) {
				if (this.reshuffleConditions) {
					this.shuffleLibrary()
					this.afterReshuffle = true
					this.drawCard()
				} else {
					this.library.splice(0, 1)
					this.drawnList.unshift(card)
					if (!this.$store.state.isMobileLayout()) {
						this.viewCard(card)
					}
					this.afterReshuffle = false
				}
			}
		},
		restart () {
			this.prepareCards()
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/card-list.scss';
	@import '@/sass/page-draw-simulator.scss';
</style>
