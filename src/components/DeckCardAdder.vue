<template>
	<div class="card-adder">
		<form
			@submit.prevent="handleSubmit()"
			title="Tip: You can add a randomly selected card by entering “[random]” as the card name."
		>
			<label for="card-input">Add a new card to this deck:</label>
			<input
				type="text" id="card-input" ref="first" v-model="cardName"
				@focus="clearStatus()" @keypress="clearStatus()"
				:class="{ 'has-error': submitting && invalidName }"
				placeholder="(Enter a card’s name here.)"
			/>
			<button class="primary-btn" :disabled="delay">Add Card</button>
		</form>
		<div class="message">
			<span v-if="error && submitting" class="error-message">
				🛑 One or more form fields are invalid.
			</span>
			<span v-if="success" class="success-message">
				✅ The card is now added to the deck.
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-card-adder',
	props: {
		deck: Object
	},
	data () {
		return {
			submitting: false,
			error: false,
			success: false,
			cardName: '',
			delay: false,
			axios: require('axios')
		}
	},
	computed: {
		invalidName () {
			return this.cardName === ''
		}
	},
	methods: {
		getTheCard (cardName) {
			cardName = this.$store.getters.curlApostrophes(cardName)

			const deck = this.deck
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
						const newCard = {
							link: rd.scryfall_uri,
							qty: 1
						}

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

						newCard.name = this.$store.getters.curlApostrophes(newCard.name)

						if (newCard.colors.length >= 2) {
							newCard.colors.unshift('multicolor')
						}
						deck.cards.push(newCard)
						deck.viewedCard = newCard.name
						this.success = true
						this.$store.commit('setSortProperty', '')
					})
					.catch(error => {
						this.error = true
						console.log(error)
					})

				deck.editDate = new Date()
			}
		},
		handleSubmit () {
			this.clearStatus()
			this.submitting = true
			this.delay = true

			if (this.invalidName) {
				this.error = true
				return
			}

			if (this.cardName.toLowerCase() === '[random]') {
				this.axios
					.get('https://api.scryfall.com/cards/random?q=legal%3Avintage') // Get a random card that's legal in Vintage tournaments (which is almost all cards printed in Magic history, but excludes tokens and non-standard game formats).
					.then(response => {
						this.getTheCard(response.data.name)
					})
					.catch(error => {
						console.log(error)
					})
			} else {
				this.getTheCard(this.cardName)
			}

			this.$refs.first.focus()
			this.cardName = ''
			this.error = false
			this.submitting = false

			setTimeout(() => {
				this.delay = false
			}, 250) // Scryfall staff doesn't want too many server requests sent too quickly.
		},
		clearStatus () {
			this.success = false
			this.error = false
			this.delay = false
		}
	}
}
</script>
