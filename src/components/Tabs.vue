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
		checkExistingDeckNames (name) {
			return this.$store.state.decks.find((deck) =>
				this.$store.getters.stringToPath(name) === deck.path
			)
		},
		applyNewDeckName (name, nameExists) {
			if (nameExists) {
				const differentName = prompt(this.$store.getters.alertNameExists(name))

				if (differentName) {
					this.applyNewDeckName(name, this.checkExistingDeckNames(name))
				}
			} else {
				this.$store.state.decks.push({
					name: name,
					path: this.$store.getters.stringToPath(name),
					cards: [],
					editDate: new Date()
				})
			}
		},
		createDeck () {
			const name = prompt('Name this new deck:')

			if (name) {
				this.applyNewDeckName(name, this.checkExistingDeckNames(name))

				this.$store.state.decks.find((deck) => {
					if (deck.name === name) {
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
