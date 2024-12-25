<template>
	<article
		v-if="!isExported"
		class="deck-action-page export-decks content-box"
	>
		<h2>Export Decks</h2>
		<template v-if="numExisting <= 0">
			<p>You have no decks. <router-link :to="{name: 'createDeck'}">(Create one?)</router-link></p>
		</template>
		<template v-else>
			<p>In the checklist below, select the decks that you want to download as a deck data file, then click the Export Selected button. (For more info, see the user manual on <router-link :to="{path: '/manual/#storage-of-deck-data'}">how this app stores deck data</router-link>.)</p>
			<form>
				<div
					class="multi-select-buttons"
					v-show="numExisting >= 4"
				>
					<div class="button-container">
						<button
							@click="selectAll()"
							:disabled="numChecked === numExisting"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M268-253.85 55.85-466l42.77-42.15 170 170L282.46-352l42.16 42.15-56.62 56Zm226 0L281.85-466 324-508.77l170 170 368-368L904.15-664 494-253.85ZM480.15-466l-42.77-42.15 198-198L678.15-664l-198 198Z"/></svg>
							Select All
						</button>
					</div>
					<div class="button-container">
						<button
							@click="selectNone()"
							:disabled="numChecked === 0"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M872.62-103.39 607.85-368.16 495.38-255.69 283.23-467.85l42.15-43.38 170 170 68.31-69.08-410.92-410.92 42.15-43.38 719.85 719.84-42.15 41.38Zm-603.24-152.3L57.23-467.85 99.38-510l170 170 13.85-13.85 42.15 42.16-56 56ZM706-466.31l-42.15-42.15 198.3-198.31 43.39 40.92L706-466.31ZM592-579.54l-42.15-42.15 87.53-87.54 42.16 42.15L592-579.54Z"/></svg>
							Deselect All
						</button>
					</div>
				</div>
				<ul class="checklist">
					<li v-for="deck in $store.state.decks" :key="deck.name">
						<input type="checkbox" :id="deck.name" :value="deck.name" v-model="checkedDecks">
						<label :for="deck.name">{{ deck.name }}</label>
					</li>
				</ul>
				<div class="button-container submit-button">
					<button
						@click.prevent="exportSelectedDecks()"
						:disabled="numChecked <= 0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-480ZM209.67-86l-35-36 132.87-132.87H185.33v-50.26h207.46v207.46h-50.25v-121.2L209.67-86Zm261.07-14v-50.26h246.69q5.39 0 8.85-3.46t3.46-8.85V-620H540v-189.74H242.57q-5.39 0-8.85 3.46t-3.46 8.85v414.35H180v-414.35q0-25.71 18.43-44.14T242.57-860H570l210 210v487.43q0 25.71-18.43 44.14T717.43-100H470.74Z"/></svg>
						Export Selected
					</button>
				</div>
			</form>
		</template>
	</article>
	<article
		v-else
		class="action-done content-box"
	>
		<figure>
			<img class="intro-illustration" src="~@/img/island.jpg" width="626" height="457" alt="An illustration of ships sailing away from a port town" />
			<figcaption>Illustration: <a href="https://scryfall.com/card/afr/268/island" target="_blank"><i>Island</i> </a> [AFR] by Titus Lunter</figcaption>
		</figure>
		<p class="bigger">{{ this.exportedDecksMessage }}</p>
	</article>
</template>

<script>
export default {
	props: {
		presetDeckName: String
	},
	data () {
		return {
			checkedDecks: [],
			isExported: false
		}
	},
	computed: {
		exportedDecksMessage () {
			let message = ''

			if (this.numChecked === 1) {
				message += `“${this.checkedDecks[0]}” has`
			} else if (this.numChecked === 2) {
				message += `“${this.checkedDecks[0]}” and “${this.checkedDecks[1]}” have`
			} else {
				message += `The ${this.numChecked} decks you’ve selected have`
			}

			message += ' now been exported'

			if (this.numChecked > 1) message += ' together'

			return message + ' as a deck data file.'
		},
		numChecked () {
			return this.checkedDecks.length
		},
		numExisting () {
			return this.$store.state.decks.length
		}
	},
	mounted () {
		if (this.presetDeckName) {
			this.checkedDecks.push(this.presetDeckName)
		}
	},
	methods: {
		selectAll () {
			const checkboxes = document
				.querySelector('.export-decks .checklist')
				.querySelectorAll('input')

			this.checkedDecks = [] // First uncheck all decks in case any of them are already checked.

			checkboxes.forEach(checkbox => {
				this.checkedDecks.push(checkbox.value)
			})
		},
		selectNone () {
			this.checkedDecks = []
		},
		exportSelectedDecks () {
			const transitoryLink = document.createElement('a')

			transitoryLink.style.display = 'none'
			transitoryLink.setAttribute(
				'href', `data:text/plain;charset=utf-8,${this.generateJSON()}`
			)
			transitoryLink.setAttribute('download', this.setFileName())

			document.body.appendChild(transitoryLink)
			transitoryLink.click()
			document.body.removeChild(transitoryLink)

			this.isExported = true
		},
		generateJSON () {
			let data = '{"decks":['

			this.sortCheckedDecksAlphabetically()

			for (let i = 0; i < this.numChecked; i++) {
				const deck = this.$store.state.decks.find(
					foundDeck => foundDeck.name === this.checkedDecks[i]
				)

				data += JSON.stringify(deck)

				/* When there are multiple decks to export, insert a comma after each card object, except the last card object. */
				if (this.numChecked > 1 && i !== this.numChecked - 1) {
					data += ','
				}
			}

			data += ']}'

			return data
		},
		sortCheckedDecksAlphabetically () {
			this.checkedDecks.sort((a, b) => {
				const deckA = a.toUpperCase()
				const deckB = b.toUpperCase()

				if (deckA > deckB) return 1
				else if (deckA < deckB) return -1
				else return 0
			})
		},
		setFileName () {
			if (this.numChecked > 1) {
				return 'My Decks.deck'
			} else {
				return `${this.checkedDecks[0]}.deck`
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
