<template>
	<article class="contact-page content-box">
		<h2>Contact</h2>

		<p>The creator of MTG Deck Builder is Damian Schmidt of <a href="https://iristormdesign.com/" target="_blank">Iristorm Design<svg><use href="#open-in-new-icon" /></svg></a>. You can reach him for questions, praise, or insults through any of the following media. Bug reports are appreciated.</p>

		<figure class="card-illustration">
			<img
				src="@/img/tidings.jpg"
				srcset="@/img/tidings.jpg 1x, @/img/tidings@2x.jpg 2x"
				width="469" height="343"
				alt="An illustration of a man's hand pressing a wax seal onto a scroll by candlelight"
			/>
			<figcaption>Illustration from <a href="https://scryfall.com/card/c18/108/tidings" target="_blank">Tidings<svg><use href="#open-in-new-icon" /></svg></a> by Pete Venters</figcaption>
		</figure>

		<div class="column">
			<h3>Email</h3>
			<p>Write an email to <a href="mailto:damian@iristormdesign.com">damian@iristormdesign.com<svg><use href="#open-in-new-icon" /></svg></a>.</p>

			<h3>GitHub</h3>
			<p>MTG Deck Builder’s source code, though copyrighted, is viewable on <a href="https://github.com/IristormDesign/mtg-deck-builder" target="_blank">GitHub<svg><use href="#open-in-new-icon" /></svg></a>. You can open a GitHub issue or discussion, which the developer (@IristormDesign) could respond to.</p>

			<h3>X</h3>
			<p>Write a post or direct message on X (Twitter) to <a href="https://x.com/IristormDesign" target="_blank">@IristormDesign<svg><use href="#open-in-new-icon" /></svg></a>.</p>
		</div>
	</article>
</template>

<script>
export default {
	metaInfo: {
		title: 'Contact'
	}
}
</script>

<style lang="scss">
	@use '@/sass/page-contact.scss';
</style>
