<template>
	<div id="deck-list">
		<div v-if="deckProp.length == 0" class="no-cards">
			<p>This deck contains no cards.</p>
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
				<tr v-for="card in deckProp" v-bind:key="card.name" v-on:click="$emit('showCardEvent', card)">
					<th>{{ card.name }}</th>
					<td>{{ card.type }}</td>
					<td class="mana-cost">{{ card.mana }}</td>
					<td class="qty">
						<button v-on:click="$emit('decQtyEvent', card)">&minus;</button>

						<span>{{ card.qty }}</span>

						<button
							v-if="card.qty < 4 || RegExp(/^Basic Land\b/).test(card.type)"
							v-on:click="$emit('incQtyEvent', card)"
						>+</button>
						<button v-else disabled>+</button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="card-display">
			<img src="img/cards/forest.jpg" alt="Card" width="336" height="468">
		</div>
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
#deck-list {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: .75em;
}
.no-cards {
	grid-column: span 2;
	display: flex;
	align-items: center;
	justify-content: center;
}
table {
	border: 3px solid #222;
	border-collapse: collapse;
	line-height: 1;
	background: #fff;
	grid-column: span 2;
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
			background: rgba(skyblue, .25);
			color: #000;
			transition-duration: 0s;

			th,
			td {
				border-right-color: skyblue;
				border-left-color: skyblue;
			}
		}
	}
	th {
		text-align: right;
		word-wrap:unset;
	}
}
.mana-cost {
	letter-spacing: .125em;
}
.qty {
	display: flex;
	align-items: center;
	border-bottom: 0;
	border-left: 0;

	button {
		background: salmon;
		color: #000;
		font-weight: bold;
		line-height: 1;
		font-size: 1.25em;
		margin: 0;
		transition: all .125s ease, opacity .25s ease;
		border-radius: .375em;
		border: 1px solid rgba(#000, .5);
		border-top-width: 0;
		border-right-color: rgba(#000, .25);
		border-bottom-width: 2px;
		border-left-color: rgba(#fff, .5);
		padding: 0 .375em;
		outline: 0;
		cursor: pointer;
		position: relative;
		display: block;

		&[disabled] {
			&,
			&:hover,
			&:focus {
				background: gray;
				cursor: default;
				opacity: .333;
			}
		}
		&:first-of-type {
			margin-right: .375em;
		}
		&:last-of-type {
			margin-left: .375em;
		}
		&:hover {
			background: orangered;
		}
		&:focus:not(:hover) {
			outline: 1px dashed #333;
		}
		&:active {
			transition-duration: 0s;
			border-top-width: 0;
			border-bottom-width: 0;
			margin-bottom: -2px;
		}
	}
	span {
		display: inline-block;
		width: 1.25em;
		text-align: center;
	}
}
.card-display {
	grid-column: span 1;

	img {
		display: block;
		width: 100%;
		max-width: 672px;
		height: auto;
		border-radius: 12px;
	}
}
</style>
