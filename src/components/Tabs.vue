<template>
	<nav>
		<ul class="tabs">
			<li v-for="(deck, i) in $store.state.decks" :key="i">
				<div v-if="$store.state.activeTab == deck.name">
					{{ deck.name || '?' }}
				</div>
				<router-link
					v-else  @click.native="selectTab(deck)"
					:to="{name: 'deck', params: {deckName: deck.name}}"
				>
					{{ deck.name || '?' }}
				</router-link>
				<!-- <a v-else
					@click="selectTab(deck)" :href="deckURL(deck)"
				>
					{{ deck.name || '?' }}
				</a> -->
			</li>
			<li class="add-new-deck">
				<a
					href="#new-deck" title="Create a new deck list"
					@click.prevent="createDeck()"
				><span>+</span></a>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'tabs',
	methods: {
		applyNewDeckName (newDeckName, existingDeckName) {
			if (existingDeckName) {
				newDeckName = prompt('Another deck already has the name “' + newDeckName + '.” Please give a different name.')

				if (newDeckName) {
					this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))
				}
			} else {
				this.$store.state.decks.push({
					name: newDeckName,
					cards: [],
					editDate: new Date(),
					previousSortProp: 'type'
				})
			}
		},
		checkExistingDeckNames (newDeckName) {
			const decks = this.$store.state.decks

			for (let i = 0; i < decks.length; i++) {
				if (newDeckName.toUpperCase() === decks[i].name.toUpperCase()) {
					return true
				}
			}
			return false
		},
		createDeck () {
			const newDeckName = prompt('Name this new deck:')

			if (newDeckName) {
				this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))

				// Switch to the new deck.
				this.$nextTick(function () {
					this.$store.commit('changeDeletedDeck', null)

					const decks = this.$store.state.decks

					for (let i = 0; i < decks.length; i++) {
						const deck = decks[i]

						if (deck.name === newDeckName) {
							this.selectTab(deck)
							this.$router.push({
								name: 'deck',
								params: { deckName: newDeckName }
								// params: { deckName: this.$store.commit('convertDeckNameToURL', newDeckName) }
							})
							deck.editDate = new Date()
							break
						}
					}
				})
			}
		},
		selectTab (deck) {
			this.$store.commit('changeActiveTab', deck.name)
			this.$store.commit('changeDeletedDeck', null)
		}
		// deckURL (deck) {
		// return deck.name.toLowerCase().replace(/ /g, '-')
		// }
	}
}
</script>
