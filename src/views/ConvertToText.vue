<template>
	<article class="convert-to-text content-box">
		<h3>Convert Deck to Text</h3>

		<div class="button-container">
			<a
				v-show="deck.cards.length > 0 || sideboardNotEmpty"
				:download="`${deck.name}.txt`"
				:href="`data:text/plain;charset=utf-8,${combinedMainAndSideboardLists}`"
			>Save Deck as Text File</a>
		</div>

		<div
			class="lists"
			:class="sideboardNotEmpty ? 'two-columns' : 'one-column'"
		>
			<section v-if="deck.cards.length > 0">
				<header>
					<h4>Main List</h4>
					<button @click="copyList('mainList', 'deck’s main')">Copy List</button>
				</header>
				<textarea
					v-text="listCards()"
					ref="mainList"
					readonly
					:rows="textareaHeightMain"
				></textarea>
			</section>
			<section v-else>
				<header>
					<h4>Main List</h4>
				</header>
				<p class="no-cards">(No cards)</p>
			</section>

			<section v-if="sideboardNotEmpty">
				<header>
					<h4>Sideboard List</h4>
					<button @click="copyList('sideboardList', 'sideboard')">Copy List</button>
				</header>
				<textarea
					v-text="listCards(true)"
					ref="sideboardList"
					:rows="textareaHeightSideboard"
					readonly
				></textarea>
			</section>
		</div>
	</article>
</template>

<script>
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	mixins: [getActiveDeck],
	computed: {
		sideboardNotEmpty () {
			return this.deck.sideboard.cards.length > 0
		},
		textareaHeightMain () {
			return this.deck.cards.length
		},
		textareaHeightSideboard () {
			return this.deck.sideboard.cards.length
		},
		combinedMainAndSideboardLists () {
			const title = this.deck.name.toUpperCase() + '\n\n'

			if (this.sideboardNotEmpty) {
				return (
					title +
					'Main List:\n\n' +
					this.listCards() +
					'\n\nSideboard List:\n\n' +
					this.listCards(true)
				)
			} else {
				return title + this.listCards()
			}
		}
	},
	methods: {
		listCards (forSideboard) {
			const cards = () => {
				if (forSideboard) {
					return this.deck.sideboard.cards
				} else {
					return this.deck.cards
				}
			}

			const arrayOfCardNames = []

			cards().forEach(card => {
				const line = `${card.qty} ${card.name}`
				arrayOfCardNames.push(line)
			})

			return arrayOfCardNames.join('\n')
		},
		copyList (ref, stringName) {
			const text = this.$refs[ref]

			text.select()
			navigator.clipboard.writeText(text.value + '\n')

			setTimeout(() => {
				alert(`The ${stringName} list is now copied to the clipboard.`)
			}, 200)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
