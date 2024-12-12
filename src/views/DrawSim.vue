<template>
	<div class="draw-simulator">
		<div class="layout-column">
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
						class="draw-card"
						@click="drawCard()"
						:disabled="library.length === 0"
						:title="(library.length === 0 && drawnList.length > 0) ? 'There are no cards left to draw.' : '(Space)'"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m600.69-386.62 38.92-141.57-120.96-83.65-39.11 141.57 121.15 83.65ZM183.62-197.46l-28.96-12.58q-30.99-13.01-41.94-44.39-10.95-31.38 3.05-61.68l67.85-146.46v265.11Zm162.54 68q-32.78 0-55.99-23.48t-23.21-56.02v-216.42l98.08 270.73q2.69 7.38 5.48 13.44 2.79 6.06 7.29 11.75h-31.65Zm181.65-24.04q-26.69 9.92-52.46-1.73-25.77-11.66-35.5-38.35L271.46-656.19q-9.92-26.69 2-52.4 11.92-25.71 38.96-35.45l275.77-100.3q26.7-9.74 52.41 2.16 25.7 11.9 35.44 38.49l168.69 462.61q9.73 26.7-2 52.41-11.72 25.7-38.58 35.25L527.81-153.5Zm-19.39-53.19 275.69-99.92q4.81-1.93 6.93-6.35 2.11-4.43.38-9.43L624-783.65q-1.92-5-6.35-7.12-4.42-2.11-9.42-.19l-275.38 99.92q-5 1.92-7.12 6.35-2.11 4.42-.19 9.42L492.65-214q1.73 5 6.25 7.12 4.52 2.11 9.52.19Zm49.96-292.23Z"/></svg>
						Draw a Card
					</button>
					<button
						class="restart"
						@click="restart()"
						:disabled="drawnList.length === 0"
						title="(R)"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80Z"/></svg>
						Restart
					</button>
				</div>
			</div>

			<section class="card-list-section">
				<header class="screen-readers-only">
					<h3>Drawn Cards</h3>
				</header>
				<ul v-if="drawnList.length > 0">
					<li v-for="(card, i) in drawnList" :key="i">
						<card-star :card="card" :deck="deck" :i="i" />
						<card-bar :card="card" :deck="deck" :i="i" />
					</li>
				</ul>
				<div
					v-else-if="library.length > 0"
					class="no-cards"
				>
					<p>Your library is now shuffled.</p>
					<p>To begin, click the “Draw a Card” button. For help, see the <router-link to="/manual/#draw-sim">user manual</router-link>.</p>
				</div>
				<div
					v-else
					class="no-cards"
				>
					<p>To be able to use the Draw Simulator, first add cards to your deck’s main card group in the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
				</div>
			</section>
		</div>

		<card-image :deck="deck" />
	</div>
</template>

<script>
import CardImage from '@/components/deck-page/CardImage.vue'
import CardStar from '@/components/deck-page/CardStar.vue'
import CardBar from '@/components/deck-page/CardBar.vue'
import cardListFunctions from '@/mixins/cardListFunctions.js'

export default {
	components: { CardImage, CardStar, CardBar },
	mixins: [cardListFunctions],
	props: {
		deck: Object
	},
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
				!this.afterReshuffle && // If the library had *not* just been reshuffled, and...
				Math.random() < (2 / 3) && // With a little randomness mixed in, and...
				( // If the drawn card has the same name as either the 1st-, 2nd-, or 3rd-previous drawn card...
					(drawnList[0] && drawnList[0].name === cardName) ||
					(drawnList[1] && drawnList[1].name === cardName) ||
					(drawnList[2] && drawnList[2].name === cardName)
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

			while (counter > 0) {
				/* Pick a random index. */
				const index = Math.floor(Math.random() * counter)

				/* Decrease counter by 1. */
				counter--

				/* Swap the last element with the element at the randomly picked index. */
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
					if (!this.isMobileLayout()) {
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
