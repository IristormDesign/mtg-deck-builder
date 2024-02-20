<template>
	<div class="draw-simulator">
		<div class="card-image-scroll-view">
			<div class="deck-main">
				<div class="deck-control-panel">
					<section class="deck-info">
						<h3>Cards&nbsp;in Library</h3>
						<div class="output">{{ library.length }}</div>
					</section>
					<section class="deck-info">
						<h3>Drawn Cards</h3>
						<div class="output">{{ drawnList.length }}</div>
					</section>
					<button
						@click="drawCard()"
						:disabled="library.length === 0"
						:title="(library.length) === 0 ? 'There are no more cards left to draw.' : null"
					>Draw a Card</button>
					<button
						@click="restart()"
						:disabled="drawnList.length === 0"
					>Restart</button>
				</div>
				<section class="card-list-section">
					<header class="screen-readers-only">
						<h3>Drawn Cards</h3>
					</header>
					<ul v-if="drawnList.length > 0">
						<li v-for="(card, i) in drawnList" :key="i">
							<card-star :card="card" :deck="deck" :i="i" />
							<card-button :card="card" :deck="deck" />
						</li>
					</ul>
					<div
						v-else-if="library.length > 0"
						class="no-cards"
					>
						<p>Each card you draw will be listed here.</p>
						<p>To begin, click on the “Draw a Card” button.</p>
					</div>
					<div
						v-else
						class="no-cards"
					>
						<p>This deck hasn’t been built yet, so there are no cards to draw.</p>
						<p>To use the draw simulator, first add cards to the deck’s main card group in the <router-link :to="{name: 'deckEditor'}">deck editor</router-link>.</p>
					</div>
				</section>
			</div>

			<card-image :deck="deck" />
		</div>
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
			library: [],
			viewedCardBefore: ''
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
		this.viewedCardBefore = this.deck.viewedCard

		this.prepareCards()
	},
	destroyed () {
		this.deck.viewedCard = this.viewedCardBefore
	},
	methods: {
		prepareCards () {
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
			this.deck.viewedCard = null
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
					this.deck.viewedCard = card.name
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
	@import '@/sass/page-draw-simulator.scss';
</style>
