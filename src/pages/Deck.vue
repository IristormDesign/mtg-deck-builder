<template>
	<article>
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="$route.params.deckPath === deck.path">
				<header class="deck-header">
					<deck-name :deck="deck" />
					<deck-colors :deck="deck" />
					<average-mana-value :deck="deck" />
					<date-edited :deck="deck" />
					<card-names :deck="deck" />
					<card-total :deck="deck" />
					<more-stats-button :deck="deck" />
				</header>

				<router-view />
			</article>
		</div>
	</article>
</template>

<script>
import DeckName from '@/components/DeckName.vue'
import DeckColors from '@/components/DeckColors.vue'
import AverageManaValue from '@/components/AverageManaValue.vue'
import DateEdited from '@/components/DateEdited.vue'
import CardNames from '@/components/CardNames.vue'
import CardTotal from '@/components/CardTotal.vue'
import MoreStatsButton from '@/components/MoreStatsButton.vue'

export default {
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, MoreStatsButton }
}
</script>

<style lang="scss">
	@import '@/sass/page-deck.scss';
</style>
