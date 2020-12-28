<template>
	<div class="card-adder">
		<form @submit.prevent="handleSubmit">
			<label>
				Add a new card to this deck:
				<input
					type="text" v-model="cardName" ref="first"
					@focus="clearStatus" @keypress="clearStatus"
					:class="{ 'has-error': submitting && invalidName }"
				>
			</label>

			<button class="primary-btn">Add Card</button>

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
			cardName: ''
		}
	},
	computed: {
		invalidName () {
			return this.cardName === ''
		}
	},
	methods: {
		getCardData (cardName) {
			console.log(`getCardData(${cardName})`)

			require('axios')
				.get(
					'https://api.scryfall.com/cards/named?fuzzy=' + cardName.replace(/\s/g, '+')
				)
				.then(response => {
					this.deck.cards.push({
						name: response.data.name,
						type: response.data.type_line,
						mana: response.data.mana_cost,
						cmc: response.data.cmc,
						colors: response.data.colors,
						img: response.data.image_uris.normal,
						scryfallURI: response.data.scryfall_uri,
						qty: 1
					})
					this.deck.viewedCard = response.data.name
					this.success = true
				})
				.catch(error => {
					this.error = true
					alert(error)
					console.log(error)
				})
		},
		handleSubmit () {
			this.clearStatus()
			this.submitting = true

			if (this.invalidName) {
				this.error = true
				return
			}

			const deck = this.deck
			const cardName = this.cardName
			const cardExists = deck.cards.find(anyCard =>
				cardName.toUpperCase() === anyCard.name.toUpperCase()
			)

			if (cardExists) {
				deck.viewedCard = cardExists.name

				setTimeout(() => {
					alert(`“${cardExists.name}” is already in this deck.`)
				})
			} else {
				this.getCardData(cardName)
				deck.editDate = new Date()
			}

			this.$refs.first.focus()
			this.cardName = ''
			this.error = false
			this.submitting = false
		},
		clearStatus () {
			this.success = false
			this.error = false
		}
	}
}
</script>
