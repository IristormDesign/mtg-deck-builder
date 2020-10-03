<template>
	<div class="card-adder">
		<h3>Add a Card to the Deck</h3>
		<form @submit.prevent="handleSubmit">
			<label>
				Name:
				<input
					type="text" v-model="card.name" ref="first"
					@focus="clearStatus" @keypress="clearStatus"
					:class="{ 'has-error': submitting && invalidName }"
				>
			</label>
			<label>
				Mana Cost:
				<input
					type="text" pattern="\d*[WUBRGXwubrgx]*"
					v-model="card.mana" @focus="clearStatus"
					:class="{ 'has-error': submitting && invalidMana }"
				>
			</label>
			<label>
				Type:
				<input
					type="text" v-model="card.type" @focus="clearStatus"
					:class="{ 'has-error': submitting && invalidType }"
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
	name: 'card-adder',
	data () {
		return {
			submitting: false,
			error: false,
			success: false,
			card: {
				name: '',
				mana: '',
				type: ''
			}
		}
	},
	computed: {
		invalidName () {
			return this.card.name === ''
		},
		invalidMana () {
			return this.card.mana === ''
		},
		invalidType () {
			return this.card.type === ''
		}
	},
	methods: {
		handleSubmit () {
			this.clearStatus()
			this.submitting = true

			if (this.invalidName || this.invalidMana || this.invalidType) {
				this.error = true
				return
			}

			function cardExists (thisCard, deck) {
				const cards = deck.cards

				for (let i = 0; i < cards.length; i++) {
					const card = cards[i]

					if (thisCard.name === card.name) {
						alert('A card named “' + card.name + '” already exists in this deck. Its quantity will increase by 1 instead.')

						card.qty++
						deck.editDate = new Date()

						return true
					}
				}
				return false
			}

			// If the submitted card already exists in the deck, don't add another instance (because the existing card's quantity has increased by 1 instead).
			if (!cardExists(this.card, this.deck)) {
				this.$emit('card-added', this.card, this.deck)
			}

			this.$refs.first.focus()
			this.card = {
				name: '',
				mana: '',
				type: ''
			}
			this.error = false
			this.success = true
			this.submitting = false
		},
		clearStatus () {
			this.success = false
			this.error = false
		}
	},
	props: {
		deck: Object
	}
}
</script>
