<template>
	<nav class="tabs">
		<ul>
			<li v-for="(deck, i) in $store.state.decks" :key="i">
				<div
					v-if="$route.params.deckPath === deck.path"
					class="active-tab"
				>
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
					href="#new-deck" title="Create a new deck"
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
		createDeck (failedName, existingDeckName) {
			const get = this.$store.getters
			let message = 'Name this new deck:'
			if (existingDeckName) {
				message = get.alertNameExists(existingDeckName)
			}
			let name = prompt(message, failedName)

			// First edit the given name to remove any excess white space.
			if (name) {
				name = name.trim()
				name = get.curlApostrophes(name)
			}
			if (name) { // If the user entered any name...
				const path = get.stringToPath(name)
				const deckExists = get.existingDeck(path)

				if (deckExists) {
					this.createDeck(failedName, deckExists.name) // Restart.
				} else if (name.length > 50) {
					alert(this.$store.state.alertNameTooLong)
					this.createDeck(name) // Restart.
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
