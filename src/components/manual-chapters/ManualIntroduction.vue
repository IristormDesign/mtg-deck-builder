<template>
	<section id="m-intro">
		<figure>
			<img class="intro-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<figcaption>(Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank">Urza’s Tome</a></i> by Aaron Miller)</figcaption>
		</figure>
		<p>This document is the user manual for <router-link :to="{name: 'home'}">MTG Deck Builder by Iristorm Design</router-link>. It should help you understand anything you want to know about how this web app works.</p>
		<p>The manual is divided into many chapters. You can skip directly to a chapter you want to read by clicking the relevant link in the table of contents, or by clicking any chapter links throughout the manual’s text.</p>
		<p>The manual displays screenshots of parts of MTG Deck Builder. Some of these screenshots were taken from earlier versions of the app, and so they may look slightly different from the current version.</p>

		<game-rules />
	</section>
</template>

<script>
import GameRules from '@/components/manual-chapters/GameRules.vue'

export default {
	components: { GameRules }
}
</script>
