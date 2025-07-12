<template>
	<div
		class="card-lists"
		:class="twoColumnsClass(cardEntryCategory)"
	>
		<section v-if="cardEntryCategory.main.length > 0">
			<h5>Main Group</h5>
			<ul>
				<li
					v-for="(card, index) of cardEntryCategory.main"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
		</section>
		<section v-if="cardEntryCategory.sideboard.length > 0">
			<h5>Sideboard Group</h5>
			<ul>
				<li
					v-for="(card, index) of cardEntryCategory.sideboard"
					:key="index"
				>{{ displayFullName(card) }} (&times;{{ card.qty }})</li>
			</ul>
		</section>
	</div>
</template>

<script>

export default {
	props: {
		cardEntryCategory: Object
	},
	methods: {
		displayFullName (card) {
			return card.name + (card.name2 ? ` // ${card.name2}` : '')
		},
		twoColumnsClass (cardEntryCategory) {
			if (
				cardEntryCategory.main.length > 0 &&
				cardEntryCategory.sideboard.length > 0
			) {
				return 'two-columns'
			} else {
				return ''
			}
		}
	}
}
</script>
