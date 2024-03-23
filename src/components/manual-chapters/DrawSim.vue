<template>
	<section id="m-draw-sim">
		<h3>Draw Simulator Mode</h3>
		<p>The Draw Simulator is a <a href="#m-deck-page-modes">deck page mode</a> where you can test the process of drawing from a shuffled library of your deck’s cards.</p>
		<p>You might find the Draw Simulator helpful for gaining a better understanding of how your deck could play out in an actual game. After testing a few rounds, if you’re not satisfied with your deck’s drawing results, you always can return to the <a href="#m-deck-editor">Deck Editor mode</a> to make adjustments.</p>
		<p>The Draw Simulator contains the following parts, listed in order by their positions on the page from top to bottom, left to right:</p>
		<ul>
			<li>
				<p><strong>“Cards in Library” statistic</strong> – This shows the number of remaining cards you could draw. Whenever you start a new round, the “Cards in Library” number is equal to the total cards in your deck’s main <a href="#m-card-groups">card group</a>. (Cards in the sideboard aren’t used here.)</p>
			</li>
			<li>
				<p><strong>“Drawn Cards” statistic</strong> – This shows the number of cards you’ve drawn since starting the current round.</p>
			</li>
			<li>
				<p><strong>“Draw a Card” button</strong> – Click this button to draw one card from your library. The drawn card’s name appears at the top of the card list, and its image appears in the card image section (if that section is visible on your device’s screen).</p>
			</li>
			<li>
				<p><strong>“Restart” button</strong> – Click this button to begin a new testing round. All drawn cards are put back into your library, and then your library is “shuffled” (its cards are rearranged in a new randomized order).</p>
			</li>
			<li>
				<p><strong>Card list</strong> – This section lists your drawn cards in the order you drew them during the current round. The list features <a href="#m-card-stars">card stars</a> and <a href="#m-card-buttons">card buttons</a>, which work like those same elements of the Deck Editor.</p>
				<p>Unlike the Deck Editor, however, card quantities are absent in the Draw Simulator. This is because each item of the Draw Simulator’s card list represents a singular, individual card rather than a card name. The Draw Simulator’s list could repeat a card name if your deck has multiples of it.</p>
				<p>A gap appears in the card list between the seventh and eighth drawn cards. This gap separates what represents the starting hand (normally seven cards according to <a href="#m-game-rules"><i>Magic</i>’s rules</a>) and the rest of the deck.</p>
			</li>
			<li>
				<p><strong>Card image</strong> – This section works like the Deck Editor’s <a href="#m-card-image">card image</a> section.</p>
			</li>
		</ul>
	</section>
</template>
