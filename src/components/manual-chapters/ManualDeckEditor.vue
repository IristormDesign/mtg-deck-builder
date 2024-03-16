<template>
	<section id="m-deck-editor">
		<h3>Deck Editor View</h3>
		<p>The Deck Editor is a <a href="#m-deck-views">deck view</a> where you can see, add, remove, and organize every card in your deck.</p>
		<p>Whenever you arrive on any <a href="#m-deck-pages">deck page</a>, the Deck Editor is the view shown first. If you’ve gone to another view and want to go back to the Deck Editor, click the “Deck Editor” link in the deck views menu.</p>
		<p>The Deck Editor view comprises several different sections. These sections include the following, listed in order by their positions on the page (at least when displayed on large-screen devices) from top to bottom, left to right:</p>
		<ol>
			<li><a href="#m-card-image">Card image</a></li>
			<li><a href="#m-card-sorter">Card sorter</a></li>
			<li><a href="#m-card-groups">Card group switch</a></li>
			<li><a href="#m-sideboard-header">Sideboard header</a></li>
			<li>
				<a href="#m-card-list">Card list</a>
				<ol>
					<li><a href="#m-card-stars">Card stars</a></li>
					<li><a href="#m-card-buttons">Card buttons</a></li>
					<li><a href="#m-card-quantities">Card quantities</a></li>
				</ol>
			</li>
			<li><a href="#m-scryfall-button">Scryfall advanced search button</a></li>
			<li><a href="#m-card-adder">Card adder</a></li>
			<li><a href="#m-deck-actions">Deck actions</a></li>
		</ol>
		<p>Each of the Deck Editor’s sections is going to be explained in further detail.</p>

		<manual-card-image />
		<manual-card-sorter />
		<manual-card-group-switch />
		<manual-sideboard-header />
		<manual-card-list />
		<manual-scryfall-button />
		<manual-card-adder />
		<manual-deck-actions />
	</section>
</template>

<script>
import ManualCardImage from '@/components/manual-chapters/ManualCardImage.vue'
import ManualCardSorter from '@/components/manual-chapters/ManualCardSorter.vue'
import ManualCardGroupSwitch from '@/components/manual-chapters/ManualCardGroupSwitch.vue'
import ManualSideboardHeader from '@/components/manual-chapters/ManualSideboardHeader.vue'
import ManualCardList from '@/components/manual-chapters/ManualCardList.vue'
import ManualScryfallButton from '@/components/manual-chapters/ManualScryfallButton.vue'
import ManualCardAdder from '@/components/manual-chapters/ManualCardAdder.vue'
import ManualDeckActions from '@/components/manual-chapters/ManualDeckActions.vue'

export default {
	components: { ManualCardImage, ManualCardSorter, ManualCardGroupSwitch, ManualSideboardHeader, ManualCardList, ManualScryfallButton, ManualCardAdder, ManualDeckActions }
}
</script>
