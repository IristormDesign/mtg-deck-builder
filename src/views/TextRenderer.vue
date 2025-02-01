<template>
	<div class="text-renderer content-box">
		<template v-if="mainNotEmpty || sideboardNotEmpty">
			<header class="intro">
				<p>The main and sideboard card lists for <i>{{ deck.name }}</i> are provided here in simplified text versions, which let you easily take copies of these lists outside MTG Deck Builder. <router-link to="/guide/text-renderer">(More info&hellip;)</router-link></p>
			</header>
			<div class="control-panel">
				<div class="button-container">
					<a
						:download="`${deck.name}.txt`"
						:href="exportFileHref"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m724.87-136.13 139-139-35-35L750-231.25v-188.01h-50.26v188.01l-78.87-78.88-35 35 139 139ZM579.74-10v-50.26H870V-10H579.74ZM232.56-170q-25.01 0-43.79-18.77Q170-207.55 170-232.56v-574.88q0-25.01 18.77-43.79Q207.55-870 232.56-870h290.41L750-642.97v145.77h-50.26v-122.54h-200v-200H232.56q-4.61 0-8.46 3.84-3.84 3.85-3.84 8.46v574.88q0 4.61 3.84 8.46 3.85 3.84 8.46 3.84H501.8V-170H232.56Zm-12.3-50.26v-599.48 599.48Z"/></svg>
						<span>Export Deck<br>as Text File</span>
					</a>
				</div>
				<div class="button-container">
					<button @click="printLists()">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M648.67-631.49v-125.94H311.33v125.94h-50.25v-176.2h437.84v176.2h-50.25ZM161.8-581.23H798.2 161.8Zm559.71 97.43q14.57 0 24.91-10.35 10.35-10.35 10.35-24.78 0-14.43-10.35-24.78-10.35-10.34-24.78-10.34-14.69 0-24.91 10.35t-10.22 24.78q0 14.43 10.22 24.78 10.22 10.34 24.78 10.34Zm-72.84 293.54v-186.46H311.33v186.46h337.34ZM698.92-140H261.08v-167.85H111.54v-230.66q0-39.31 26.94-66.14 26.93-26.84 66.29-26.84h550.46q39.62 0 66.43 26.84 26.8 26.83 26.8 66.14v230.66H698.92V-140Zm99.28-218.1v-180.56q0-18.08-12.35-30.33-12.36-12.24-30.62-12.24H204.77q-18.26 0-30.62 12.39-12.35 12.4-12.35 30.33v180.41h99.28v-68.87h437.84v68.87h99.28Z"/></svg>
						<span>Print Deck</span>
					</button>
				</div>
			</div>
			<div
				class="lists"
				:class="mainNotEmpty && sideboardNotEmpty ? 'two-columns' : null"
			>
				<svg class="svg-symbols" xmlns="http://www.w3.org/2000/svg">
					<symbol id="copy-icon" viewBox="0 -960 960 960">
						<path d="M362.31-260q-27.01 0-45.66-18.65Q298-297.3 298-324.31v-455.38q0-27.01 18.65-45.66Q335.3-844 362.31-844h359.38q27.01 0 45.66 18.65Q786-806.7 786-779.69v455.38q0 27.01-18.65 45.66Q748.7-260 721.69-260H362.31Zm0-52h359.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q174-173.3 174-200.31v-507.38h52v507.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h411.38v52H238.31ZM350-312v-480 480Z"/>
					</symbol>
				</svg>

				<section v-if="mainNotEmpty">
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
						readonly
					></textarea>
				</section>
			</div>
			<deck-print :deck="deck" :mainNotEmpty="mainNotEmpty" :sideboardNotEmpty="sideboardNotEmpty" />
		</template>
		<template v-else>
			<p class="no-cards">Plain-text card lists will be provided here once you’ve added cards to this deck from the <router-link :to="{name: 'listEditor'}">List Editor</router-link>.</p>
		</template>
	</div>
</template>

<script>
import autosize from 'autosize'
import DeckPrint from '@/components/deck-page/DeckPrint.vue'
import getActiveDeck from '@/mixins/getActiveDeck.js'

export default {
	components: { DeckPrint },
	mixins: [getActiveDeck],
	computed: {
		mainNotEmpty () {
			return this.deck.cards.length > 0
		},
		sideboardNotEmpty () {
			return this.deck.sideboard.cards.length > 0
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

			return output
		},
		exportFileHref () {
			return `data:text/plain;charset=utf-8,${encodeURIComponent(this.combinedMainAndSideboardLists)}`
		}
	},
	mounted () {
		autosize(this.$refs.mainList)
		autosize(this.$refs.sideboardList)
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
				const lineCardName = () => {
					if (card.name2) {
						return `${card.name} // ${card.name2}`
					} else {
						return card.name
					}
				}
				const line = `${card.qty} ${lineCardName()}`

				arrayOfCardNames.push(line)
			})

			return arrayOfCardNames.join('\n')
		},
		copyList (ref, stringName) {
			const text = this.$refs[ref]

			text.select()
			navigator.clipboard.writeText(text.value + '\n')

			setTimeout(() => {
				alert(`The ${stringName} list is now copied to the clipboard of your computer or phone.`)
			}, 125)
		},
		printLists () {
			window.print()
		}
	}
}
</script>

<style lang="scss">
	@import '@/sass/page-text-renderer.scss';
</style>
