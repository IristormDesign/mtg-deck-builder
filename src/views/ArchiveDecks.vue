<template>
	<article class="deck-action-page content-box">
		<h2>Archive Decks</h2>
		<div class="intro">
			<figure class="card-illustration">
				<img
					src="@/img/sage's-reverie.jpg"
					srcset="@/img/sage's-reverie.jpg 1x, @/img/sage's-reverie@2x.jpg 2x"
					width="469" height="344"
					alt="An illustration of a monk magically moving many scrolls from glowing slots among many huge shelves of scrolls"
				/>
				<figcaption>Illustration from <a href="https://scryfall.com/card/woc/73/sages-reverie" target="_blank">Sage’s Reverie<svg><use href="#open-in-new-icon" /></svg></a> by Jason Rainville</figcaption>
			</figure>
			<p v-if="numExisting > 0 && !hasBeenArchived">In the checklist, select the decks that you want to save as a deck archive file. <router-link to="/guide/deck-page-header#archive-action" class="no-text-break">(More info&hellip;)</router-link></p>
		</div>
		<template v-if="!hasBeenArchived">
			<form v-if="numExisting > 0">
				<div
					class="multi-select-buttons"
					v-show="numExisting >= 3"
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
							@click="checkedDecks = []"
							:disabled="numChecked === 0"
							type="button"
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M872.62-103.39 607.85-368.16 495.38-255.69 283.23-467.85l42.15-43.38 170 170 68.31-69.08-410.92-410.92 42.15-43.38 719.85 719.84-42.15 41.38Zm-603.24-152.3L57.23-467.85 99.38-510l170 170 13.85-13.85 42.15 42.16-56 56ZM706-466.31l-42.15-42.15 198.3-198.31 43.39 40.92L706-466.31ZM592-579.54l-42.15-42.15 87.53-87.54 42.16 42.15L592-579.54Z"/></svg>
							Deselect All
						</button>
					</div>
				</div>
				<ul class="checklist" ref="checklist">
					<li v-for="deck in $store.state.decks" :key="deck.name">
						<input type="checkbox" :id="deck.name" :value="deck.name" v-model="checkedDecks">
						<label :for="deck.name">{{ deck.name }}</label>
					</li>
				</ul>
				<div class="button-container submit-button">
					<button
						@click.prevent="archiveSelectedDecks()"
						:disabled="numChecked <= 0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-256.16 146.15-146.15L584-444.46l-74 74v-178h-60v178l-74-74-42.15 42.15L480-256.16ZM200-643.85v431.54q0 5.39 3.46 8.85t8.85 3.46h535.38q5.39 0 8.85-3.46t3.46-8.85v-431.54H200ZM215.39-140q-29.93 0-52.66-22.73Q140-185.46 140-215.39v-464.38q0-12.84 4.12-24.5 4.11-11.65 12.34-21.5l56.16-67.92q9.84-12.85 24.61-19.58Q252-820 268.46-820h422.31q16.46 0 31.42 6.73T747-793.69L803.54-725q8.23 9.85 12.34 21.69 4.12 11.85 4.12 24.7v463.22q0 29.93-22.73 52.66Q774.54-140 744.61-140H215.39Zm.23-563.84H744l-43.62-51.93q-1.92-1.92-4.42-3.08-2.5-1.15-5.19-1.15H268.85q-2.69 0-5.2 1.15-2.5 1.16-4.42 3.08l-43.61 51.93ZM480-421.92Z"/></svg>
						Archive Selected
					</button>
				</div>
			</form>
			<div v-else class="result-message">
				<p>You have no decks.<br><router-link :to="{name: 'createDeck'}" class="no-text-break">(Create one!)</router-link></p>
			</div>
		</template>
		<div v-else class="result-message">
			<div>
				<p>
					<template v-if="numChecked === 1">
						<i>{{ checkedDecks[0] }}</i> is
					</template>
					<template v-else-if="numChecked === 2">
						<i>{{ checkedDecks[0] }}</i> and <i>{{ checkedDecks[1] }}</i> are
					</template>
					<template v-else>
						The {{ numChecked }} decks you’ve selected are
					</template>
					now archived.
				</p>
				<p>
					Anyone who has the archive file can then <router-link :to="{name: 'createDeck' }">replicate</router-link>
					<template v-if="numChecked === 1">
						that deck
					</template>
					<template v-else>
						those decks
					</template>
					contained in it.
				</p>
			</div>
		</div>
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
			hasBeenArchived: false
		}
	},
	computed: {
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
	metaInfo: {
		title: 'Archive Decks'
	},
	methods: {
		selectAll () {
			const checkboxes = this.$refs.checklist.querySelectorAll('input')

			this.checkedDecks = [] // First uncheck all decks in case any of them are already checked.

			checkboxes.forEach(checkbox => {
				this.checkedDecks.push(checkbox.value)
			})
		},
		archiveSelectedDecks () {
			this.removeAnyObsoleteKeys()

			const transitoryLink = document.createElement('a')

			transitoryLink.style.display = 'none'
			transitoryLink.setAttribute(
				'href', `data:text/plain;charset=utf-8,${this.generateJSON()}`
			)
			transitoryLink.setAttribute('download', this.setFileName())

			document.body.appendChild(transitoryLink)
			transitoryLink.click()
			document.body.removeChild(transitoryLink)

			setTimeout(() => {
				this.hasBeenArchived = true
			}, 250) // Allow some time for the file browser to appear before showing the result message.
		},
		removeAnyObsoleteKeys () {
			function perCard (card) {
				/* First check whether a `card` exists, and whether it has the object type (rather than the string type, as some old versions of `viewedCard` data used to be.). */
				if (!card || typeof card !== 'object') {
					return null
				}

				const obsoleteKeys = ['maxQty', 'starred', 'uniqueID']

				for (const key of obsoleteKeys) {
					if (key in card) {
						if (key === 'starred') {
							if (card[key] !== true) {
								delete card[key]
							}
						} else {
							delete card[key]
						}
					}
				}

				return card
			}

			this.$store.state.decks.forEach(deck => {
				deck.cards = deck.cards.map(
					card => perCard(card)
				)
				deck.sideboard.cards = deck.sideboard.cards.map(
					card => perCard(card)
				)

				deck.viewedCard = perCard(deck.viewedCard)
				deck.sideboard.viewedCard = perCard(deck.sideboard.viewedCard)
			})

			this.$store.commit('decks', this.$store.state.decks)
		},
		generateJSON () {
			let data = '{"decks":['

			this.sortCheckedDecksAlphabetically()

			for (let i = 0; i < this.numChecked; i++) {
				const deck = this.$store.state.decks.find(
					foundDeck => foundDeck.name === this.checkedDecks[i]
				)

				data += JSON.stringify(deck)

				/* When there are multiple decks to archive, insert a comma after each card object, except the last card object. */
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
	@use '@/sass/page-deck-actions.scss';
</style>
