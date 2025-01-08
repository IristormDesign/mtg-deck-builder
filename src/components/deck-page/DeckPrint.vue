<template>
	<aside class="deck-print-area">
		<h2>{{ deck.name }}</h2>

		<section v-if="mainNotEmpty">
			<h3 v-if="sideboardNotEmpty">Main List</h3>
			<ul :class="classShortList">
				<li
					v-for="card in deck.cards"
					:key="getFullName(card)"
					:class="card.starred ? 'starred' : ''"
				>
					<span class="qty-print">
						{{ card.qty }}
						&nbsp;
					</span>
					{{ getFullName(card) }}
				</li>
			</ul>
		</section>
		<section v-if="sideboardNotEmpty">
			<h3 v-if="mainNotEmpty">Sideboard List</h3>
			<ul :class="classShortList">
				<li
					v-for="card in deck.sideboard.cards"
					:key="getFullName(card)"
					:class="card.starred ? 'starred' : ''"
				>
					<span class="qty-print">
						{{ card.qty }}
						&nbsp;
					</span>
					{{ getFullName(card) }}
				</li>
			</ul>
		</section>
		<footer>
			<p>Printed from MTG Deck Builder by Iristorm Design — magic.iristormdesign.com</p>
		</footer>
	</aside>
</template>

<script>
export default {
	props: {
		deck: Object,
		mainNotEmpty: Boolean,
		sideboardNotEmpty: Boolean
	},
	computed: {
		classShortList () {
			const totalItems = this.deck.cards.length + this.deck.sideboard.cards.length

			return totalItems < 33 ? 'short-list' : ''
		}
	},
	methods: {
		getFullName (card) {
			if (card.name2) {
				return `${card.name} // ${card.name2}`
			} else {
				return card.name
			}
		}
	}
}
</script>
