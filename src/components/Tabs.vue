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
		createDeck (existingName) {
			const getters = this.$store.getters
			const decks = this.$store.state.decks

			let message = 'Name this new deck:'
			if (existingName) {
				message = getters.alertNameExists(existingName)
			}
			const name = prompt(message)

			if (name) { // If the user entered any name...
				const newDeckPath = getters.stringToPath(name)
				const existingDeck = decks.find((deck) =>
					newDeckPath === deck.path
				)
				if (existingDeck) {
					this.createDeck(existingDeck.name) // Restart this method from the beginning.
				} else { // Now create the new deck and switch to it.
					decks.push({
						name: name,
						path: newDeckPath,
						cards: [],
						editDate: new Date()
					})
					this.$router.push({
						name: 'deck',
						params: { deckPath: newDeckPath }
					})
				}
			} // Else, if the user left the prompt blank, do nothing.
		}
	}
}
</script>
