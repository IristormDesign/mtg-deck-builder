<template>
	<section class="deck-actions">
		<dropdown-menu
			:isShowingDropdown="isMenuOpen"
			togglerRef="deckActionsToggler"
			@hideDropdown="isMenuOpen = false"
		>
			<button
				slot="menuToggler"
				class="dropdown-menu-toggler"
				ref="deckActionsToggler"
				@click="isMenuOpen = !isMenuOpen"
				type="button"
			>
				Deck Actions
				<svg
					class="dropdown-arrow"
					xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-373.85 303.85-550h352.3L480-373.85Z"
				/></svg>
			</button>
			<ul
				slot="menuList"
				v-show="isMenuOpen"
				role="menu"
			>
				<li role="menuitem">
					<button @click="duplicateDeck()" type="button">
						Duplicate
					</button>
				</li>
				<li role="menuitem">
					<button @click="archiveDeck()" type="button">
						Archive&hellip;
					</button>
				</li>
				<li role="menuitem">
					<button @click="deleteDeck()" type="button">
						Delete&hellip;
					</button>
				</li>
			</ul>
		</dropdown-menu>
	</section>
</template>

<script>
import DropdownMenu from '@/components/DropdownMenu.vue'
import copyDeck from '@/mixins/copyDeck.js'

export default {
	components: { DropdownMenu },
	mixins: [copyDeck],
	props: {
		deck: Object
	},
	data () {
		return {
			isMenuOpen: false
		}
	},
	methods: {
		duplicateDeck () {
			const sourceDeck = this.deck

			let dupDeckName = prompt(
				'Give a new name for the duplicate deck:',
				this.amendCopiedDeckName(sourceDeck).name
			)

			if (dupDeckName) {
				dupDeckName = dupDeckName.trim()
			}
			if (dupDeckName) { // Check for a string existing again after having trimmed it.
				const dupDeckPath = this.stringToPath(dupDeckName)

				if (dupDeckPath === this.$route.params.deckPath) {
					alert(this.alertNameExists(dupDeckName))

					this.copyDeck(sourceDeck)
				} else if (this.nameIsApproved(dupDeckName, dupDeckPath)) {
					const copiedDeck = JSON.parse(JSON.stringify(sourceDeck)) // The technique for deep-cloning objects, which is necessary here.
					const newData = {
						name: dupDeckName,
						path: dupDeckPath
					}

					this.storeCopiedDeckAndRedirect(copiedDeck, newData)
				} else {
					this.copyDeck(sourceDeck)
				}
			}
		},
		archiveDeck () {
			this.$router.push({
				name: 'archiveDecks',
				params: { presetDeckName: this.deck.name }
			})
		},
		deleteDeck () {
			this.$router.push({
				name: 'deleteDecks',
				params: { presetDeckName: this.deck.name }
			})
		}
	}
}
</script>
