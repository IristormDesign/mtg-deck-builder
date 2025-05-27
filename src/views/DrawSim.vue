<template>
	<div
		class="draw-simulator"
		role="tabpanel" aria-labelledby="draw-simulator-tab"
	>
		<div class="layout-column">
			<div class="control-panel">
				<section class="deck-info">
					<h3>Cards&nbsp;in Library</h3>
					<div
						class="output"
						:title="(library.length === 0 && drawnList.length > 0) ? 'You’ve drawn every card from your library.' : null"
					>
						{{ library.length }}
						<svg
							v-show="(library.length === 0 && drawnList.length > 0)"
							class="warning-symbol"
							xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M22.62-98 480-886 937.38-98H22.62ZM481-220.69q18.73 0 32.02-13.29 13.29-13.29 13.29-32.02 0-18.73-13.29-32.02-13.29-13.29-32.02-13.29-18.73 0-32.02 13.29-13.29 13.29-13.29 32.02 0 18.73 13.29 32.02 13.29 13.29 32.02 13.29Zm-43-127.62h86v-204h-86v204Z"
						/></svg>
					</div>
				</section>
				<section class="deck-info">
					<h3>Drawn Cards</h3>
					<div class="output">{{ drawnList.length }}</div>
				</section>
				<div class="button-container">
					<button
						class="draw-card"
						@click="handleClickOfDrawButton()"
						:disabled="library.length === 0"
						:title="(library.length === 0 && drawnList.length > 0) ? 'There are no cards left to draw.' : '[Space]'"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M602.61-383.39 642.85-529l-124.7-86.08-40.23 145.62 124.69 86.07Zm-430.3 185.62-24.92-11.77Q116-222.92 105-254.61q-11-31.7 3-62.31l64.31-138.69v257.84ZM340-124.62q-33 0-56.5-23.8-23.5-23.81-23.5-56.81v-214l97.77 268.61q3 7.39 5.38 13.7 2.39 6.3 7.39 12.3H340Zm190.23-21.92q-28.31 10.23-55.84-2.23-27.54-12.46-37.77-40.77L266.92-657q-10.23-28.31 2.43-55.54Q282-739.77 310.31-750L589-851.92q28.31-10.23 55.54 2.42 27.23 12.66 37.46 40.96l170.31 467.46q10.23 28.31-2.23 55.54-12.47 27.23-40.77 37.46L530.23-146.54Zm-20.69-56.92L788.46-305q5-1.92 7.12-6.35 2.11-4.42.19-9.42L625.62-787.69q-1.93-5-6.35-7.12-4.42-2.11-9.42-.19L331.54-693.46q-5 1.92-7.12 6.34-2.11 4.43-.19 9.43l169.54 466.92q1.92 5 6.35 7.12 4.42 2.11 9.42.19ZM560-499.23Z"/></svg>
						Draw {{ isHoldingShift ? '10 Cards' : 'a Card' }}
					</button>
					<button
						class="restart"
						@click="restart()"
						:disabled="drawnList.length === 0"
						title="[R]"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-60q-76.77 0-144.59-29.37-67.82-29.37-118.25-79.79-50.42-50.43-79.79-118.25Q108-355.23 108-432h86q0 119 83.5 202.5T480-146q119 0 202.5-83.5T766-432q0-119-83.5-202.5T480-718h-4.62l61.54 61.54-60.15 63.38-166.92-167.3 167.69-167.31 60.15 61.38L475.38-804H480q76.77 0 144.59 29.37 67.82 29.37 118.25 79.79 50.42 50.43 79.79 118.25Q852-508.77 852-432q0 76.77-29.37 144.59-29.37 67.82-79.79 118.25-50.43 50.42-118.25 79.79Q556.77-60 480-60Z"/></svg>
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
					<div
						v-if="deck.cards.some(card => card.starred)"
						class="checkbox-container"
					>
						<input
							type="checkbox" id="exclude-starred"
							v-model="isExcludingStarred"
						/>
						<label for="exclude-starred">Exclude starred cards</label>
					</div>
					<footer class="notes">
						<p>To begin, click the Draw a Card button. Click it while holding <kbd class="shift-key">Shift</kbd> to draw 10 at once. Learn more in the <router-link to="/guide/draw-sim">User Guide</router-link>.</p>
					</footer>
				</div>
				<div
					v-else
					class="no-cards"
				>
					<div
						v-if="deck.cards.some(card => card.starred)"
						class="checkbox-container"
					>
						<input
							type="checkbox" id="exclude-starred"
							v-model="isExcludingStarred"
						/>
						<label for="exclude-starred">Exclude starred cards</label>
					</div>
					<p>To be able to use the Draw Simulator, first add cards to your deck’s main card group in the <router-link :to="{name: 'listEditor'}">List Editor</router-link>.</p>
				</div>
			</section>
		</div>

		<card-image
			:deck="deck"
			:drawnCards="drawnList.length"
		/>
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
			isHoldingShift: false,
			isExcludingStarred: this.deck.drawingExcludeStarred,
			library: []
		}
	},
	computed: {
		reshuffleConditions () {
			const drawnList = this.drawnList
			const cardName = this.library[0].name

			return (
				!this.afterReshuffle && // If the library was *not* just reshuffled, and...
				( // If the drawn card has the same name as either the 1st- or 2nd-previously drawn cards...
					(drawnList[0] && drawnList[0].name === cardName) ||
					(drawnList[1] && drawnList[1].name === cardName)
				) &&
				Math.random() < 2 / 3 // With a little extra randomness mixed in
			)
		}
	},
	mounted () {
		this.prepareCards()

		document.addEventListener(
			'keydown', this.listenForDrawSimKeydownEvents
		)
		document.addEventListener(
			'keyup', this.listenForDrawSimKeyupEvents
		)
	},
	destroyed () {
		document.removeEventListener(
			'keydown', this.listenForDrawSimKeydownEvents
		)
		document.removeEventListener(
			'keyup', this.listenForDrawSimKeyupEvents
		)
	},
	watch: {
		isExcludingStarred () {
			this.library = []
			this.prepareCards()

			this.deckObject.drawingExcludeStarred = this.isExcludingStarred
			this.$store.commit('decks', this.$store.state.decks)
		}
	},
	metaInfo () {
		return {
			title: this.deck.name + ' · Draw Simulator'
		}
	},
	methods: {
		listenForDrawSimKeydownEvents (event) {
			this.isHoldingShift = event.shiftKey
		},
		listenForDrawSimKeyupEvents (event) {
			this.isHoldingShift = event.shiftKey
		},
		prepareCards () {
			this.$store.commit('viewedDrawnCard', null)

			if (this.drawnList.length === 0) {
				this.deck.cards.forEach(card => {
					if (this.isExcludingStarred && card.starred) return

					for (let i = 0; i < card.qty; i++) {
						this.library.push(card)
					}
				})
			} else {
				this.library.push(...this.drawnList)
				this.drawnList = []
			}

			this.$nextTick(() => { // `$nextTick()` might not be absolutely needed here, but it ensures that all the cards have been prepared before shuffling.
				this.shuffleLibrary()
			})
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
		handleClickOfDrawButton () {
			if (this.isHoldingShift) {
				for (let i = 0; i < 10; i++) {
					if (i === 0) {
						this.drawCard()
					} else {
						this.drawCard(false)
					}
				}
			} else {
				this.drawCard()
			}
		},
		drawCard (showCard = true) {
			const card = this.library[0]

			if (!card) return

			if (this.reshuffleConditions) {
				this.shuffleLibrary()
				this.afterReshuffle = true
				this.drawCard(showCard)
			} else {
				this.library.splice(0, 1)
				this.drawnList.unshift(card)
				if (
					!this.isMobileLayout() &&
					(
						showCard ||
						this.library.length === 0
					)
				) {
					this.viewCard(card)
				}
				this.afterReshuffle = false
			}
		},
		restart () {
			this.prepareCards()
		}
	}
}
</script>

<style lang="scss">
	@use '@/sass/card-list.scss';
	@use '@/sass/page-draw-simulator.scss';
</style>
