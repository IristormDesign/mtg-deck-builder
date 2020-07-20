<template>
	<div class="deck-list">
		<h2>Deck List</h2>

		<p v-if="deck.length == 0">
			<br>
			This deck currently has no cards.
			<br><br>
		</p>
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
					<td>{{ card.mana }}</td>
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
		deck: []
	}
}
</script>

<style scoped lang="scss">
	table {
		border: 2px solid peru;
		border-collapse: collapse;
		line-height: 1;
	}
	th,
	td {
		text-align: left;
		padding: .375em;
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
			font-size: .75em;
			text-transform: uppercase;
			background: peru;
			color: antiquewhite;
		}
	}
	tbody {
		th {
			text-align: right;
		}
	}
</style>
