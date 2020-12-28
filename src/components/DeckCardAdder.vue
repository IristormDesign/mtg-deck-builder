<template>
	<div class="card-adder">
		<h3>Add a Card to the Deck</h3>
		<form @submit.prevent="handleSubmit">
			<label>
				Name:
				<input
					type="text" v-model="newCard.name" ref="first"
					@focus="clearStatus" @keypress="clearStatus"
					:class="{ 'has-error': submitting && invalidName }"
				>
			</label>
			<label>
				Mana Cost:
				<input
					type="text" pattern="\d*[WUBRGXwubrgx]*"
					v-model="newCard.mana" @focus="clearStatus"
					:class="{ 'has-error': submitting && invalidMana }"
				>
			</label>
			<label>
				Type:
				<input
					type="text" v-model="newCard.type" @focus="clearStatus"
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
	name: 'deck-card-adder',
	props: {
		deck: Object
	},
	data () {
		return {
			submitting: false,
			error: false,
			success: false,
			newCard: {
				name: '',
				mana: '',
				type: ''
			}
		}
	},
	computed: {
		invalidName () {
			return this.newCard.name === ''
		},
		invalidMana () {
			return this.newCard.mana === ''
		},
		invalidType () {
			return this.newCard.type === ''
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

			const deck = this.deck
			const newCard = this.newCard
			const existingCard = deck.cards.find(anyCard =>
				newCard.name.toUpperCase() === anyCard.name.toUpperCase()
			)

			if (existingCard) {
				deck.viewedCard = existingCard.name

				setTimeout(() => {
					alert(`The card “${existingCard.name}” is already in this deck.`)
				}, 0)
			} else {
				this.$emit('card-added', newCard, deck)
				this.success = true
			}

			this.$refs.first.focus()
			this.newCard = {
				name: '',
				mana: '',
				type: ''
			}
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
