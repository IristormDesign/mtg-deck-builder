<template>
	<div id="card-adder">
		<h2>Add Card to Deck</h2>
		<form v-on:submit.prevent="handleSubmit">
			<label>
				Name:
				<input
					type="text"
					v-model="card.name"
					v-bind:class="{ 'has-error': submitting && invalidName }"
					v-on:focus="clearStatus"
					v-on:keypress="clearStatus"
					ref="first"
				>
			</label>
			<label>
				Type:
				<input
					type="text"
					v-model="card.type"
					v-bind:class="{ 'has-error': submitting && invalidType }"
					v-on:focus="clearStatus"
				>
			</label>
			<label>
				Mana Cost:
				<input
					type="text"
					v-model="card.mana"
					v-bind:class="{ 'has-error': submitting && invalidMana }"
					v-on:focus="clearStatus"
				>
			</label>
			<label>
				Quantity:
				<input
					type="text"
					v-model="card.qty"
					v-bind:class="{ 'has-error': submitting && invalidQty }"
					v-on:focus="clearStatus"
				>
			</label>
			<button>Add Card</button>
			<div class="message">
				<span v-if="error && submitting" class="error-message">
					🛑 Please fill in the required form fields.
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
				qty: ''
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
			return this.card.qty === ''
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

			this.$emit('addCardEvent', this.card)

			this.$refs.first.focus()
			this.card = {
				name: '',
				type: '',
				mana: '',
				qty: ''
			}
			this.error = false
			this.success = true
			this.submitting = false
		},

		clearStatus () {
			this.success = false
			this.error = false
		}
	}
}
</script>

<style scoped lang="scss">
	h2 {
		margin-bottom: 0;
	}
	label {
		font-weight: bold;
		display: block;
		margin: .375em 0
	}
	input {
		font-size: 1em;
		line-height: 1.5;
	}
	button {
		font-size: 1em;
		padding: .375em;
	}
	.message {
		margin-left: .75em;
		font-size: .875em;
		display: inline-block
	}
  .error-message {
    color: #d33c40;
  }
  .success-message {
    color: #32a95d;
  }
	.has-error {
		background: #d33c40;
	}
</style>
