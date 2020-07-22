<template>
	<div class="deck-list">
		<div v-if="deckProp.length == 0">
			<br>
			<p>This deck contains no cards.</p>
			<br>
		</div>
		<table v-else>
			<thead>
				<tr>
					<th></th>
					<th>Card Type</th>
					<th>Mana Cost</th>
					<th>Quantity</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="card in deckProp" v-bind:key="card.name">
					<th>{{ card.name }}</th>
					<td>{{ card.type }}</td>
					<td class="mana-cost">{{ card.mana }}</td>
					<td class="qty">
						<button v-on:click="$emit('decQtyEvent', card)">&minus;</button>

						<span>{{ card.qty }}</span>

						<button
							v-if="card.qty < 4 || card.type == 'Basic Land'"
							v-on:click="$emit('incQtyEvent', card)"
						>+</button>
						<button v-else
							disabled
							title="Only up to 4 duplicates of each card are allowed, except for basic land cards which are unlimited."
						>+</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'deck-list',
	props: {
		deckProp: Array
	}
}
</script>

<style scoped lang="scss">
	table {
		border: 3px solid #222;
		border-collapse: collapse;
		line-height: 1;
		background: #fff;
		width: 75%;
	}
	th,
	td {
		text-align: left;
		padding: .25em .375em;
		border: 1px solid #ccc;
	}
	thead {
		th {
			font-size: .75em;
			text-transform: uppercase;
			letter-spacing: (1/32) * 1em;
			background: #000;
			color: #ccc;
			padding: .375em .625em;
		}
	}
	tbody {
		tr {
			transition: all .125s linear;

			&:hover {
				background: rgba(salmon, .25);
				color: #000;
				transition-duration: 0s;

				th,
				td {
					border-right-color: darksalmon;
					border-left-color: darksalmon;
				}
			}
		}
		th {
			text-align: right;
		}
	}
	.mana-cost {
		letter-spacing: .0833em;
	}
	.qty {
		button {
			background: salmon;
			color: #fff;
			font-weight: bold;
			line-height: 1;
			font-size: 1.25em;
			margin: 0;
			transition: all .125s ease;
			border-radius: .375em;
			border: 2px solid rgba(#000, .75);
			border-top-color: rgba(#fff, .75);
			border-right-color: rgba(#000, .5);
			border-left-color: rgba(#fff, .5);
			padding: 0 .375em;
			outline: 0;
			cursor: pointer;

			&[disabled] {
				&,
				&:hover,
				&:focus {
					background: gray;
					cursor: not-allowed;
					opacity: .375;
				}
			}
			&:first-of-type {
				margin-right: .375em;
			}
			&:last-of-type {
				margin-left: .375em;
			}
			&:hover,
			&:focus {
				background: orangered;
			}
			&:active {
				background: orange;
				transition-duration: 0s;
			}
		}
		span {
			display: inline-block;
			width: 1.25em;
			text-align: center;
		}
	}
</style>
