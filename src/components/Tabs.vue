<template>
	<nav>
		<ul class="tabs">
			<li v-for="(deck, i) in $store.state.decks" :key="i">
				<div v-if="$route.params.deckPath === deck.path">
					{{ deck.name }}
				</div>
				<router-link
					v-else
					:to="{
						name: 'deck',
						params: { deckPath: deck.path }
					}"
				>
					{{ deck.name }}
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
		createDeck (redo) {
			const get = this.$store.getters
			let message = 'Name this new deck:'
			if (redo) {
				message = get.alertNameExists(redo)
			}
			let name = prompt(message)

			// First edit the given name to remove any excess white space.
			if (name) {
				name = name.trim()
			}
			if (name) { // If the user entered any name...
				const path = get.stringToPath(name)
				const deckExists = get.existingDeck(path)

				if (deckExists) {
					this.createDeck(deckExists.name) // Restart this method from the beginning with an added parameter.
				} else {
					this.$store.state.decks.push({
						name: name,
						path: path,
						cards: [],
						editDate: new Date(),
						viewedCard: ''
					})
					this.$router.push({
						name: 'deck',
						params: { deckPath: path }
					})
				}
			} // Else, if the user left the prompt blank, do nothing.
		}
	}
}
</script>
