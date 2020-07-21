<template>
	<div class="deck-list">
		<div v-if="deckProp.length == 0">
			<br>
			<p>This deck currently contains no cards.</p>
			<br>
		</div>
		<table v-else>
			<thead>
				<tr>
					<th></th>
					<th>Type</th>
					<th>Mana Cost</th>
					<th>Quantity</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="card in deckProp" v-bind:key="card.name">
					<th>{{ card.name }}</th>
					<td>{{ card.type }}</td>
					<td class="mana-cost">{{ card.mana }}</td>
					<td>{{ card.qty }}</td>
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
		background: #eee;
	}
	th,
	td {
		text-align: left;
		padding: .25em .375em;
		border: 1px solid #bbb;
	}
	thead {
		th {
			font-size: .6667em;
			text-transform: uppercase;
			letter-spacing: (1/32) * 1em;
			background: saddlebrown;
			color: #fff;
			padding: .375em .625em;
		}
	}
	tbody {
		tr {
			transition: all .125s ease-out;

			&:hover {
				background: #f7f7f7;
				color: #000;
				transform: scale(1.0833);
				box-shadow: 0 .125em .25em rgba(#000, .25);
			}
		}
		th {
			text-align: right;
		}
	}
	.mana-cost {
		letter-spacing: .0833em;
	}
</style>
