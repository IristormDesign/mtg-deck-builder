<template>
	<form
		class="card-adder" @submit.prevent="handleSubmit()"
		title="Tip: You can add a random card by entering “random” as the card name."
	>
		<label for="card-input">Add a new card to this deck:</label>
		<input
			type="text" id="card-input" ref="focus" v-model="cardName"
			placeholder="(Enter a card’s name here.)"
		/>
		<button class="primary-btn" :disabled="delay">Add Card</button>
	</form>
</template>

<script>
export default {
	name: 'deck-card-adder',
	props: {
		deck: Object
	},
	data () {
		return {
			cardName: '',
			delay: false,
			axios: require('axios')
		}
	},
	methods: {
		getTheCard (cardName) {
			const store = this.$store
			const deck = this.deck
			cardName = store.state.curlApostrophes(cardName)
			const cardExists = deck.cards.find(anyCard =>
				cardName.toUpperCase() === anyCard.name.toUpperCase()
			)

			if (cardExists) {
				deck.viewedCard = cardExists.name

				setTimeout(() => {
					alert(`“${cardExists.name}” is already in this deck.`)
				})
			} else {
				const cardQuery = cardName.replace(/\s/g, '+') // Turn any spaces into plusses from the card's name.

				console.log(`Requested Scryfall for '${cardName}'.`)

				this.axios
					.get('https://api.scryfall.com/cards/named?fuzzy=' + cardQuery)
					.then(response => {
						const rd = response.data
						const newCard = {}

						if (rd.card_faces) { // If the card is a double-faced or split card...
							const rdFace1 = rd.card_faces[0]
							const rdFace2 = rd.card_faces[1]

							newCard.name = `${rdFace1.name} / ${rdFace2.name}`

							newCard.mana = `${rdFace1.mana_cost}`
							if (rdFace2.mana_cost !== '') { // If the card's second face has its own mana cost, add it onto the mana cost string with a slash before it.
								newCard.mana += '/' + rdFace2.mana_cost
							}

							newCard.type = `${rdFace1.type_line} / ${rdFace2.type_line}`
							newCard.cmc = rd.cmc

							if (rd.colors) {
								newCard.colors = rd.colors
							} else {
								newCard.colors = rdFace1.colors
							}

							if (rd.image_uris) {
								newCard.img = rd.image_uris.normal
							} else {
								newCard.img = rdFace1.image_uris.normal
							}
						} else { // Else the card is a single-faced card.
							newCard.name = rd.name
							newCard.mana = rd.mana_cost
							newCard.type = rd.type_line
							newCard.cmc = rd.cmc
							newCard.colors = rd.colors
							newCard.img = rd.image_uris.normal
						}
						newCard.name = store.state.curlApostrophes(newCard.name)
						newCard.link = rd.scryfall_uri
						newCard.qty = 1

						if (newCard.colors.length >= 2) {
							newCard.colors.unshift('multicolor')
						}

						deck.cards.push(newCard)
						deck.editDate = new Date()
						this.$nextTick(() => {
							deck.viewedCard = newCard.name
							store.commit('setDecks', store.state.decks)
						})
						store.commit('setSortProperty', '')
					})
					.catch(error => {
						this.error = true
						console.log(error)
					})
			}
		},
		handleSubmit () {
			const cardName = this.cardName
			this.$refs.focus.focus()

			if (cardName === '') {
				// No name was submitted, so do nothing.
				return
			} else {
				this.delay = true // Scryfall staff doesn't want too many server requests sent too quickly.

				if (cardName.toLowerCase() === 'random') {
					this.axios
						.get('https://api.scryfall.com/cards/random?q=legal%3Amodern') // Get a random card that's legal in Modern tournaments.
						.then(response => {
							this.getTheCard(response.data.name)
						})
						.catch(error => {
							console.log(error)
						})
				} else {
					this.getTheCard(cardName)
				}
			}
			this.cardName = ''

			setTimeout(() => {
				this.delay = false
			}, 250)
		}
	}
}
</script>
