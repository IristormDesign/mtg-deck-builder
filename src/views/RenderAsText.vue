<template>
	<article
		class="render-as-text content-box"
		:class="!mainNotEmpty && !sideboardNotEmpty ? 'no-cards' : null"
	>
		<h3>Deck in Plain Text</h3>

		<template v-if="mainNotEmpty || sideboardNotEmpty">
			<div class="button-container">
				<a
					v-show="mainNotEmpty || sideboardNotEmpty"
					:download="`${deck.name}.txt`"
					:href="`data:text/plain;charset=utf-8,${combinedMainAndSideboardLists}`"
				>Save Deck as Text File</a>
			</div>

			<div
				class="lists"
				:class="mainNotEmpty && sideboardNotEmpty ? 'two-columns' : null"
			>
				<section v-if="mainNotEmpty">
					<header>
						<h4>Main List</h4>
						<button @click="copyList('mainList', 'main')">Copy</button>
					</header>
					<textarea
						v-text="listCards()"
						ref="mainList"
						readonly
						:rows="textareaHeightMain"
					></textarea>
				</section>
				<section v-if="sideboardNotEmpty">
					<header>
						<h4>Sideboard List</h4>
						<button @click="copyList('sideboardList', 'sideboard')">Copy</button>
					</header>
					<textarea
						v-text="listCards(true)"
						ref="sideboardList"
						:rows="textareaHeightSideboard"
						readonly
					></textarea>
				</section>
			</div>

			<footer class="for-more-info">
				<p>For more information about rendering deck lists as text, see the <router-link to="/manual#render-as-text-action">user manual</router-link>.</p>
			</footer>
		</template>

		<template v-else>
			<p>This deck currently has no cards, so there’s nothing to show here. Add cards to the deck using the <router-link :to="{name: 'deckEditor'}">Deck Editor</router-link>.</p>
		</template>
	</article>
</template>

<script>
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	mixins: [getActiveDeck],
	computed: {
		mainNotEmpty () {
			return this.deck.cards.length > 0
		},
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
			let output = this.deck.name.toUpperCase() + '\n\n'

			if (this.mainNotEmpty) {
				if (this.sideboardNotEmpty) {
					output += (
						'Main List:\n\n' +
						this.listCards() +
						'\n\nSideboard List:\n\n' +
						this.listCards(true)
					)
				} else {
					output += this.listCards()
				}
			} else {
				output += this.listCards(true)
			}

			return encodeURIComponent(output)
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
				alert(`The deck’s ${stringName} list is now copied to the clipboard.`)
			}, 125)
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-deck-actions.scss';
</style>
