<template functional>
	<section id="draw-sim" key="draw-sim">
		<h3>Draw Simulator</h3>
		<p>The Draw Simulator is a <a href="#deck-page-modes">deck page mode</a> where you can test the experience of drawing from a shuffled library of your deck’s cards.</p>
		<p>You might find the Draw Simulator helpful for gaining more insight into how your deck could turn out in a game of <i>Magic</i>. After testing a few rounds, if you’re unsatisfied with the drawing results, you always can go back to the <a href="#list-editor">List Editor</a> to make adjustments.</p>
		<p>The page for the Draw Simulator contains the following elements, listed by the order of their positions on the page from top to bottom, left to right:</p>
		<ol>
			<li>
				<p><strong>“Cards in Library” statistic</strong> – This shows the number of remaining cards you could draw. Whenever you start a new testing round, the cards in your library are the total number of cards in your deck’s main <a href="#card-groups">card group</a>. (The Draw Simulator doesn’t use cards from the sideboard group.)</p>
				<p>When available and enabled, the “Exclude starred cards” option (explained farther below) will reduce the library’s cards from the start.</p>
			</li>
			<li>
				<p><strong>“Drawn Cards” statistic</strong> – This shows the number of cards you’ve drawn since starting the current round.</p>
			</li>
			<li>
				<p><strong>“Draw a Card” button</strong> – Click this button, or <a href="#kbsc-draw-sim">press the space bar</a>, to draw one card from your library. The drawn card’s name appears at the top of the card list, and its image appears (if the card image section is already visible on your device’s screen).</p>
				<p>You can keep drawing cards until your library is emptied.</p>
			</li>
			<li>
				<p><strong>“Restart” button</strong> – Click this button, or press the <kbd>R</kbd> key, anytime to begin a new testing round. This means that all drawn cards are returned to your library, then your library is “shuffled” (the cards are rearranged in a new randomized order).</p>
			</li>
			<li>
				<p><strong>Card list section</strong> – This shows the record of cards you’ve drawn in chronological order during the current round. The list features <a href="#card-bars">card bars</a> and <a href="#card-stars">stars</a> that work like those same elements in the List Editor’s card list.</p>
				<p><em>Unlike</em> the List Editor, however, the Draw Simulator lacks card quantity elements. This is because each item of the Draw Simulator’s card list always represents a single individual card rather than a card name of variable quantity. The Draw Simulator’s list can repeat a card name if your deck has multiple cards of that name.</p>
				<p>A gap will always appear in the list between the seventh and eighth drawn cards. This gap separates what represent your starting hand (usually 7 cards, according to <a href="#game-rules"><i>Magic</i>’s rules</a>) and the rest of your deck.</p>
			</li>
			<li>
				<p><strong>“Exclude starred cards” checkbox</strong> – This appears only in the conditions that your deck’s main card group has at least one <a href="#card-stars">starred</a> card, and that the Draw Simulator’s card list is currently empty.</p>
				<p>Check the “Exclude starred cards” checkbox to prevent drawing any cards with a star during your next testing round. Uncheck it to be able to draw all cards regardless of whether they have a star.</p>
				<p>This option is designed to be enabled for Commander-format decks, where the commander should be your deck’s one and only starred card, and it always begins outside the library.</p>
			</li>
			<li>
				<p><strong>Card image section</strong> – This works like the List Editor’s <a href="#card-image">card image section</a>.</p>
			</li>
		</ol>
	</section>
</template>
