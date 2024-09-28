<template functional>
	<section id="card-quantities" key="card-quantities">
		<h5>Card Quantities</h5>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-quantities.jpg" width="118" height="256"
				alt="Snippet of card quantities" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>To the right of each card name’s <a href="#card-bars">bar</a> in the <a href="#card-list">card list</a> is a number representing the quantity of that card name in your deck’s selected <a href="#card-groups">card group</a>.</p>
		<p>To change a card name’s quantity, do any of the following methods:</p>
		<ul>
			<li>
				<p>Click the quantity number field, then use your keyboard to type in a new number.</p>
			</li>
			<li>
				<p>If you’re on a large-screen device, hover your mouse pointer over the quantity number to make a pair of buttons appear beside it. Of that pair of buttons, click the “+” (plus sign) button to increase the quantity, or the “&minus;” (minus sign) to decrease it.</p>
			</li>
			<li>
				<p>With the card list row highlighted via <a href="#keyboard-shortcuts">keyboard shortcuts</a>, press <kbd>E</kbd> to increase the quantity, or <kbd>D</kbd> to decrease it. Or, while holding <kbd class="shift-key">Shift</kbd>, press <kbd>E</kbd> or <kbd>D</kbd> to adjust the quantity by 2 instead of 1.</p>
			</li>
		</ul>
		<p>To remove a card name from the card list, decrease its quantity to 0, or delete the quantity number itself. Before the name actually gets removed, the app asks you to confirm the removal. If you choose to cancel instead, then the name stays in your deck with its quantity reset to 1.</p>
		<p>Conforming to <a href="#game-rules"><i>Magic</i>’s rules</a>, MTG Deck Builder prevents you from setting card names to a quantity greater than 4—except for the cards of the “basic land” type, and a few certain cards with abilities that specially raise their quantity limits.</p>
	</section>
</template>
