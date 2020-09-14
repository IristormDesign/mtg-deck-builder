<template>
	<header class="deck-header">
		<h2>{{ deck.name }}</h2>

		<div class="sorter">
			<h3>Sort Cards By</h3>
			<select v-model="sort">
				<option>Name</option>
				<option>Converted mana cost</option>
				<option>Type</option>
				<option>Quantity</option>
			</select>
		</div>

		<div class="date-edited">
			<h3>Last Edited On</h3>

			<div class="date">
				{{ dateEdited(deck) }}
			</div>
		</div>

		<div class="total-cards">
			<h3>Total Cards</h3>

			<div class="amount">
				{{ totalCards }}
				<span
					class="warning-symbol" v-show="totalCards < 60"
					title="The minimum card limit is 60."
				>⚠</span>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'deck-header',
	data () {
		return {
			sort: 'Type'
		}
	},
	props: {
		deck: Object
	},
	methods: {
		dateEdited (deck) {
			const date = deck.editDate

			if (date instanceof Date) {
				let month = date.getMonth() + 1
				const day = date.getDate()
				const year = date.getFullYear()
				let hour = date.getHours()
				let minute = date.getMinutes()
				let second = date.getSeconds()

				switch (month) {
				case 1:
					month = 'Jan.'
					break
				case 2:
					month = 'Feb.'
					break
				case 3:
					month = 'Mar.'
					break
				case 4:
					month = 'Apr.'
					break
				case 5:
					month = 'May'
					break
				case 6:
					month = 'June'
					break
				case 7:
					month = 'July'
					break
				case 8:
					month = 'Aug.'
					break
				case 9:
					month = 'Sep.'
					break
				case 10:
					month = 'Oct.'
					break
				case 11:
					month = 'Nov.'
					break
				case 12:
					month = 'Dec.'
					break
				}

				if (hour < 10) {
					hour = '0' + hour
				}
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}

				return month + ' ' + day + ', ' + year + ', ' + hour + ':' + minute + ':' + second
			} else {
				return '—'
			}
		}
	},
	computed: {
		totalCards () {
			let total = 0

			this.deck.cards.forEach(card => {
				for (let i = 0; i < card.qty; i++) {
					total++
				}
			})

			return total
		},

		// The Vue 2 `watch` feature doesn't work with multiple parameters, so this is a workaround.
		parametersForSorting () {
			return [this.sort, this.deck]
		}
	},
	watch: {
		parametersForSorting: function (p) {
			const sortOption = p[0]
			const deck = p[1]

			switch (sortOption) {
			case 'Name':
				this.$emit('sort-cards', 'name', deck)
				break
			case 'Converted mana cost':
				this.$emit('sort-cards', 'mana', deck)
				break
			case 'Type':
				this.$emit('sort-cards', 'type', deck)
				break
			case 'Quantity':
				this.$emit('sort-cards', 'qty', deck)
				break
			}
		}
	}
}
</script>
