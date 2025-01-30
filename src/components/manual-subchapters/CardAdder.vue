<template functional>
	<section id="card-adder" key="card-adder">
		<h4>Card Adder</h4>
		<p>
			<img class="screenshot"
				src="@/img/manual-card-adder.jpg" width="810" height="173"
				alt="Snippet of card adder" title="Screenshot" loading="lazy"
			/>
		</p>
		<p>The card adder is a tool that lets you indicate a new name of a <i>Magic: The Gathering</i> card to be put into your deck. The card adder appears in the section labeled “Add a new card name” in the <a href="#list-editor">List Editor</a>.</p>
		<p>The card adder will insert the new name into the <a href="#card-list">card list</a> for either the main or the sideboard card group, whichever one the <a href="#card-groups">group switch</a> is currently set to. The background color of the card adder section changes as the group does: It appears dark gray when on main, and brown when on sideboard.</p>
		<p>The card adder has a simple submission form that has a text field where you can enter a query for a card. There are three accepted kinds of queries: <a href="#card-name-query">card names</a>, <a href="#scryfall-url-query">Scryfall card page URLs</a>, and the <a href="#random-card-query">“#random” code</a>. Submit your query from the card adder by clicking the “Add” button, or by pressing the Enter/Return key on your keyboard.</p>
		<p>The card adder adds only one card name at a time. If you want to add multiple names at a time, do that on the <a href="#card-list-entry">Card List Entry</a> page.</p>

		<section id="card-name-query">
			<h5>Card Name Query</h5>
			<p>In the <a href="#card-adder">card adder</a>, simply enter the certain name of a <i>Magic</i> card, and that name will be included in the <a href="#card-list">card list</a>. While you start typing letters into the card adder’s text field, a small list of selectable suggestions for card names will appear by it.</p>
			<p>When you submit a card name query, if it turns out to be an invalid name, the app will notify you of the mistake. If a card name has been printed in multiple sets, then usually the one from the last released set is retrieved.</p>
		</section>
		<section id="scryfall-url-query">
			<h5 >Scryfall Card Page URL Query</h5>
			<p>The website <a href="https://scryfall.com" target="_blank">Scryfall</a> has individual pages for every print of every card in <i>Magic</i>. For any card’s Scryfall page, you can copy that page’s URL from your web browser’s web address bar, then paste the URL into the <a href="#card-adder">card adder</a> on MTG Deck Builder. The respective card name will be automatically added to your deck.</p>
			<p>The URL to a Scryfall card page begins with “https://scryfall.com/card/”, followed by the details of the specific card.</p>
			<p>The query for a Scryfall card page URL is useful for adding a card of a certain name that has been printed in multiple sets, and the print you get by default through the <a href="#card-name-query">card name query</a> isn’t the one you prefer. For example, maybe you want another print of a card whose <a href="#card-image">image</a> depicts a different illustration or card set symbol.</p>
			<p>You can submit a Scryfall URL for a card name that already exists in the active <a href="#card-list">card list</a>, but is in a different print. In this case, the app will ask you to confirm whether you want the queried print to replace the existing print.</p>
		</section>
		<section id="random-card-query">
			<h5>Random Card Query</h5>
			<p>You can add the name of a <i>Magic</i> card at random (among cards legal in Vintage tournaments). To do so, enter the code “<strong>#random</strong>” in the <a href="#card-adder">card adder</a>. Your web browser probably also shows “#random” as a selectable option when the card adder’s text field has browser focus.</p>
		</section>
		<section id="card-adder-other-info">
			<h5>Other Information About the Card Adder</h5>
			<ul>
				<li>
					<p>You can press the <kbd>X</kbd> key to have your web browser focus onto the <a href="#card-adder">card adder</a>’s text field. Press <kbd class="">Esc</kbd> to cancel your web browser’s focus on the text field, allowing the use of other <a href="#keyboard-shortcuts">keyboard shortcuts</a>.</p>
				</li>
				<li>
					<p>Card queries are case insensitive (meaning it doesn’t matter whether you type letters as uppercase or lowercase).</p>
				</li>
				<li>
					<p>The card adder won’t add a name that already exists in the <a href="#card-list">card list</a>. (To add duplicates of an existing name, <a href="#card-quantities">increase its quantity</a> instead.)</p>
				</li>
				<li>
					<p>When submitting a query, MTG Deck Builder sends an external data request to the Scryfall web servers, and so retrieving your card’s data may take a second or two to complete.</p>
				</li>
				<li>
					<p>Every newly added card name is put at the bottom of the card list. You can use the <a href="#card-sorter">card sorter</a> afterward to rearrange the newly added names among the rest.</p>
				</li>
			</ul>
		</section>
	</section>
</template>
