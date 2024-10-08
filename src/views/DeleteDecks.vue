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
			<p>In the checklist below, select the decks that you want to remove, then click the Delete Selected button. Warning: Deleted decks cannot be restored.</p>
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
						@click.prevent="handleSubmit()"
						:disabled="numChecked <= 0"
					>Delete Selected</button>
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
			<img class="intro-illustration" src="~@/img/planar-cleansing.jpg" width="626" height="457" alt="Illustration of myriad people being sucked up into a glowing, stormy sky" />
			<figcaption>(Illustration: <a href="https://scryfall.com/card/m20/33/planar-cleansing" target="_blank"><i>Planar Cleansing</i></a> by Michael Komarck)</figcaption>
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
