<template>
	<section id="m-deck-page-header">
		<h4>Deck Page Header</h4>
		<p>Constantly positioned by the top of a <a href="#m-deck-pages">deck page</a> is the deck page header. It comprises the following three sections: <a href="#m-deck-name">deck name</a>, <a href="#m-basic-statistics">basic statistics</a>, and <a href="#m-modes-menu">modes menu</a>.</p>

		<deck-name />
		<basic-statistics />
		<modes-menu />
	</section>
</template>

<script>
import DeckName from '@/components/manual-chapters/DeckName.vue'
import BasicStatistics from '@/components/manual-chapters/BasicStatistics.vue'
import ModesMenu from '@/components/manual-chapters/ModesMenu.vue'

export default {
	components: { DeckName, BasicStatistics, ModesMenu }
}
</script>
