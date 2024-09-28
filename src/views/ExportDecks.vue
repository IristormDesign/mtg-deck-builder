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
						>Select All</button>
					</div>
					<div class="button-container">
						<button
							@click="selectNone()"
							:disabled="numChecked === 0"
							type="button"
						>Deselect All</button>
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
					>Export Selected</button>
				</div>
			</form>
		</template>
	</article>
	<article
		v-else
		class="action-done content-box"
	>
		<figure>
			<img class="intro-illustration" src="~@/img/island.jpg" width="626" height="457" alt="Illustration of ships sailing away from a port town" />
			<figcaption>(Illustration: <a href="https://scryfall.com/card/afr/268/island" target="_blank"><i>Island</i> </a> [AFR] by Titus Lunter)</figcaption>
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

				// When there are multiple decks to export, insert a comma after each card object, except the last card object.
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
