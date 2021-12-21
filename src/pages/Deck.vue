<template>
	<div class="deck">
		<div v-for="(deck, i) in $store.state.decks" :key="i">
			<article v-if="deck.path === $route.params.deckPath">
				<div class="wrap">
					<header class="deck-header">
						<deck-name :deck="deck" />
						<deck-colors :deck="deck" />
						<average-mana-value :deck="deck" />
						<date-edited :deck="deck" />
						<card-names :deck="deck" />
						<card-total :deck="deck" />
						<more-stats-button :deck="deck" />
					</header>
				</div>

				<router-view />
			</article>
		</div>
	</div>
</template>

<script>
import DeckName from '@/components/DeckHeaderDeckName.vue'
import DeckColors from '@/components/DeckHeaderDeckColors.vue'
import AverageManaValue from '@/components/DeckHeaderAverageManaValue.vue'
import DateEdited from '@/components/DeckHeaderDateEdited.vue'
import CardNames from '@/components/DeckHeaderCardNames.vue'
import CardTotal from '@/components/DeckHeaderCardTotal.vue'
import MoreStatsButton from '@/components/DeckHeaderMoreStatsButton.vue'

export default {
	components: { DeckName, DeckColors, AverageManaValue, DateEdited, CardNames, CardTotal, MoreStatsButton }
}
</script>

<style lang="scss">
	@import '@/sass/page-deck.scss';
</style>
