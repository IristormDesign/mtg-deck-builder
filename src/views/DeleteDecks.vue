<template>
	<article
		v-if="!isDeleted"
		class="delete-decks content-box"
	>
		<h2>Delete Decks</h2>
		<template v-if="decks.length <= 0">
			<p>You have no more decks. <router-link :to="{name: 'createDeck'}">(Create one?)</router-link></p>
		</template>
		<template v-else>
			<p>In the checklist below, select the decks that you want permanently erased, then click on the Delete Selected button.</p>
			<form>
				<div
					class="multi-select-buttons"
					v-show="decks.length >= 3"
				>
					<button @click="selectAll()" type="button">Select All</button>
					<button @click="selectNone()" type="button">Select None</button>
				</div>
				<p><strong>Your Decks:</strong></p>
				<ul class="checklist">
					<li v-for="deck in decks" :key="deck.name">
						<input type="checkbox" :id="deck.name" :value="deck.name" v-model="checkedDecks">
						<label :for="deck.name">{{ deck.name }}</label>
					</li>
				</ul>
				<p class="button-container">
					<button @click.prevent="handleSubmit()">Delete Selected</button>
				</p>
			</form>
		</template>
	</article>
	<article
		v-else
		class="deck-deleted content-box"
		@click="$store.getters.attentionHeaderButton"
	>
		<figure>
			<img class="intro-illustration" src="~@/img/planar-cleansing.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<figcaption>(Illustration: <a href="https://scryfall.com/card/m20/33/planar-cleansing" target="_blank"><i>Planar Cleansing</i></a> by Michael Komarck)</figcaption>
		</figure>
		<p class="bigger">{{ this.deletedDecksMessage }}</p>
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
			isDeleted: false
		}
	},
	computed: {
		decks () {
			return this.$store.state.decks
		},
		deletedDecksMessage () {
			if (this.checkedDecks.length === 1) {
				return 'That deck is now deleted.'
			} else {
				return 'Those decks are now deleted.'
			}
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
			const numOfChecked = this.checkedDecks.length

			if (numOfChecked <= 0) {
				alert('You haven’t selected any deck to delete.')
			} else if (numOfChecked === 1) {
				return confirm(
					`⚠ Are you sure you want to delete “${this.checkedDecks[0]}”?`)
			} else if (numOfChecked === 2) {
				return confirm(
					`⚠ Are you sure you want to delete “${this.checkedDecks[0]}” and “${this.checkedDecks[1]}”?`)
			} else if (numOfChecked === this.decks.length) {
				return confirm(
					`⚠ Are you sure you want to delete all ${this.decks.length} of your decks?`)
			} else {
				return confirm(
					`⚠ Are you sure you want to delete the ${numOfChecked} decks you’ve selected?`)
			}
		},
		removeSelectedDecks () {
			let decks = this.decks

			for (const checkedDeckName of this.checkedDecks) {
				decks = decks.filter(
					deck => checkedDeckName !== deck.name
				)
			}

			this.isDeleted = true
			this.$store.commit('setDecks', decks)

			// (function () {
			// 	const nameList = []

			// 	if (decks.length > 0) {
			// 		decks.forEach(deck => {
			// 			nameList.push(deck.name)
			// 		})

			// 		console.log('> REMAINING DECKS:\n' + nameList.join(', '))
			// 	} else {
			// 		console.log('> ALL DECKS DELETED')
			// 	}
			// })()
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
