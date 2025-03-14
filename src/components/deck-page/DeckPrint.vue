<template>
	<aside class="deck-print-area">
		<h2>{{ deck.name }}</h2>

		<section v-if="mainNotEmpty">
			<h3 v-if="sideboardNotEmpty">Main List</h3>
			<ul :class="classShortList">
				<li
					v-for="card in deck.cards"
					:key="doubleFacedCardName(card)"
					:class="card.starred ? 'starred' : ''"
				>
					<span class="qty-print">
						{{ card.qty }}
						&nbsp;
					</span>
					{{ doubleFacedCardName(card) }}
				</li>
			</ul>
		</section>
		<section v-if="sideboardNotEmpty">
			<h3 v-if="mainNotEmpty">Sideboard List</h3>
			<ul :class="classShortList">
				<li
					v-for="card in deck.sideboard.cards"
					:key="doubleFacedCardName(card)"
					:class="card.starred ? 'starred' : ''"
				>
					<span class="qty-print">
						{{ card.qty }}
						&nbsp;
					</span>
					{{ doubleFacedCardName(card) }}
				</li>
			</ul>
		</section>
		<footer>
			<p>Printed from MTG Deck Builder by Iristorm Design — magic.iristormdesign.com</p>
		</footer>
	</aside>
</template>

<script>
import doubleFacedCards from '@/mixins/doubleFacedCards'

export default {
	mixins: [doubleFacedCards],
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
	}
}
</script>
