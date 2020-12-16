<template>
	<nav>
		<ul class="tabs">
			<li v-for="(deck, i) in $store.state.decks" :key="i">
				<div v-if="$route.params.deckPath == deck.path">
					{{ deck.name || '?' }}
				</div>
				<router-link
					v-else  :to="{
						name: 'deck',
						params: { deckPath: deck.path }
					}"
				>
					{{ deck.name || '?' }}
				</router-link>
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
		applyNewDeckName (newDeckName, deckNameExists) {
			if (deckNameExists) {
				newDeckName = prompt('Another deck already has the name “' + newDeckName + '.” Please give a different name.')

				if (newDeckName) {
					this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))
				}
			} else {
				this.$store.state.decks.push({
					name: newDeckName,
					path: this.$store.getters.stringToPath(newDeckName),
					cards: [],
					editDate: new Date()
				})
			}
		},
		checkExistingDeckNames (newDeckName) {
			return this.$store.state.decks.find((deck) =>
				this.$store.getters.stringToPath(newDeckName) === deck.path
			)
		},
		createDeck () {
			const newDeckName = prompt('Name this new deck:')

			if (newDeckName) {
				this.applyNewDeckName(newDeckName, this.checkExistingDeckNames(newDeckName))

				this.$store.state.decks.find((deck) => {
					if (deck.name === newDeckName) {
						this.$router.push({
							name: 'deck',
							params: { deckPath: deck.path }
						})
					}
				})
			}
		}
	}
}
</script>
