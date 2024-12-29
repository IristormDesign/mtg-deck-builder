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
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m724.87-136.13 139-139-35-35L750-231.25v-188.01h-50.26v188.01l-78.87-78.88-35 35 139 139ZM579.74-10v-50.26H870V-10H579.74ZM232.56-170q-25.01 0-43.79-18.77Q170-207.55 170-232.56v-574.88q0-25.01 18.77-43.79Q207.55-870 232.56-870h290.41L750-642.97v145.77h-50.26v-122.54h-200v-200H232.56q-4.61 0-8.46 3.84-3.84 3.85-3.84 8.46v574.88q0 4.61 3.84 8.46 3.85 3.84 8.46 3.84H501.8V-170H232.56Zm-12.3-50.26v-599.48 599.48Z"/></svg>
					<span>Save Deck as Text File</span>
				</a>
			</div>

			<div
				class="lists"
				:class="mainNotEmpty && sideboardNotEmpty ? 'two-columns' : null"
			>
				<section v-if="mainNotEmpty">
					<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
						<symbol id="copy-icon" viewBox="0 -960 960 960">
							<path d="M362.31-260q-27.01 0-45.66-18.65Q298-297.3 298-324.31v-455.38q0-27.01 18.65-45.66Q335.3-844 362.31-844h359.38q27.01 0 45.66 18.65Q786-806.7 786-779.69v455.38q0 27.01-18.65 45.66Q748.7-260 721.69-260H362.31Zm0-52h359.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q174-173.3 174-200.31v-507.38h52v507.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h411.38v52H238.31ZM350-312v-480 480Z"/>
						</symbol>
					</svg>

					<header>
						<h4>Main List</h4>
						<button @click="copyList('mainList', 'main')">
							<svg><use href="#copy-icon" /></svg>
							Copy
						</button>
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
						<button @click="copyList('sideboardList', 'sideboard')">
							<svg><use href="#copy-icon" /></svg>
							Copy
						</button>
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
			<p>This deck currently has no cards, so there’s nothing to show here. Add cards to the deck using the <router-link :to="{name: 'listEditor'}">List Editor</router-link>.</p>
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
	@import '@/sass/page-render-as-text.scss';
</style>
