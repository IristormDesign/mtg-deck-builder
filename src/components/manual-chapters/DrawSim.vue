<template>
	<section id="m-draw-sim">
		<h3>Draw Simulator</h3>
		<p>The Draw Simulator is a <a href="#m-deck-page-modes">deck page mode</a> where you can test the experience of drawing from a shuffled library of your deck’s cards.</p>
		<p>You might find the Draw Simulator helpful for gaining more insight on how your deck could turn out in a game of <i>Magic</i>. After testing a few rounds, if you’re unsatisfied with the drawing results, you always can go back to the <a href="#m-deck-editor">Deck Editor mode</a> to make adjustments.</p>
		<p>The page for the Draw Simulator contains the following parts, listed by the order of their positions on the page from top to bottom, left to right:</p>
		<ol>
			<li>
				<p><strong>“Cards in Library” statistic</strong> – This shows the number of remaining cards you could draw. Whenever you start a new round, the “Cards in Library” are the total cards in your deck’s main <a href="#m-card-groups">card group</a>. (Cards in the sideboard aren’t used here.)</p>
			</li>
			<li>
				<p><strong>“Drawn Cards” statistic</strong> – This shows the number of cards you’ve drawn since starting the current round.</p>
			</li>
			<li>
				<p><strong>“Draw a Card” button</strong> – Click this button to draw one card from your library. The drawn card’s name appears at the top of the card list, and its image appears (if the card image section is already visible on your device’s screen).</p>
				<p>You can keep clicking “Draw a Card” as many times as you have cards left in your library.</p>
			</li>
			<li>
				<p><strong>“Restart” button</strong> – Click this button anytime to begin a new testing round: All drawn cards are returned to your library, then your library is shuffled (the cards are rearranged in a new randomized order).</p>
			</li>
			<li>
				<p><strong>Card list section</strong> – This shows the record of cards you’ve drawn in chronological order during the current round. The list has <a href="#m-card-stars">card stars</a> and <a href="#m-card-buttons">card buttons</a> that work like those same elements in the Deck Editor.</p>
				<p>Unlike the Deck Editor, however, card quantities are absent in the Draw Simulator. This is because each item of the Draw Simulator’s card list always represents a single individual card rather than a card name of variable quantity. The Draw Simulator’s list could repeat a card name if your deck has multiples of it.</p>
				<p>A gap will appear in the list between the seventh and eighth drawn cards. This gap visually separates what represents your starting hand (usually seven cards according to <a href="#m-game-rules"><i>Magic</i>’s rules</a>) and the rest of your deck.</p>
			</li>
			<li>
				<p><strong>Card image section</strong> – This works like the Deck Editor’s <a href="#m-card-image">card image</a> section.</p>
			</li>
		</ol>
	</section>
</template>
