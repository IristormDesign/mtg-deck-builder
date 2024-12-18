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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m724.87-136.13 139-139-35-35L750-231.25v-188.01h-50.26v188.01l-78.87-78.88-35 35 139 139ZM579.74-10v-50.26H870V-10H579.74ZM170-170v-700h352.97L750-642.97v145.77h-50.26v-122.54h-200v-200H220.26v599.48H501.8V-170H170Zm50.26-50.26v-599.48 599.48Z"/></svg>
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
							<path d="M298-260v-584h488v584H298Zm52-52h384v-480H350v480ZM174-136v-571.69h52V-188h423.69v52H174Zm176-176v-480 480Z"/>
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
	@import '@/sass/page-deck-actions.scss';
</style>
