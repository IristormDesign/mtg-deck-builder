<template>
	<aside class="deck-print-area">
		<h2>{{ deck.name }}</h2>

		<section v-if="mainNotEmpty">
			<h3 v-if="sideboardNotEmpty">Main List</h3>
			<div v-if="this.deck.cards.length + this.deck.sideboard.cards.length <= 33">
				<ul>
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
			</div>
			<div v-else class="long-list-in-columns">
				<ul>
					<li
						v-for="card in deck.cards.slice(0, (deck.cards.length + 1) / 3)"
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
				<ul>
					<li
						v-for="card in deck.cards.slice((deck.cards.length + 1) / 3, ((deck.cards.length + 1) / 3) * 2)"
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
				<ul>
					<li
						v-for="card in deck.cards.slice(((deck.cards.length + 1) / 3) * 2, ((deck.cards.length + 1) / 3) * 3)"
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
			</div>
		</section>
		<section v-if="sideboardNotEmpty">
			<h3 v-if="mainNotEmpty">Sideboard List</h3>
			<div v-if="this.deck.cards.length + this.deck.sideboard.cards.length <= 33">
				<ul>
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
			</div>
			<div v-else class="long-list-in-columns">
				<ul>
					<li
						v-for="card in deck.sideboard.cards.slice(0, (deck.sideboard.cards.length + 1) / 3)"
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
				<ul>
					<li
						v-for="card in deck.sideboard.cards.slice((deck.sideboard.cards.length + 1) / 3, ((deck.sideboard.cards.length + 1) / 3) * 2)"
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
				<ul>
					<li
						v-for="card in deck.sideboard.cards.slice(((deck.sideboard.cards.length + 1) / 3) * 2, ((deck.sideboard.cards.length + 1) / 3) * 3)"
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
			</div>
		</section>
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
	}
}
</script>
