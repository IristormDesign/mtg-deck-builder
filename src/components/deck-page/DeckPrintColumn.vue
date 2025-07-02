<template>
	<ul>
		<li
			v-for="card in columnCards"
			:key="fullCardName(card)"
			:class="card.starred ? 'starred' : ''"
		>
			<span class="qty-print">
				{{ card.qty }}
				&nbsp;
			</span>
			{{ fullCardName(card) }}
		</li>
	</ul>
</template>

<script>
import doubleFacedCards from '@/mixins/doubleFacedCards'

export default {
	mixins: [doubleFacedCards],
	props: {
		columnCards: Array
	}
}
</script>
