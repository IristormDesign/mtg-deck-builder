<template>
	<article
		v-if="!isDeleted"
		class="deck-action-page delete-decks content-box"
	>
		<h2>Delete Decks</h2>
		<template v-if="numExisting <= 0">
			<p>You have no more decks. <router-link :to="{name: 'createDeck'}">(Create one?)</router-link></p>
		</template>
		<template v-else>
			<p>In the checklist below, select the decks that you want to remove, then click the Delete Selected button. Warning: Deleted decks can’t be restored.</p>
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
						@click.prevent="handleSubmit()"
						:disabled="numChecked <= 0"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M282.98-140q-25.71 0-44.14-18.43t-18.43-44.14v-532.05H180v-50.25h174.05v-30.51h251.9v30.51H780v50.25h-40.41v532.05q0 25.79-18.39 44.18T677.02-140H282.98Zm406.35-594.62H270.67v532.05q0 5.39 3.59 8.85t8.72 3.46h394.04q4.62 0 8.47-3.84 3.84-3.85 3.84-8.47v-532.05ZM379.54-273.23h50.25v-379.08h-50.25v379.08Zm150.67 0h50.25v-379.08h-50.25v379.08ZM270.67-734.62v544.36V-734.62Z"/></svg>
						Delete Selected
					</button>
				</div>
			</form>
		</template>
	</article>
	<article
		v-else
		class="action-done content-box"
		@click="headerLinkAttention()"
	>
		<figure>
			<img class="intro-illustration" src="~@/img/planar-cleansing.jpg" width="626" height="457" alt="An illustration of myriad people being sucked up into a glowing, stormy sky" />
			<figcaption>Illustration: <a href="https://scryfall.com/card/m20/33/planar-cleansing" target="_blank"><i>Planar Cleansing</i></a> by Michael Komarck</figcaption>
		</figure>
		<p class="bigger">{{ this.deletedDecksMessage }}</p>
	</article>
</template>

<script>
import headerLinkAttention from '@/mixins/headerLinkAttention.js'

export default {
	mixins: [headerLinkAttention],
	props: {
		presetDeckName: String
	},
	data () {
		return {
			checkedDecks: [],
			isDeleted: false
		}
	},
	computed: {
		deletedDecksMessage () {
			if (this.numChecked === 1) {
				return 'That deck is now deleted.'
			} else {
				return 'Those decks are now deleted.'
			}
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
				.querySelector('.delete-decks .checklist')
				.querySelectorAll('input')

			this.checkedDecks = [] // First uncheck all decks in case any of them are already checked.

			checkboxes.forEach(checkbox => {
				this.checkedDecks.push(checkbox.value)
			})
		},
		selectNone () {
			this.checkedDecks = []
		},
		handleSubmit () {
			if (this.confirmedDelete()) {
				this.removeSelectedDecks()
			}
		},
		confirmedDelete () {
			const message = '⚠ Are you sure you want to permanently delete '

			if (this.numChecked === 1) {
				return confirm(
					message + `“${this.checkedDecks[0]}”?`
				)
			} else if (this.numChecked === 2) {
				return confirm(
					message + `“${this.checkedDecks[0]}” and “${this.checkedDecks[1]}”?`
				)
			} else if (this.numChecked === this.numExisting) {
				return confirm(
					message + `all ${this.numExisting} of your decks?`
				)
			} else {
				return confirm(
					message + `the ${this.numChecked} decks you’ve selected?`
				)
			}
		},
		removeSelectedDecks () {
			this.isDeleted = true

			let decks = this.$store.state.decks
			const checkedDeckNames = new Set(this.checkedDecks)

			decks = decks.filter(
				deck => !checkedDeckNames.has(deck.name)
			)

			this.$store.commit('decks', decks)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
