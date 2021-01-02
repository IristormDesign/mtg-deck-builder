<template>
	<div class="card-adder">
		<form @submit.prevent="handleSubmit()">
			<label>
				Add a new card to this deck:
				<input
					type="text" v-model="cardName" ref="first"
					@focus="clearStatus()" @keypress="clearStatus()"
					:class="{ 'has-error': submitting && invalidName }"
					title="Tip: Enter the code “[random]” to add a randomly selected Magic card."
				>
			</label>

			<button class="primary-btn" :disabled="delay">Add Card</button>

			<div class="message">
				<span v-if="error && submitting" class="error-message">
					🛑 One or more form fields are invalid.
				</span>
				<span v-if="success" class="success-message">
					✅ The card is now added to the deck.
				</span>
			</div>
		</form>
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
							name: rd.name,
							type: rd.type_line,
							mana: rd.mana_cost,
							cmc: rd.cmc,
							colors: rd.colors,
							img: rd.image_uris.normal,
							scryfallLink: rd.scryfall_uri,
							qty: 1
						}

						if (newCard.colors.length >= 2) {
							newCard.colors.unshift('multicolor')
						}
						deck.cards.unshift(newCard)
						deck.viewedCard = newCard.name
						this.success = true
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
					.get('https://api.scryfall.com/cards/random')
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
