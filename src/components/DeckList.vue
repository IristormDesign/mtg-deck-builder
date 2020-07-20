<template>
	<div class="deck-list">
		<h2>Deck List</h2>

		<div v-if="deck.length == 0">
			<br>
			<p>This deck currently has no cards.</p>
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
				<tr v-for="card in deck" :key="card.name">
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
		deck: Array
	}
}
</script>

<style scoped lang="scss">
	table {
		border: 3px solid peru;
		border-collapse: collapse;
		line-height: 1;
	}
	th,
	td {
		text-align: left;
		padding: .25em .375em;
		border: 1px solid peru;
	}
	tr {
		transition: all .125s linear;

		&:hover {
			background: rgba(powderblue, .25);
			transition-duration: 0s;
			color: #000;
		}
	}
	thead {
		th {
			font-size: .875em;
			font-variant: small-caps;
			background: saddlebrown;
			color: antiquewhite;
			padding: .25em .5em
		}
	}
	tbody {
		th {
			text-align: right;
		}
	}
	.mana-cost {
		font-family: monospace;
		letter-spacing: .0833em;
	}
</style>
