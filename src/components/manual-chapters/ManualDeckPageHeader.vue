<template>
	<section id="m-deck-page-header">
		<h4>Deck Page Header</h4>
		<p>Positioned by the top of a <a href="#m-deck-pages">deck page</a> is the deck page header. It comprises the following three sections: <a href="#m-deck-name">deck name</a>, <a href="#m-deck-statistics">deck statistics</a>, and <a href="#m-modes-menu">modes menu</a>.</p>

		<manual-deck-name />
		<manual-deck-statistics />
		<manual-modes-menu />
	</section>
</template>

<script>
import ManualDeckName from '@/components/manual-chapters/ManualDeckName.vue'
import ManualDeckStatistics from '@/components/manual-chapters/ManualDeckStatistics.vue'
import ManualModesMenu from '@/components/manual-chapters/ManualModesMenu.vue'

export default {
	components: { ManualDeckName, ManualDeckStatistics, ManualModesMenu }
}
</script>
