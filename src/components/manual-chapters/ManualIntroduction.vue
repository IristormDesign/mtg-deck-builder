<template>
	<section id="intro">
		<figure>
			<img class="intro-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="An illustration of a large, detailed, open book" />
			<figcaption>Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank">Urza’s Tome</a></i> by Aaron Miller</figcaption>
		</figure>
		<p>This document is the user manual for <router-link :to="{name: 'home'}">MTG Deck Builder by Iristorm Design</router-link>. It should help you understand anything you want to know about how this web app works.</p>
		<p>The user manual is divided into many chapters. You can skip directly to a chapter you want to read by clicking the relevant link in the table of contents, or by clicking any chapter links throughout the manual’s text. You could also use your web browser’s “Find” tool (press <span class="no-text-break"><kbd class="ctrl-key">Ctrl</kbd>+<kbd>F</kbd></span> or <span class="no-text-break"><kbd class="ctrl-key">⌘</kbd>+<kbd>F</kbd>)</span> to instantly scroll the page to an instance of a word or phrase you specify.</p>
		<p>The user manual displays screenshots of parts of MTG Deck Builder. Note that some of these screenshots had been taken from earlier versions of the app, so they may look slightly different from the current version.</p>
		<p>The user manual should cover just about anything you’d need to know about using MTG Deck Builder. After reading it over, if you still have an unanswered question, you can <router-link :to="{name: 'contact'}">ask the app developer</router-link>.</p>

		<game-rules />
	</section>
</template>

<script>
import GameRules from '@/components/manual-chapters/GameRules.vue'

export default {
	components: { GameRules }
}
</script>
