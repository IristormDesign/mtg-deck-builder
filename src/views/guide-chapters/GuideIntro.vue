<template>
	<section id="guide-intro" key="guide-intro">
		<figure class="card-illustration">
			<img
				src="@/img/urza's-tome.jpg"
				srcset="@/img/urza's-tome.jpg 1x, @/img/urza's-tome@2x.jpg 2x"
				width="469" height="364"
				alt="An illustration of a huge book, opened to pages displaying detailed diagrams"
			/>
			<figcaption>Illustration from <a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank">Urza’s Tome<svg><use href="#open-in-new-icon" /></svg></a> by Aaron Miller</figcaption>
		</figure>
		<h3>Introduction</h3>
		<p>This documentation is the User Guide to <router-link to="/">MTG Deck Builder by Iristorm Design</router-link>. It should help you understand anything you’d want to know about how this web app works.</p>
		<p>The User Guide consists of many chapters. You can skip directly to a chapter you want to read by clicking the relevant link in the <a href="#toc" @click.prevent="$emit('tocLinkClicked')">table of contents</a>, or by clicking any chapter links existing throughout the Guide’s text.</p>
		<p>The User Guide displays screenshots of parts of MTG Deck Builder. Note that some of these screenshots had been taken from <router-link to="/release-notes">earlier versions</router-link> of the app, and so they may look slightly different from the current version.</p>
		<p>After reading over the User Guide, if you still have an unanswered question about MTG Deck Builder, feel free to <router-link to="/contact">ask the app developer</router-link>.</p>
		<p>Enjoy using MTG Deck Builder!</p>

		<section id="game-rules">
			<h4>Game Rules</h4>
			<p>MTG Deck Builder assumes you already know what <a href="https://magic.wizards.com/" target="_blank"><i>Magic: The Gathering</i><svg><use href="#open-in-new-icon" /></svg></a> is and how to play it, and so this User Guide doesn’t cover those subjects.</p>
			<p>If needed, you can refer to the game’s rules on the <a href="https://mtg.wiki/page/Comprehensive_Rules" target="_blank">MTG Wiki<svg><use href="#open-in-new-icon" /></svg></a> or the <a href="https://magic.wizards.com/rules" target="_blank">official <i>Magic</i> website<svg><use href="#open-in-new-icon" /></svg></a>.</p>
		</section>
	</section>
</template>
