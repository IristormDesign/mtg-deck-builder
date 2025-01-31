<template>
	<article
		v-if="!isArchived"
		class="deck-action-page archive-decks content-box"
	>
		<h2>Archive Decks</h2>
		<template v-if="numExisting <= 0">
			<p>You have no decks. <router-link :to="{name: 'createDeck'}">(Create one?)</router-link></p>
		</template>
		<template v-else>
			<header class="intro">
				<p>In the checklist below, select the decks that you want to save as a deck archive file, then click the Archive Selected button. <router-link :to="{path: '/guide/#archive-action'}">(More info&hellip;)</router-link></p>
			</header>
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
						@click.prevent="archiveSelectedDecks()"
						:disabled="numChecked <= 0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-270.77 144.26-144.26-34.31-34.3-84.82 84.82v-194.1h-50.26v194.1l-84.82-84.82-34.31 34.3L480-270.77ZM190.26-660.36v457.79q0 5.39 3.46 8.85t8.85 3.46h554.86q5.39 0 8.85-3.46t3.46-8.85v-457.79H190.26ZM205.64-140q-25.7 0-45.67-19.97Q140-179.94 140-205.64v-479q0-10.61 3.37-20.53 3.37-9.91 10.12-18.29l57.23-72.8q8.36-11.1 21.42-17.42Q245.2-820 259.8-820h439.22q14.6 0 27.85 6.32 13.26 6.32 21.62 17.42l58.02 73.57q6.75 8.37 10.12 18.48Q820-694.1 820-683.49v477.85q0 25.7-19.97 45.67Q780.06-140 754.36-140H205.64Zm.64-570.61h546.39l-44.78-54.9q-1.93-1.93-4.43-3.08-2.5-1.15-5.19-1.15H260.59q-2.69 0-5.32 1.15-2.63 1.15-4.29 3.08l-44.7 54.9ZM480-425.31Z"/></svg>
						Archive Selected
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
			<img class="card-illustration" src="~@/img/sages-reverie.jpg" width="626" height="457" alt="An illustration of a monk magically moving many scrolls from glowing slots among many huge shelves of scrolls" />
			<figcaption>Illustration: <a href="https://scryfall.com/card/woc/73/sages-reverie" target="_blank"><i>Sage’s Reverie</i> </a> by Jason Rainville</figcaption>
		</figure>
		<p class="bigger">
			<template v-if="numChecked === 1">
				<i>{{ checkedDecks[0] }}</i> has
			</template>
			<template v-else-if="numChecked === 2">
				<i>{{ checkedDecks[0] }}</i> and <i>{{ checkedDecks[1] }}</i> have
			</template>
			<template v-else>
				The {{ numChecked }} decks you’ve selected have
			</template>

			been saved

			<template v-if="numChecked > 1"> together</template>

			as a deck archive file.
		</p>
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
			isArchived: false
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
	methods: {
		selectAll () {
			const checkboxes = document
				.querySelector('.archive-decks .checklist')
				.querySelectorAll('input')

			this.checkedDecks = [] // First uncheck all decks in case any of them are already checked.

			checkboxes.forEach(checkbox => {
				this.checkedDecks.push(checkbox.value)
			})
		},
		selectNone () {
			this.checkedDecks = []
		},
		archiveSelectedDecks () {
			const transitoryLink = document.createElement('a')

			transitoryLink.style.display = 'none'
			transitoryLink.setAttribute(
				'href', `data:text/plain;charset=utf-8,${this.generateJSON()}`
			)
			transitoryLink.setAttribute('download', this.setFileName())

			document.body.appendChild(transitoryLink)
			transitoryLink.click()
			document.body.removeChild(transitoryLink)

			this.isArchived = true
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
	@import '@/sass/page-deck-actions.scss';
</style>
