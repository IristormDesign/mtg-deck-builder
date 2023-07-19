<template>
	<section id="m-intro">
		<figure>
			<img class="intro-illustration" src="~@/img/urzas-tome.jpg" width="626" height="457" alt="Illustration of a large, detailed, open book" />
			<figcaption>(Illustration: <i><a href="https://scryfall.com/card/dom/235/urzas-tome" target="_blank">Urza’s Tome</a></i> by Aaron Miller)</figcaption>
		</figure>
		<p>This document is the user manual for <router-link :to="{name: 'home'}">MTG Deck Builder by Iristorm Design</router-link>. Here you can learn the details about how this web app works.</p>
		<p>The manual is divided into many chapters. You can skip directly to a chapter you want to read by clicking on the relevant link in the table of contents or on certain other links throughout the manual.</p>
		<p>The manual has screenshots that show parts of MTG Deck Builder. Note that some of these screenshots are of the app in an older version, which may look slightly different from the current version.</p>
		<p>MTG Deck Builder assumes you know how to play <i>Magic: The Gathering</i>. If you have an issue regarding the game’s rules, you can refer to them on the <a href="https://magic.wizards.com/en/rules" target="_blank">official <i>Magic</i> website</a> or the <a href="https://mtg.fandom.com/wiki/Comprehensive_Rules" target="_blank">Fandom MTG Wiki</a>.</p>
		<p>When you start MTG Deck Builder for the first time ever, it provides two sample decks (“Boros Equipment” and “Sultai Ramp”). You may modify these decks however you like or delete them.</p>

		<manual-symbols />
	</section>
</template>

<script>
import ManualSymbols from '@/components/manual-chapters/ManualSymbols.vue'

export default {
	components: { ManualSymbols }
}
</script>
