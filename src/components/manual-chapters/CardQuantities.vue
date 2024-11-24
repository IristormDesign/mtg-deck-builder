<template functional>
	<section id="card-quantities" key="card-quantities">
		<h5>Card Quantities</h5>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-quantities.jpg" width="118" height="256"
				alt="Snippet of card quantities" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>Each card name in the <a href="#deck-editor">Deck Editor</a>’s <a href="#card-list">card list</a> has a quantity section, located to the right of the name’s <a href="#card-bars">card bar</a>. This section shows the name’s quantity as it is within the active <a href="#card-groups">card group</a> of your deck, and provides you controls to change the quantity.</p>
		<p>One way to edit a card name’s quantity is to click directly on the quantity number, which makes your web browser focus on the quantity input field. While the field has focus, you can use your keyboard to type in a new number.</p>
		<p>Other ways to change a card name’s quantity are to click any of the buttons among the card name’s cluster of quantity-adjustment buttons. This button cluster is normally invisible, but it appears to the right of the quantity input field whenever that field has browser focus, or whenever you hover your mouse pointer over the field.</p>
		<p>The cluster of quantity-adjustment buttons has the following buttons with their effects:</p>
		<ul>
			<li>
				<p>Click the button labeled with the “+” (plus sign) to <i>increase</i> the card name’s quantity by 1.</p>
			</li>
			<li>
				<p>Click the button labeled with the “−” (minus sign) to <i>decrease</i> the card name’s quantity by 1.</p>
			</li>
			<li>
				<p>There’s a third button labeled with either a “▶” (right-pointing triangle) and the letters “SB” (short for “sideboard”), or a “◀” (left-pointing triangle) and the letter “M” (short for “main”), depending on which card group is currently active. Click this button to move 1 of the card name out of the active card group and into the inactive one—i.e., from main <a href="#sideboard-uses">to sideboard</a>, or vice versa.</p>
			</li>
		</ul>
		<p>To remove a card name from the card list, decrease its quantity down to 0, or delete the quantity number. Before the name actually gets removed, the app asks you to confirm the removal. If you choose to cancel instead, then the name stays in your deck with its quantity reset to 1.</p>
		<p>You can adjust card names’ quantities using <a href="#keyboard-shortcuts">keyboard shortcuts</a> on the currently highlighted row of the card list:</p>
		<ul>
			<li>Press <kbd>E</kbd> to increase the quantity by 1, or <kbd>D</kbd> to decrease it by 1. </li>
			<li>Press <kbd>F</kbd> to move 1 card into the inactive card group.</li>
			<li>Hold down <kbd class="shift-key">Shift</kbd> while pressing one of the aforementioned keys to adjust the quantity by 2 instead of 1.</li>
		</ul>
		<p>Conforming to <a href="#game-rules"><i>Magic</i>’s rules</a>, MTG Deck Builder prevents you from setting card names to a quantity greater than 4—except for the basic land cards, and a few certain cards with abilities that specially raise their quantity limits.</p>
	</section>
</template>
