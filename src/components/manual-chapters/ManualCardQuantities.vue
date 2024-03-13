<template>
	<section id="m-card-quantities">
		<h5>Card Quantities</h5>
		<p>
			<img class="screenshot float-right"
				src="@/img/manual-card-quantities.jpg" width="118" height="256"
				alt="Snippet of card quantities" title="Screenshot" loading="lazy" />
		</p>
		<p>To the right of each <a href="#m-card-buttons">card button</a> is a number representing the quantity (“QTY.”) of that card name in your deck’s <a href="#m-group-switch">selected card group</a>.</p>
		<p>To change a card name’s quantity, do any of the following methods:</p>
		<ul>
			<li>Click the quantity number, then use your keyboard to type in a new number.</li>
			<li>If you’re on a large-screen device, hover your mouse pointer over the quantity number to make a pair of buttons appear beside it. Of that pair of buttons, click the “+” (plus sign) button to increase the quantity, or the “&minus;” (minus sign) to decrease.</li>
			<li>Click the quantity number to make your web browser focus on it. Then press the up-arrow key on your keyboard to increase the quantity, or the down-arrow key to decrease.</li>
		</ul>
		<p>To remove a card name from the card list, decrease its quantity to 0, or delete the quantity number itself. Before the name actually gets removed, the app asks you to confirm the removal. If you choose to cancel instead, then the name stays in your deck with its quantity reset to 1.</p>
		<p>Conforming to <a href="#m-game-rules"><i>Magic</i>’s rules</a>, MTG Deck Builder prevents you from setting card names to a quantity greater than 4—except for the cards of the “basic land” type, and a few certain cards with abilities that specially raise their quantity limits.</p>
	</section>
</template>
