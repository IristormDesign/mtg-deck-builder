<template>
	<div class="card-adder">
		<h2>Add a Card to the Deck</h2>
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
				Type:
				<input
					type="text" v-model="card.type" @focus="clearStatus"
					:class="{ 'has-error': submitting && invalidType }"
				>
			</label>
			<label>
				Mana Cost:
				<input
					type="text" pattern="\d*[WUBRGwubrg]*"
					v-model="card.mana" @focus="clearStatus"
					:class="{ 'has-error': submitting && invalidMana }"
				>
			</label>
			<label>
				Quantity:
				<input
					type="number" min="1" max="99"
					v-model="card.qty" @focus="clearStatus"
					:class="{ 'has-error': submitting && invalidQty }"
				>
			</label>

			<button>Add Card</button>

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
				type: '',
				mana: '',
				qty: 1
			}
		}
	},
	computed: {
		invalidName () {
			return this.card.name === ''
		},
		invalidType () {
			return this.card.type === ''
		},
		invalidMana () {
			return this.card.mana === ''
		},
		invalidQty () {
			return this.card.qty === '' || (this.card.qty > 4 && !RegExp(/^Basic Land\b/).test(this.card.type))
		}
	},
	methods: {
		handleSubmit () {
			this.clearStatus()
			this.submitting = true

			if (this.invalidName || this.invalidType || this.invalidMana || this.invalidQty) {
				this.error = true
				return
			}

			this.$emit('card-added', this.card, this.activeDeck)

			this.$refs.first.focus()
			this.card = {
				name: '',
				type: '',
				mana: '',
				qty: 1
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
		activeDeck: Object
	}
}
</script>
