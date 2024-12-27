<template functional>
	<section id="card-quantities" key="card-quantities">
		<h5>Card Quantities</h5>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-quantities.jpg" width="118" height="256"
				alt="Snippet of card quantities" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>Each card name in the <a href="#list-editor">List Editor</a>’s <a href="#card-list">card list</a> has a quantity section, located to the right of the name’s <a href="#card-bars">card bar</a>. This section shows the name’s quantity as it is within the <a href="#card-groups">card group</a> you’re currently viewing, and provides you controls to change the quantity.</p>
		<p>One way to edit a card name’s quantity is to click directly on the quantity number, which makes your web browser focus on the quantity input field. While the field has focus, you can use your keyboard to type in a new number.</p>
		<p>Other ways to change a card name’s quantity are to click any of the buttons among the card name’s cluster of quantity-adjustment buttons. This button cluster is normally invisible, but it appears to the right of the quantity input field whenever that field has browser focus, or whenever you hover your mouse pointer over the field.</p>
		<p>The cluster of quantity-adjustment buttons has the following buttons with their effects:</p>
		<ul>
			<li>
				<p><strong>Increase quantity</strong> – Click the button labeled with the “+” (plus sign) to raise the card name’s quantity in the current card group by 1.</p>
			</li>
			<li>
				<p><strong>Decrease quantity</strong> – Click the button labeled with the “−” (minus sign) to lower the card name’s quantity in the current card group by 1.</p>
			</li>
			<li>
				<p><strong>Move to other group</strong> – There’s a third button whose label changes depending on which of the two card groups you’re currently viewing. This label appears as either a right-pointing triangle and the letters “SB” (short for “sideboard”), or a left-pointing triangle and the letter “M” (for “main”). Click this button to take 1 of the card name out of the <i>active</i> card group, and put that name into the <i>inactive</i> group—i.e., move the card from main <a href="#sideboard-uses">to sideboard</a>, or vice versa.</p>
			</li>
		</ul>
		<p>To completely remove a card name from a card list, decrease its quantity down to 0, or delete the quantity number. Before the name actually gets removed, the app asks you to confirm the removal. If you choose to cancel instead, then the name stays in your deck with its quantity reset to 1.</p>
		<p>You can adjust card names’ quantities using <a href="#keyboard-shortcuts">keyboard shortcuts</a> on the currently highlighted row of the card list:</p>
		<ul>
			<li>Press <kbd>E</kbd> to increase the quantity by 1, or <kbd>D</kbd> to decrease it by 1. </li>
			<li>Press <kbd>F</kbd> to move 1 card into the inactive card group.</li>
			<li>Hold down <kbd class="shift-key">Shift</kbd> while pressing one of the aforementioned keys to adjust the quantity by 2 instead of 1.</li>
		</ul>
		<p>Conforming to <a href="#game-rules"><i>Magic</i>’s rules</a>, MTG Deck Builder prevents you from setting card names to a quantity greater than 4—except for the basic land cards, and a few certain cards with abilities that specially raise their quantity limits.</p>
	</section>
</template>
