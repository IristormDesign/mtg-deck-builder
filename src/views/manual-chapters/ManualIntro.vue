<template functional>
	<section id="manual-intro" key="manual-intro">
		<figure>
			<img class="card-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="An illustration of a large, detailed, open book" />
			<figcaption>Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank">Urza’s Tome</a></i> by Aaron Miller</figcaption>
		</figure>
		<h3>Introduction</h3>
		<p>This documentation is the user manual for <router-link :to="{name: 'home'}">MTG Deck Builder by Iristorm Design</router-link>. It should help you understand anything you’d want to know about how this web app works.</p>
		<p>The user manual is divided into many chapters. You can skip directly to a chapter you want to read by clicking the relevant link in the table of contents, or by clicking any chapter links throughout the manual’s text.</p>
		<p>The user manual displays screenshots of parts of MTG Deck Builder. Note that some of these screenshots had been taken from earlier versions of the app, so they may look slightly different from the current version.</p>
		<p>After reading over the user manual, if you still have an unanswered question about how to use MTG Deck Builder, you can <router-link :to="{name: 'contact'}">ask the app developer</router-link>.</p>
		<p>Enjoy using MTG Deck Builder!</p>

		<section id="game-rules">
			<h4>Game Rules</h4>
			<p>MTG Deck Builder assumes you’re familiar with <a href="https://magic.wizards.com/" target="_blank"><i>Magic: The Gathering</i></a> and you know how to play it, so this user manual won’t cover those topics.</p>
			<p>If you have an issue concerning the rules of the game, you can refer to them on the <a href="https://magic.wizards.com/en/rules" target="_blank">official <i>Magic</i> website</a> or the <a href="https://mtg.fandom.com/wiki/Comprehensive_Rules" target="_blank">Fandom MTG Wiki</a>.</p>
		</section>
	</section>
</template>
