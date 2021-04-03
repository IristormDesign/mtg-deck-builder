<template>
	<div class="card-adder">
		<form v-if="!loadingCard" @submit.prevent="handleSubmit()">
			<label for="card-input">Add a new card to this deck:</label>
			<input
				type="text" id="card-input" ref="focus" v-model="cardNameInput"
				title="Tip: You can add a random card by entering “random” as the card name."
				placeholder="(Enter a card’s name here.)"
			/>
			<button class="primary-btn" :disabled="delay">Add Card</button>
		</form>
		<div v-else class="loading-indicator">
			Loading card&hellip;
		</div>
	</div>
</template>

<script>
export default {
	props: {
		deck: Object
	},
	data () {
		return {
			axios: require('axios'),
			cardNameInput: '',
			delay: false,
			loadingCard: false
		}
	},
	methods: {
		handleSubmit () {
			const cardNameInput = this.cardNameInput
			this.$refs.focus.focus()

			if (cardNameInput === '') {
				// No name was submitted, so do nothing.
				return
			} else {
				this.delay = true // Scryfall staff doesn't want too many server requests sent too quickly.
				this.loadingCard = true

				if (cardNameInput.toLowerCase() === 'random') {
					this.axios
						.get('https://api.scryfall.com/cards/random?q=legal%3Amodern') // Get a random card that's legal in Modern tournaments.
						.then(response => {
							this.getTheCard(response.data.name)
						})
						.catch(error => {
							alert(`⚠ Error: ${error.response.data.details}`)
							console.log(error)
						})
				} else {
					this.getTheCard(cardNameInput)
				}
			}
			this.cardNameInput = ''

			setTimeout(() => {
				this.delay = false
			}, 500)
		},
		getTheCard (cardName) {
			const store = this.$store
			const deck = this.deck
			cardName = store.state.curlApostrophes(cardName)
			const cardExists = deck.cards.find(anyCard =>
				cardName.toUpperCase() === anyCard.name.toUpperCase()
			)

			if (cardExists) {
				deck.viewedCard = cardExists.name
				alert(`“${cardExists.name}” is already in this deck.`)
			} else {
				const cardQuery = cardName.replace(/\s/g, '+') // Turn any spaces into plusses from the card's name.
				const cancelTokenSource = this.axios.CancelToken.source()

				// Cancel when 15 seconds have passed.
				setTimeout(() => {
					cancelTokenSource.cancel()
				}, 15000)

				console.log(`Requested Scryfall for '${cardName}'.`)

				this.axios
					.get(
						'https://api.scryfall.com/cards/named?fuzzy=' + cardQuery,
						{ cancelToken: cancelTokenSource.token }
					)
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
						newCard.rarity = rd.rarity
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
						store.commit('setSortAttribute', '')
					})
					.catch(error => {
						if (this.axios.isCancel(error)) {
							alert('⚠ The Scryfall server is taking too long to respond. Try again later.')
						} else {
							alert(`⚠ Error: ${error.response.data.details}`)
							console.log(error)
						}
					})
					.finally(() => {
						this.loadingCard = false

						this.$nextTick(() => {
							this.$refs.focus.focus()
						})
					})
			}
		}
	}
}
</script>
