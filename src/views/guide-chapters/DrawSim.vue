<template functional>
	<section id="draw-sim" key="draw-sim">
		<h3>Draw Simulator</h3>
		<p>The Draw Simulator is a <router-link to="deck-pages#deck-page-modes">deck page mode</router-link> where you can test the experience of drawing from a shuffled library of your deck’s cards.</p>
		<p>You might find the Draw Simulator helpful for gaining more insight into how your deck could turn out in a game of <i>Magic</i>. After testing a few rounds, if you’re unsatisfied with the drawing results, you always can go back to the <router-link to="list-editor">List Editor</router-link> to make adjustments.</p>
		<p>The page for the Draw Simulator contains the following elements, listed by the order of their positions on the page from top to bottom, left to right:</p>
		<ol>
			<li><a href="#cards-in-library">“Cards in Library” statistic</a></li>
			<li><a href="#drawn-cards">“Drawn Cards” statistic</a></li>
			<li><a href="#draw-a-card">“Draw a Card” button</a></li>
			<li><a href="#restart">“Restart” button</a></li>
			<li><a href="#exclude-starred-cards">“Exclude starred cards” checkbox</a></li>
			<li><a href="#draw-sim-card-list">Card list section</a></li>
			<li><a href="#draw-sim-card-image">Card image section</a></li>
		</ol>

		<section id="cards-in-library">
			<h4>“Cards in Library” Statistic</h4>
			<p>This shows the number of remaining cards you could <a href="#draw-a-card">draw</a>. Whenever you start a new testing round, the cards in your library are the total number of cards in your deck’s main <router-link to="list-editor#card-groups">card group</router-link>. (Cards from the sideboard group aren’t used here.)</p>
			<p>When available and enabled, the <a href="#exclude-starred-cards">“Exclude starred cards” option</a> will reduce the library’s cards from the start.</p>
		</section>

		<section id="drawn-cards">
			<h4 id="drawn-cards">“Drawn Cards” Statistic</h4>
			<p>This shows the number of cards you’ve drawn since starting the current round.</p>
		</section>

		<section id="draw-a-card">
			<h4 id="draw-a-card">“Draw a Card” Button</h4>
			<p>Click this button, or <router-link to="keyboard-shortcuts#kbsc-draw-sim">press the space bar</router-link>, to draw one card from your library. The drawn card’s name appears at the top of the <a href="#draw-sim-card-list">card list</a>, and the <a href="#draw-sim-card-image">card image</a> appears too (if the card image section is already visible on your device’s screen).</p>
			<p>You can keep drawing cards until your library is <a href="#cards-in-library">emptied</a>.</p>
		</section>

		<section id="restart">
			<h4>“Restart” Button</h4>
			<p>Click this button, or press the <kbd>R</kbd> key, anytime to begin a new testing round. This means that all drawn cards are returned to your <a href="#cards-in-library">library</a>, then your library is “shuffled” (the cards are rearranged in a new randomized order).</p>
		</section>

		<section id="exclude-starred-cards">
			<h4>“Exclude Starred Cards” Checkbox</h4>
			<p>This appears only under the conditions that your deck’s main <router-link to="list-editor#card-groups">card group</router-link> has at least one <router-link to="list-editor#card-stars">starred</router-link> card, and that the Draw Simulator’s <a href="#draw-sim-card-list">card list</a> is currently empty.</p>
			<p>Check the “Exclude starred cards” checkbox to prevent <a href="#draw-a-card">drawing</a> any cards with a star during your next testing round. Uncheck it to be able to draw all cards regardless of whether they have a star.</p>
			<p>This option is especially intended for Commander-format decks, where the commander card exists outside the library from the beginning of a game, and it’s the only starred card in your deck in this app.</p>
		</section>

		<section id="draw-sim-card-list">
			<h4>Card List Section</h4>
			<p>This shows the record of the cards you’ve drawn in chronological order during the current round. The list features <router-link to="list-editor#card-bars">card bars</router-link> and <router-link to="list-editor#card-stars">stars</router-link> that work like those same elements in the <router-link to="list-editor">List Editor</router-link>’s <router-link to="list-editor#card-list">card list</router-link>.</p>
			<p><em>Unlike</em> the List Editor, however, the <a href="#draw-sim">Draw Simulator</a> lacks card quantity elements. This is because each item of the Draw Simulator’s card list always represents a single individual card rather than a card name of variable quantity. The Draw Simulator’s list can repeat a card name if your deck has multiple cards of that name.</p>
			<p>A gap will always appear in the list between the seventh and eighth <a href="#drawn-cards">drawn cards</a>. This gap separates what represent your starting hand (usually 7 cards, according to <router-link to="intro#game-rules"><i>Magic</i>’s rules</router-link>) and the rest of your deck.</p>
		</section>

		<section id="draw-sim-card-image">
			<h4>Card Image Section</h4>
			<p>This works like the List Editor’s <router-link to="list-editor#card-image">card image section</router-link>.</p>
		</section>
	</section>
</template>
