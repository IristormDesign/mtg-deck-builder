<template>
	<section id="m-intro">
		<figure>
			<img class="intro-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<figcaption>(Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank">Urza’s Tome</a></i> by Aaron Miller)</figcaption>
		</figure>
		<p>This document is the user manual for <router-link :to="{name: 'home'}">MTG Deck Builder by Iristorm Design</router-link>. Here you can learn the details about how this web app works.</p>
		<p>The manual is divided into many chapters. You can skip directly to a chapter you want to read by clicking on the relevant link in the table of contents or on certain other links throughout the manual.</p>
		<p>The manual contains screenshots that show parts of MTG Deck Builder. Some of these screenshots have been taken from earlier versions of the app, which may look slightly different from the current version.</p>

		<game-rules />
		<manual-symbols />
	</section>
</template>

<script>
import GameRules from '@/components/manual-chapters/ManualGameRules.vue'
import ManualSymbols from '@/components/manual-chapters/ManualSymbols.vue'

export default {
	components: { GameRules, ManualSymbols }
}
</script>
