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
	name: 'card-adder',
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
			const existingCard = deck.cards.find(eachCard => newCard.name === eachCard.name)

			if (existingCard) {
				alert('A card named “' + existingCard.name + '” already exists in this deck. Its quantity will increase by 1 instead.')

				existingCard.qty++
			} else {
				this.$emit('card-added', newCard, deck)
			}

			deck.editDate = new Date()
			deck.viewedCard = newCard.name

			this.$refs.first.focus()
			this.newCard = {
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
