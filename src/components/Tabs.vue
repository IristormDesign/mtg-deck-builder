<template>
	<ul class="tabs">
		<li v-for="(deck, i) in $store.state.decks" :key="i">
			<div v-if="$store.state.activeTab == deck.name">
				{{ deck.name || '?' }}
			</div>
			<a v-else
				@click="selectTab(deck)" :href="tabHref(deck)"
			>
				{{ deck.name || '?' }}
			</a>
		</li>
		<li class="add-new-deck">
			<a
				href="#" title="Create a new deck list"
				@click="createDeck()"
			><span>+</span></a>
		</li>
	</ul>
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
					this.$store.commit('changeDeletedDeckMessage', null)

					const decks = this.$store.state.decks

					for (let i = 0; i < decks.length; i++) {
						const deck = decks[i]

						if (deck.name === newDeckName) {
							this.$store.commit('changeActiveTab', newDeckName)
							deck.editDate = new Date()
							break
						}
					}
				})
			}
		},
		selectTab (deck) {
			this.$emit('activated-tab', deck)
		},
		tabHref (deck) {
			return '#' + deck.name.toLowerCase().replace(/ /g, '-')
		}
	}
}
</script>
