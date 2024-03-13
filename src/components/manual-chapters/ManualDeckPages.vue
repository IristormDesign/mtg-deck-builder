<template>
	<section id="m-deck-pages">
		<h3>Deck Pages</h3>
		<p>Deck pages are the central focus of MTG Deck Builder: They’re where you construct, analyze, test, and modify the contents of your <i>Magic: The Gathering</i> decks. Every <a href="#m-create-deck">deck created</a> in the app gets its own deck page.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 1.5x"
				src="@/img/manual-deck-page.jpg" width="658" height="444"
				alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
		</p>
		<p>At the top of any deck page is the deck page header, which comprises the following three sections: <a href="#m-deck-name">deck name</a>, <a href="#m-deck-statistics">deck statistics</a>, and <a href="#m-deck-views">deck views menu</a>.</p>
		<p>Below the deck page header is any one of the three “deck views”: <a href="#m-deck-editor">Deck Editor</a>, <a href="#m-more-stats">More Statistics</a>, or <a href="#m-draw-sim">Draw Simulator</a>. Whichever view is shown, the deck page header always remains visible at the top of the deck page.</p>
		<p>Each of the deck page header’s sections is going to be explained in further detail.</p>

		<manual-deck-name />
		<manual-deck-statistics />
		<manual-deck-views />
	</section>
</template>

<script>
import ManualDeckName from '@/components/manual-chapters/ManualDeckName.vue'
import ManualDeckStatistics from '@/components/manual-chapters/ManualDeckStatistics.vue'
import ManualDeckViews from '@/components/manual-chapters/ManualDeckViews.vue'

export default {
	components: { ManualDeckName, ManualDeckStatistics, ManualDeckViews }
}
</script>
