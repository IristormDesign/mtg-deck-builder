<template>
	<section id="m-deck-pages">
		<h3>Deck Pages</h3>
		<p>Deck pages are the central focus of MTG Deck Builder: They’re where you build, analyze, and edit the contents of your <i>Magic: The Gathering</i> decks. Every deck you make in the app gets its own deck page.</p>
		<p>
			<img class="screenshot"
				srcset="@/img/manual-deck-page.jpg 1x, @/img/manual-deck-page-2x.jpg 1.5x"
				src="@/img/manual-deck-page.jpg" width="658" height="444"
				alt="Snippet of a deck page on MTG Deck Builder" title="Screenshot" loading="lazy" />
		</p>
		<p>A deck page consists of several different sections. These sections include the following, listed here in the order of their position on the page from top to bottom, left to right:</p>
		<ul>
			<li><a href="#m-deck-name">Deck name</a></li>
			<li><a href="#m-deck-statistics">Deck statistics</a></li>
			<li><a href="#m-card-image">Card image</a></li>
			<li><a href="#m-card-sorter">Card sorter</a></li>
			<li><a href="#m-group-toggler">Card group toggler</a></li>
			<li><a href="#m-sideboard-header">Sideboard header</a></li>
			<li><a href="#m-card-list">Card list</a></li>
			<li><a href="#m-card-quantities">Card quantities</a></li>
			<li><a href="#m-card-adder">Card adder</a></li>
			<li><a href="#m-deck-actions">Deck actions</a></li>
		</ul>
		<p>Each deck page section is going to be explained in further detail.</p>

		<manual-deck-name />
		<manual-deck-statistics />
		<manual-card-image />
		<manual-card-sorter />
		<manual-card-group-toggler />
		<manual-sideboard-header />
		<manual-card-list />
		<manual-card-quantities />
		<manual-card-adder />
		<manual-deck-actions />
	</section>
</template>

<script>
import ManualDeckName from '@/components/ManualDeckName.vue'
import ManualDeckStatistics from '@/components/ManualDeckStatistics.vue'
import ManualCardImage from '@/components/ManualCardImage.vue'
import ManualCardSorter from '@/components/ManualCardSorter.vue'
import ManualCardGroupToggler from '@/components/ManualCardGroupToggler.vue'
import ManualSideboardHeader from '@/components/ManualSideboardHeader.vue'
import ManualCardList from '@/components/ManualCardList.vue'
import ManualCardQuantities from '@/components/ManualCardQuantities.vue'
import ManualCardAdder from '@/components/ManualCardAdder.vue'
import ManualDeckActions from '@/components/ManualDeckActions.vue'

export default {
	components: { ManualDeckName, ManualDeckStatistics, ManualCardImage, ManualCardSorter, ManualCardGroupToggler, ManualSideboardHeader, ManualCardList, ManualCardQuantities, ManualCardAdder, ManualDeckActions }
}
</script>
