<template>
	<section id="m-deck-page-header">
		<h3>Deck Page Header</h3>
		<p>By the top of a <a href="#m-deck-pages">deck page</a> is the deck page header, which comprises the following sections:</p>
		<ul>
			<li><a href="#m-deck-name">Deck name</a></li>
			<li><a href="#m-basic-statistics">Basic statistics</a></li>
			<li><a href="#m-mode-menu">Mode menu</a></li>
			<li><a href="#m-deck-actions">Deck actions</a></li>
		</ul>
		<p>Each of these sections is going to be explained in more detail.</p>
		<p>The deck page header always exists on a deck page, regardless of whichever <a href="#m-deck-page-modes">deck page mode</a> is active.</p>

		<deck-name />
		<basic-statistics />
		<mode-menu />
		<deck-actions />
	</section>
</template>

<script>
import DeckName from '@/components/manual-chapters/DeckName.vue'
import BasicStatistics from '@/components/manual-chapters/BasicStatistics.vue'
import ModeMenu from '@/components/manual-chapters/ModeMenu.vue'
import DeckActions from '@/components/manual-chapters/DeckActions.vue'

export default {
	components: { DeckName, BasicStatistics, ModeMenu, DeckActions }
}
</script>
