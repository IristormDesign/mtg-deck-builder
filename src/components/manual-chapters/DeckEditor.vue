<template>
	<section id="m-deck-editor">
		<h3>Deck Editor</h3>
		<p>The Deck Editor is a <a href="#m-deck-page-modes">deck page mode</a> where you can view, add, remove, and organize every card in your deck.</p>
		<p>The page for the Deck Editor comprises several different sections. These sections include the following, listed by the order of their positions on the page from top to bottom, left to right:</p>
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
		</ol>
		<p>Each of the Deck Editor’s sections is going to be explained in further detail.</p>

		<card-image />
		<card-sorter />
		<card-group-switch />
		<sideboard-header />
		<card-list />
		<scryfall-button />
		<card-adder />
	</section>
</template>

<script>
import CardImage from '@/components/manual-chapters/CardImage.vue'
import CardSorter from '@/components/manual-chapters/CardSorter.vue'
import CardGroupSwitch from '@/components/manual-chapters/CardGroupSwitch.vue'
import SideboardHeader from '@/components/manual-chapters/SideboardHeader.vue'
import CardList from '@/components/manual-chapters/CardList.vue'
import ScryfallButton from '@/components/manual-chapters/ScryfallButton.vue'
import CardAdder from '@/components/manual-chapters/CardAdder.vue'

export default {
	components: { CardImage, CardSorter, CardGroupSwitch, SideboardHeader, CardList, ScryfallButton, CardAdder }
}
</script>
