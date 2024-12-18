<template>
	<section id="list-editor">
		<h3>List Editor</h3>
		<p>The List Editor is a <a href="#deck-page-modes">deck page mode</a> where you can view, add, remove, and organize every card in your deck.</p>
		<p>The page for the List Editor comprises several different sections. These sections include the following, listed by the order of their positions on the page from top to bottom, left to right:</p>
		<ol>
			<li><a href="#card-image">Card image</a></li>
			<li><a href="#card-sorter">Card sorter</a></li>
			<li><a href="#card-groups">Card group switch</a></li>
			<li><a href="#sideboard-header">Sideboard header</a></li>
			<li>
				<a href="#card-list">Card list</a>
				<ol>
					<li><a href="#card-stars">Card stars</a></li>
					<li><a href="#card-bars">Card bars</a></li>
					<li><a href="#card-quantities">Card quantities</a></li>
				</ol>
			</li>
			<li><a href="#scryfall-button">Scryfall advanced search button</a></li>
			<li><a href="#card-adder">Card adder</a></li>
			<li><a href="#add-card-list">Add Card List button</a></li>
		</ol>
		<p>Each of the List Editor’s sections is going to be explained in further detail.</p>

		<card-image />
		<card-sorter />
		<card-group-switch />
		<sideboard-header />
		<card-list />
		<scryfall-button />
		<add-card-list />
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
import AddCardList from '@/components/manual-chapters/AddCardList.vue'
import CardAdder from '@/components/manual-chapters/CardAdder.vue'

export default {
	components: { CardImage, CardSorter, CardGroupSwitch, SideboardHeader, CardList, ScryfallButton, AddCardList, CardAdder }
}
</script>
